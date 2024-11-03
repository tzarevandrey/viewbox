import { Button, Card, Flex, Form, Input, Select } from 'antd';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import TextArea from 'antd/es/input/TextArea';
import { useGetAllPlaylistsQuery } from '../../../api/playlists.api';

type TProps = {
  functionals?: Functional[];
}

export const ViewpointCreate = ({ functionals }: TProps) => {
  const dispatch = useAppDispatch();
  dispatch(setTitle('Панели воспроизведения'));
  const {
    data,
    isLoading,
    isError
  } = useGetAllPlaylistsQuery(null);
  return (
    <Card title='Новая панель воспроизведения'>
      <Form layout='vertical' onFinish={(e) => { console.log(e) }} onReset={() => { console.log('cancellation') }}>
        <Form.Item
          label='Наименование'
          name='name'
          rules={[
            { required: true, message: 'Наименование обязательно' },
            { min: 3, message: 'Не менее 3 символов' }
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