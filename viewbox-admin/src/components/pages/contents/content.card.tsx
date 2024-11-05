import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useNavigate } from 'react-router-dom';
import { TGetContentDto } from './dto/get.content.dto';

type TProps = {
  content: TGetContentDto;
  isDetailed?: boolean;
}

export const ContentCard = ({ content, isDetailed = false }: TProps) => {
  const navigate = useNavigate()
  return (
    <Card
      hoverable={isDetailed}
      onClick={() => navigate(`contents/${content.id}`)}
    >
      <Meta title={viewpoint.name} description={viewpoint.description} />
    </Card>
  )
}