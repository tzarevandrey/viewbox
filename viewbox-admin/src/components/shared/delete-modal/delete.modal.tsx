import { Button, Card } from 'antd';
import { useAppDispatch } from '../../../hooks';
import Meta from 'antd/es/card/Meta';
import { closeModal } from '../../../reducers/modal.slice';

type TProps = {
  handler: () => void,
  text: string;
}

export const DeleteModal = ({ text, handler }: TProps) => {
  const dispatch = useAppDispatch();
  return (
    <Card
      actions={[
        <Button onClick={() => dispatch(closeModal())}>Отмена</Button>,
        <Button danger onClick={() => {
          handler()
          dispatch(closeModal())
        }}>Удалить</Button>
      ]}
    >
      <Meta title={'Удаление'} description={`Вы действительно желаете удалить ${text}?`} />
    </Card>
  )
}