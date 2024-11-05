import { CloseCircleOutlined } from '@ant-design/icons';
import { Card } from 'antd';

export const ContentErrorCard = () => {
  return (
    <Card className='content-card content-card_error'>
      <CloseCircleOutlined className='content-card__icon_big item_error' />
    </Card>
  )
}