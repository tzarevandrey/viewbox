import { useNavigate } from 'react-router-dom';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { Fragment, useEffect } from 'react';
import { useAddPlaylistMutation } from '../../../api/playlists.api';
import { Button, Flex, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { PlaylistItemEditTable } from './playlist-item.edit.table';
import { clearItems } from '../../../reducers/playlist.slice';
import { snack } from '../../../utils/snackbar';
import { COLORS } from '../../../core/constants/colors';
import dayjs from 'dayjs';

type TProps = {
  functionals?: Functional[];
}

export const PlaylistCreate = ({ functionals }: TProps) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setTitle('Новый список воспроизведения'));
    dispatch(clearItems());
    // eslint-disable-next-line
  }, [])

  const [addPlaylist] = useAddPlaylistMutation();

  const { items } = useAppSelector(x => x.playlist);

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
        layout='vertical'
        onFinish={async (values) => {
          if (items.find(x => x.startDate !== null && x.expireDate !== null && dayjs(x.startDate).isAfter(dayjs(x.expireDate)))) {
            snack.error('Некорректный период');
          } else {
            try {
              await addPlaylist({ ...values, items }).unwrap();
              navigate(-1);
            } catch { }
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