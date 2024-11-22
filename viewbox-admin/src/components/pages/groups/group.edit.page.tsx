import { useNavigate, useParams } from 'react-router-dom';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useGetAllGroupsQuery, useGetGroupQuery, useUpdateGroupMutation } from '../../../api/groups-api';
import { useEffect } from 'react';
import { GroupsLoadingPage } from './groups.loading.page';
import { GroupsErrorPage } from './groups.error.page';
import { Button, Flex, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Role } from '../../../core/enums/roles.enum';

type TProps = {
  functionals?: Functional[];
}

type TParams = {
  id: string;
}

export const GroupEdit = ({ functionals }: TProps) => {
  const { id: groupId } = useParams<TParams>();

  const navigate = useNavigate();

  const [updateGroup] = useUpdateGroupMutation();

  const {
    data: group,
    isLoading: groupLoading,
    isError: groupLoadingError
  } = useGetGroupQuery(groupId ? +groupId : 0);

  const dispatch = useAppDispatch();

  const {
    data: groups
  } = useGetAllGroupsQuery(null);

  useEffect(() => {
    dispatch(setTitle(`Группа доступа ${group?.name}`))
    // eslint-disable-next-line
  }, [group])

  if (groupLoading) return <GroupsLoadingPage />

  if (groupLoadingError) return <GroupsErrorPage />
  return (
    <Form
      layout='vertical'
      initialValues={{
        'name': group?.name,
        'description': group?.description ?? undefined,
        'roles': group?.roles.map(x => x.role)
      }}
      onFinish={async (values) => {
        try {
          await updateGroup({ ...values, id: group?.id }).unwrap();
          navigate(-1);
        } catch { }
      }}
      onReset={() => navigate(-1)}
    >
      <Form.Item
        name='name'
        label='Имя группы'
        rules={[
          { required: true, message: 'Обязательное значение' },
          () => ({
            validator: async (_, name: string) => {
              if (groups?.filter(x => x.id !== group?.id).map(x => x.name.toLowerCase()).includes(name.toLowerCase())) return Promise.reject('Группа с таким именем уже существует');
              return Promise.resolve();
            }
          })
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
        label='Роли'
        name='roles'
      >
        <Select mode='multiple'>
          <Select.Option
            value={Role.Administrator}
            key={Role.Administrator}
          >Администраторы</Select.Option>
          <Select.Option
            value={Role.Viewpoint}
            key={Role.Viewpoint}
          >Воспроизведение</Select.Option>
          <Select.Option
            value={Role.Support}
            key={Role.Support}
          >Сопровождение</Select.Option>
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