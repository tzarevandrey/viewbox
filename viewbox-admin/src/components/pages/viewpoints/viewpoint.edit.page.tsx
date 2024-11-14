import { useNavigate, useParams } from 'react-router-dom';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useGetViewpointQuery, useUpdateViewpointMutation } from '../../../api/viewpoints.api';
import { useEffect } from 'react';
import { Button, Flex, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useGetAllPlaylistsQuery } from '../../../api/playlists.api';

type TProps = {
  functionals?: Functional[];
}

type TParams = {
  id: string;
}

export const ViewpointEdit = ({ functionals }: TProps) => {
  const { id } = useParams<TParams>();

  const navigate = useNavigate();

  const [updateViewpoint] = useUpdateViewpointMutation();

  const {
    data,
    isLoading,
    isError
  } = useGetViewpointQuery(id ? +id : 0);

  const {
    data: plData,
    isLoading: plLoading,
    isError: plError
  } = useGetAllPlaylistsQuery(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTitle(`Панель воспроизведения ${data?.name}`))
    // eslint-disable-next-line
  }, [data])

  return (
    <Form
      layout='vertical'
      size='small'
      onFinish={(values) => {
        updateViewpoint({ actual: { ...values, id: data?.id }, oldPlaylistId: null });
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
        <Input autoComplete='off' defaultValue={data?.name} />
      </Form.Item>
      <Form.Item
        label='Описание'
        name='description'
      >
        <TextArea rows={6} autoComplete='off' defaultValue={data?.description ?? undefined} />
      </Form.Item>
      <Form.Item
        label='Плейлист'
        name='playlistId'
      >
        <Select
          showSearch
          optionFilterProp='children'
          defaultValue={null}
          loading={isLoading}
          disabled={isError}
          notFoundContent='Плейлисты не созданы'
        >
          {plData ? [...plData].sort((a, b) => {
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