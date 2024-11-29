import { useNavigate, useParams } from 'react-router-dom';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useGetGroupQuery, useTestGroupNameMutation, useUpdateGroupMutation } from '../../../api/groups-api';
import { useEffect } from 'react';
import { Button, Flex, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Role } from '../../../core/enums/roles.enum';
import { Loading } from '../../shared/loading/loading.page';
import { Error } from '../../shared/error/error.page';
import { snack } from '../../../utils/snackbar';

type TProps = {
  functionals?: Functional[];
}

type TParams = {
  id: string;
}

export const GroupEdit = ({ functionals }: TProps) => {
  const { id: groupId } = useParams<TParams>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [updateGroup] = useUpdateGroupMutation();
  const [testGroupName] = useTestGroupNameMutation();

  const {
    data: group,
    isLoading: groupLoading,
    isError: groupLoadingError
  } = useGetGroupQuery(groupId ? +groupId : 0);

  useEffect(() => {
    let name = '';
    if (group !== undefined) name = `«${group.name}»`;
    dispatch(setTitle(`Группа доступа ${name}`))
    // eslint-disable-next-line
  }, [group])

  if (groupLoading) return <Loading />

  if (groupLoadingError) return <Error />
  return (
    <Form
      layout='vertical'
      initialValues={{
        'name': group?.name,
        'description': group?.description ?? undefined,
        'roles': group?.roles?.map(x => x.role)
      }}
      onFinish={async (values) => {
        if (values.name !== group?.name) {
          testGroupName(values.name).unwrap().then((testResult) => {
            if (testResult) {
              updateGroup({ ...values, id: group?.id }).unwrap().then(() => navigate(-1));
            } else { snack.error('Группа с таким именем уже существует') }
          })
        } else {
          updateGroup({ ...values, id: group?.id }).unwrap().then(() => navigate(-1));
        }
      }}
      onReset={() => navigate(-1)}
    >
      <Form.Item
        name='name'
        label='Имя группы'
        rules={[{ required: true, message: 'Обязательное значение' }]}
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