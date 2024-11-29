import { Fragment } from 'react/jsx-runtime';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Button, Flex, Form, Input } from 'antd';
import { snack } from '../../../utils/snackbar';
import TextArea from 'antd/es/input/TextArea';
import { useGetViewpointQuery, useTestViewpointNameMutation, useUpdateViewpointMutation } from '../../../api/viewpoints.api';
import { fillViewpointItems } from '../../../reducers/viewpoint.slice';
import { Loading } from '../../shared/loading/loading.page';
import { Error } from '../../shared/error/error.page';
import { ViewpointItemEditTable } from './viewpoint-item.edit.table';
import { COLORS } from '../../../core/constants/colors';

type TProps = {
  functionals?: Functional[];
}

type TParams = {
  id: string;
}

export const ViewpointEdit = ({ functionals }: TProps) => {

  const { id: viewpointId } = useParams<TParams>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [updateViewpoint] = useUpdateViewpointMutation();
  const [testViewpointName] = useTestViewpointNameMutation();

  const {
    data: viewpoint,
    isLoading: viewpointLoading,
    isError: viewpointLoadingError
  } = useGetViewpointQuery(viewpointId ? +viewpointId : 0);

  useEffect(() => {
    let name = '';
    if (viewpoint) name = `«${viewpoint.name}»`
    dispatch(setTitle(`Панель воспроизведения ${name}`));
    dispatch(fillViewpointItems(viewpoint?.items ?? []));
    // eslint-disable-next-line
  }, [viewpoint])

  const { items } = useAppSelector(x => x.viewpoint);

  if (viewpointLoading) return <Loading />
  if (viewpointLoadingError) return <Error />

  return (
    <Fragment>
      <div className='playlist-page__subheader'>
        <div className='playlist-page__subheader__legend-block'>
          <div style={{ fontWeight: 600 }}>список воспроизведения по умолчанию</div>
          <div style={{ color: COLORS.PLAYLIST_FUTURE }}>воспроизведение запланировано</div>
          <div style={{ color: COLORS.PLAYLIST_PAST }}>воспроизведение завершено</div>
        </div>
      </div>
      <Form
        initialValues={viewpoint}
        layout='vertical'
        onFinish={async (values) => {
          let test = true;
          if (items.find(x => x.isDefault) === undefined) {
            test = false;
            snack.error('На задан список воспроизведения по умолчанию');
          }
          if (items.find(x => !x.isDefault && x.startDate === null) !== undefined) {
            test = false;
            snack.error('На задана дата начала воспроизведения');
          }
          const finaledPlaylist = items.filter(x => x.expireDate !== null && x.startDate !== null);
          if (finaledPlaylist.length > 0) {
            if (items.find(x => {
              if (x.startDate === null) return false;
              const sd = new Date(x.startDate).getTime();
              if (finaledPlaylist.find(y => x.id !== y.id && new Date(y.startDate ?? 0).getTime() < sd && new Date(y.expireDate ?? 0).getTime() > sd) !== undefined) return true;
              return false;
            }) !== undefined || items.find(x => {
              if (x.expireDate === null) return false;
              const ed = new Date(x.expireDate).getTime();
              if (finaledPlaylist.find(y => x.id !== y.id && new Date(y.startDate ?? 0).getTime() < ed && new Date(y.expireDate ?? 0).getTime() > ed) !== undefined) return true;
            }) !== undefined) {
              test = false;
              snack.error('Пересекающиеся периоды воспроизведения')
            }
            if (finaledPlaylist.find(x => new Date(x.startDate ?? 0).getTime() > new Date(x.expireDate ?? 0).getTime())) {
              test = false;
              snack.error('Некорректный период воспроизведения');
            }
          }
          if (test) {
            if (viewpoint?.name !== values.name) {
              testViewpointName(values.name).unwrap()
                .then((testResult) => {
                  if (testResult) {
                    updateViewpoint({ ...values, items, id: viewpoint?.id }).unwrap().then(() => navigate(-1));
                  } else {
                    snack.error('Панель воспроизведения с таким именем уже существует');
                  }
                });
            } else {
              updateViewpoint({ ...values, items, id: viewpoint?.id }).unwrap().then(() => navigate(-1));
            }
          }
        }}
        onReset={() => navigate(-1)}
      >
        <Form.Item
          label='Имя'
          name='name'
          rules={[
            { required: true, message: 'Обязательное значение' }
          ]}
        >
          <Input autoComplete='off' />
        </Form.Item>
        <Form.Item
          label='Описание'
          name='description'
        >
          <TextArea rows={6} autoComplete='off' />
        </Form.Item>
        <Form.Item
          label='Элементы списка'
        >
          <ViewpointItemEditTable items={items} />
        </Form.Item>
        <Flex className='buttons-block'>
          <Button
            type='default'
            htmlType='reset'
          >Отмена</Button>
          <Button
            type='primary'
            htmlType='submit'
          >Сохранить</Button>
        </Flex>
      </Form>
    </Fragment>
  )
}