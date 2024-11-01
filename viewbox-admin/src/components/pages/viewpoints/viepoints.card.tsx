import { Card } from 'antd';
import { TGetViewpointDTO } from './dto/get.viewpoint.dto'
import Meta from 'antd/es/card/Meta';
import { useNavigate } from 'react-router-dom';

type TProps = {
  viewpoint: TGetViewpointDTO;
  isDetailed?: boolean;
  isEdited?: boolean;
  isDeleted?: boolean;
}

export const ViewpointsCard = ({ viewpoint, isDetailed = false, isEdited = false, isDeleted = false }: TProps) => {
  const navigate = useNavigate()
  return (
    <Card
      hoverable={isDetailed || isEdited}
      onClick={() => {
        if (isEdited) {
          navigate(`viewpoints/edit/${viewpoint.id}`)
        } else {
          if (isDetailed) navigate(`viewpoints/${viewpoint.id}`)
        }
      }}
    >
      <Meta title={viewpoint.name} description={viewpoint.description} />
    </Card>
  )
}