import { Card, Form, Input } from 'antd';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import TextArea from 'antd/es/input/TextArea';

type TProps = {
  functionals?: Functional[];
}

export const ViewpointCreate = ({ functionals }: TProps) => {
  const dispatch = useAppDispatch();
  dispatch(setTitle('Панели воспроизведения'));
  return (
    <Card title='Новая панель воспроизведения'>
      <Form layout='vertical'>
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
          <TextArea rows={8} autoComplete='off' />
        </Form.Item>
      </Form>
    </Card>
  )
}