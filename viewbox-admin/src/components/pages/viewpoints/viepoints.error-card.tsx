import { CloseCircleOutlined } from '@ant-design/icons';
import { Card } from 'antd';

export const ViewpointsErrorCard = () => {
  return (
    <Card className='viewpoints-card viewpoints-card_error'>
      <CloseCircleOutlined className='viewpoint-card__icon_big item_error' />
    </Card>
  )
}