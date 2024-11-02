import { Card, Form, Input } from 'antd';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';

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
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Card>
  )
}