import { Card } from 'antd';
import { TGetViewpointDto } from './dto/get.viewpoint.dto'
import Meta from 'antd/es/card/Meta';
import { useNavigate } from 'react-router-dom';

type TProps = {
  viewpoint: TGetViewpointDto;
  isDetailed?: boolean;
}

export const ViewpointsCard = ({ viewpoint, isDetailed = false }: TProps) => {
  const navigate = useNavigate()
  return (
    <Card
      hoverable={isDetailed}
      onClick={() => navigate(`viewpoints/${viewpoint.id}`)}
    >
      <Meta title={viewpoint.name} description={viewpoint.description} />
    </Card>
  )
}