import { Button, Flex, Form, Input, Select } from 'antd';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import TextArea from 'antd/es/input/TextArea';
import { useGetAllPlaylistsQuery } from '../../../api/playlists.api';
import { useAddViewpointMutation } from '../../../api/viewpoints.api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ViewpointCreate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setTitle('Новая панель воспроизведения'))
    // eslint-disable-next-line
  }, [])
  const {
    data,
    isLoading,
    isError
  } = useGetAllPlaylistsQuery(null);
  const [addViewpoint] = useAddViewpointMutation();
  return (
    <Form
      layout='vertical'
      onFinish={(values) => {
        addViewpoint(values);
        navigate(-1);
      }}
      onReset={() => navigate(-1)}
    >
      <Form.Item
        label='Наименование'
        name='name'
        rules={[
          { required: true, message: 'Наименование обязательно' },
          { min: 3, message: 'Не менее 3 символов' },
          { max: 255, message: 'Не более 255 символов' }
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
        label='Плейлист'
        name='playlistId'
      >
        <Select
          showSearch
          optionFilterProp='children'
          defaultActiveFirstOption
          loading={isLoading}
          disabled={isError}
          notFoundContent='Плейлисты не созданы'
        >
          {data ? [...data].sort((a, b) => {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            if (aName > bName) return 1;
            if (aName < bName) return -1;
            return 0;
          }).map(plist =>
            <Select.Option
              title={plist.description}
              value={plist.id}
              key={plist.id}
            >
              {plist.name}
            </Select.Option>
          ) : null}
        </Select>
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
  )
}