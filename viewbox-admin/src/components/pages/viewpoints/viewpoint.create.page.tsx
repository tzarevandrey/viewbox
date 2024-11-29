import { useNavigate } from 'react-router-dom';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { Fragment, useEffect } from 'react';
import { Button, Flex, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { snack } from '../../../utils/snackbar';
import { clearViewpointItems } from '../../../reducers/viewpoint.slice';
import { useAddViewpointMutation, useTestViewpointNameMutation } from '../../../api/viewpoints.api';
import { ViewpointItemEditTable } from './viewpoint-item.edit.table';
import { COLORS } from '../../../core/constants/colors';

type TProps = {
  functionals?: Functional[];
}

export const ViewpointCreate = ({ functionals }: TProps) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setTitle('Новая панель воспроизведения'));
    dispatch(clearViewpointItems());
    // eslint-disable-next-line
  }, [])

  const [addViewpoint] = useAddViewpointMutation();
  const [testViewpointName] = useTestViewpointNameMutation();

  const { items } = useAppSelector(x => x.viewpoint);

  return (
    <Fragment>
      <div className='viewpoint-page__subheader'>
        <div className='viewpoint-page__subheader__legend-block'>
          <div style={{ fontWeight: 600 }}>список воспроизведения по умолчанию</div>
          <div style={{ color: COLORS.PLAYLIST_FUTURE }}>воспроизведение запланировано</div>
          <div style={{ color: COLORS.PLAYLIST_PAST }}>воспроизведение завершено</div>
        </div>
      </div>
      <Form
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
            testViewpointName(values.name).unwrap()
              .then((testResult) => {
                if (testResult) {
                  addViewpoint({ ...values, items }).unwrap().then(() => navigate(-1));
                } else {
                  snack.error('Панель воспроизведения с таким именем уже существует');
                }
              });
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