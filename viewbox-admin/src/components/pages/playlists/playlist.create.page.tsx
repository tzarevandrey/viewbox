import { useNavigate } from 'react-router-dom';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useEffect, useRef, useState } from 'react';
import { useAddPlaylistMutation } from '../../../api/playlists.api';
import { Form, Input, Table } from 'antd';
import { TCreatePlaylistItemDto } from './dto/create.playlists.dto';
import TextArea from 'antd/es/input/TextArea';
import Column from 'antd/es/table/Column';
import { TContent } from '../../../core/types/content';
import { ContentType } from '../../../core/enums/content.enum';
import { PlaylistItemEditTable } from './playlist-item.edit.table';

type TProps = {
  functionals?: Functional[];
}

export const PlaylistCreate = ({ functionals }: TProps) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setTitle('Новый список воспроизведения'));
    // eslint-disable-next-line
  }, [])

  const myRef = useRef();

  const [addPlaylist] = useAddPlaylistMutation();
  return (
    <Form
      layout='vertical'
      onFinish={(values) => {
        addPlaylist(values);
        navigate(-1);
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
        noStyle
        label='Элементы списка'
      >
        <PlaylistItemEditTable ref={myRef} />
        {/* <Table<TCreatePlaylistItemDto>
          size='small'
          dataSource={[...items].sort((a, b) => a.position - b.position)}
        >
          <Column
            title='Элемент'
            dataIndex='contentItemId'
            key='contentItemId'
            render={(_, item) => (
              <div></div>
            )}
          />
        </Table> */}
      </Form.Item>
    </Form>
  )
}