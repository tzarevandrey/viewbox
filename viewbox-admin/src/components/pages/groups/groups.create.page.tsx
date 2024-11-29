import { useNavigate } from 'react-router-dom';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useEffect } from 'react';
import { useAddGroupMutation, useTestGroupNameMutation } from '../../../api/groups-api';
import { Button, Flex, Form, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Role } from '../../../core/enums/roles.enum';
import { snack } from '../../../utils/snackbar';

type TProps = {
  functionals?: Functional[];
}

export const GroupCreate = ({ functionals }: TProps) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [addGroup] = useAddGroupMutation();
  const [testGroupName] = useTestGroupNameMutation();

  useEffect(() => {
    dispatch(setTitle('Новая группа доступа'));
    // eslint-disable-next-line
  }, [])


  return (
    <Form
      layout='vertical'
      onFinish={async (values) => {
        testGroupName(values.name).unwrap().then((testResult) => {
          if (testResult) {
            addGroup(values).unwrap().then(() => navigate(-1))
          } else { snack.error('Группа с таким именем уже существует') }
        })
      }}
      onReset={() => navigate(-1)}
    >
      <Form.Item
        label='Имя'
        name='name'
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