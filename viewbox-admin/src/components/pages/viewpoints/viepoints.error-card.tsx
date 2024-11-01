import { CloseCircleOutlined } from '@ant-design/icons'
import { Card } from 'antd'

export const ViewpointsErrorCard = () => {
  return (
    <Card title='Ошибка' className='viewpoints-card viewpoints-card_error'>
      <CloseCircleOutlined />
    </Card>
  )
}