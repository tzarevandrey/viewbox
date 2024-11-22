import { useNavigate } from 'react-router-dom';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useEffect } from 'react';
import { useAddGroupMutation, useGetAllGroupsQuery } from '../../../api/groups-api';
import { Button, Flex, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Role } from '../../../core/enums/roles.enum';

type TProps = {
  functionals?: Functional[];
}

export const GroupCreate = ({ functionals }: TProps) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setTitle('Новая группа доступа'));
    // eslint-disable-next-line
  }, [])

  const [addGroup] = useAddGroupMutation();

  const {
    data: groups
  } = useGetAllGroupsQuery(null);

  return (
    <Form
      layout='vertical'
      onFinish={async (values) => {
        try {
          await addGroup(values).unwrap();
          navigate(-1);
        } catch { }
      }}
      onReset={() => navigate(-1)}
    >
      <Form.Item
        label='Имя'
        name='name'
        rules={[
          { required: true, message: 'Обязательное значение' },
          () => ({
            validator: async (_, name: string) => {
              if (groups?.map(x => x.name.toLowerCase()).includes(name.toLowerCase())) return Promise.reject('Группа с таким именем уже добавлена');
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
        initialValue={[]}
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