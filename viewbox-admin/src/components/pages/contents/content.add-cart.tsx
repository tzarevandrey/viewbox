import { PlusCircleOutlined } from '@ant-design/icons'
import { Card, Popover } from 'antd'
import { useAppDispatch } from '../../../hooks'
import { openModal } from '../../../reducers/modal.slice';

export const ContentAddCard = () => {
  const dispatch = useAppDispatch();
  return (
    <Popover content='Добавить контент'>
      <Card
        hoverable
        className='content-card'
        onClick={() => dispatch(openModal(ContentCreate))}
      >
        <PlusCircleOutlined className='content-card__icon_big item_add' />
      </Card>
    </Popover>
  )
}