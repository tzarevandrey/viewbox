import { CloseCircleOutlined } from '@ant-design/icons';
import { Card } from 'antd';

export const ContentLoadingPage = () => {
  return (
    <Card className='content-card content-card_error card-only-icon'>
      <CloseCircleOutlined className='content-card__icon_big item_error' />
    </Card>
  )
}