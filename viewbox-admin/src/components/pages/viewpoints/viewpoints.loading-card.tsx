import { LoadingOutlined } from '@ant-design/icons'
import { Card, Popover, Spin } from 'antd'

export const ViewpointsLoadingCard = () => {
  return (
    <Popover content={'Идёт загрузка'}>
      <Card className='viewpoints-card viewpoints-card_error'>
        <Spin indicator={<LoadingOutlined spin />} />
      </Card>
    </Popover>
  )
}