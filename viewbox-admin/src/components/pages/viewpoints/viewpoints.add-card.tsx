import { PlusCircleOutlined } from '@ant-design/icons'
import { Card, Popover } from 'antd'
import { useAppDispatch } from '../../../hooks'
import { openModal } from '../../../reducers/modal.slice';
import { TestPage } from '../../shared/test.page';

export const ViewpointsAddCard = () => {
  const dispatch = useAppDispatch();
  return (
    <Popover content='Создать панель воспроизведения'>
      <Card
        hoverable
        className='viewpoints-card'
        onClick={() => dispatch(openModal(TestPage))}
      >
        <PlusCircleOutlined className='viewpoint-card__icon_big item_add' />
      </Card>
    </Popover>
  )
}