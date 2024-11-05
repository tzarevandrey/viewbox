import { PlusCircleOutlined } from '@ant-design/icons'
import { Card, Popover } from 'antd'
import { useAppDispatch } from '../../../hooks'
import { openModal } from '../../../reducers/modal.slice';
import { ViewpointCreate } from './viewpoint.create.modal';

export const ViewpointsAddCard = () => {
  const dispatch = useAppDispatch();
  return (
    <Popover content='Добавить панель воспроизведения'>
      <Card
        hoverable
        className='viewpoints-card card-only-icon'
        onClick={() => dispatch(openModal(ViewpointCreate))}
      >
        <PlusCircleOutlined className='viewpoint-card__icon_big item_add' />
      </Card>
    </Popover>
  )
}