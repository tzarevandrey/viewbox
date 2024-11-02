import { PlusCircleOutlined } from '@ant-design/icons'
import { Card, Popover } from 'antd'
import { useAppDispatch } from '../../../hooks'
import { openModal } from '../../../reducers/modal.slice';
import { ViewpointCreate } from './viewpoint.create.modal';

export const ViewpointsAddCard = () => {
  const dispatch = useAppDispatch();
  return (
    <Popover content='Создать панель воспроизведения'>
      <Card
        hoverable
        className='viewpoints-card'
        onClick={() => dispatch(openModal(ViewpointCreate))}
      >
        <PlusCircleOutlined className='viewpoint-card__icon_big item_add' />
      </Card>
    </Popover>
  )
}