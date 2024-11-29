import { Fragment } from 'react/jsx-runtime';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { COLORS } from '../../../core/constants/colors';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Button, Flex, Form, Input } from 'antd';
import { snack } from '../../../utils/snackbar';
import TextArea from 'antd/es/input/TextArea';
import { PlaylistItemEditTable } from './playlist-item.edit.table';
import { useGetPlaylistQuery, useTestPlaylistNameMutation, useUpdatePlaylistMutation } from '../../../api/playlists.api';
import { fillItems } from '../../../reducers/playlist.slice';
import { Loading } from '../../shared/loading/loading.page';
import { Error } from '../../shared/error/error.page';

type TProps = {
  functionals?: Functional[];
}

type TParams = {
  id: string;
}

export const PlaylistEdit = ({ functionals }: TProps) => {

  const { id } = useParams<TParams>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    data: playlist,
    isLoading: playlistLoading,
    isError: playlistLoadingError
  } = useGetPlaylistQuery(id ? +id : 0);

  useEffect(() => {
    dispatch(setTitle(`Список воспроизведения ${playlist?.name}`));
    dispatch(fillItems(playlist?.items ?? []));
    // eslint-disable-next-line
  }, [playlist])

  const [updatePlaylist] = useUpdatePlaylistMutation();
  const [testPlaylistName] = useTestPlaylistNameMutation();

  const { items } = useAppSelector(x => x.playlist);

  if (playlistLoading) return <Loading />
  if (playlistLoadingError) return <Error />

  return (
    <Fragment>
      <div className='playlist-page__subheader'>
        <div className='playlist-page__subheader__legend-block'>
          <div style={{ borderColor: COLORS.CONTENT_WEB_PAGE }} className='legend-item'>&nbsp;-&nbsp;веб-страница</div>
          <div style={{ borderColor: COLORS.CONTENT_VIDEO }} className='legend-item'>&nbsp;-&nbsp;видео</div>
          <div style={{ borderColor: COLORS.CONTENT_IMAGE }} className='legend-item'>&nbsp;-&nbsp;изображение</div>
        </div>
      </div>
      <Form
        initialValues={playlist}
        layout='vertical'
        onFinish={async (values) => {
          if (items.find(x => x.startDate !== null && x.expireDate !== null && new Date(x.startDate).getTime() > new Date(x.expireDate).getTime())) {
            snack.error('Некорректный период');
          } else {
            if (values.name !== playlist?.name) {
              testPlaylistName(values.name).unwrap().then((testResult) => {
                if (testResult) {
                  updatePlaylist({ ...values, items, id: playlist?.id }).unwrap().then(() => navigate(-1));
                } else {
                  snack.error('Список воспроизведения с таким именем уже существует');
                }
              })
            } else {
              updatePlaylist({ ...values, items, id: playlist?.id }).unwrap().then(() => navigate(-1));
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
          <PlaylistItemEditTable items={items} />
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