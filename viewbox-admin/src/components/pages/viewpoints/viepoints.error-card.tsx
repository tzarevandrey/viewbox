import { CloseCircleOutlined } from '@ant-design/icons';
import { Card, Popover } from 'antd';

export const ViewpointsErrorCard = () => {
  return (
    <Popover content={'При загрузке произошла ошибка'}>
      <Card className='viewpoints-card viewpoints-card_error'>
        <CloseCircleOutlined className='viewpoint-card__icon_big item_error' />
      </Card>
    </Popover>
  )
}