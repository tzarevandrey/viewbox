import { Button, Card, Flex, Form, Input, Select } from 'antd';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import TextArea from 'antd/es/input/TextArea';
import { useGetAllPlaylistsQuery } from '../../../api/playlists.api';
import { closeModal } from '../../../reducers/modal.slice';
import { useAddViewpointMutation } from '../../../api/viewpoints.api';
import { useEffect } from 'react';

export const ViewpointCreate = () => {
  const dispatch = useAppDispatch();
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
    <Card title='Новая панель воспроизведения'>
      <Form
        layout='vertical'
        onFinish={(values) => {
          addViewpoint(values);
          dispatch(closeModal());
        }}
        onReset={() => dispatch(closeModal())}
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
    </Card>
  )
}