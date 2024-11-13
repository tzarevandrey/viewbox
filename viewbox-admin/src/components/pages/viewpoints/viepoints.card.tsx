import { Card } from 'antd';
import { TGetViewpointDto } from './dto/get.viewpoint.dto'
import Meta from 'antd/es/card/Meta';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../core/enums/pages.enum';
import { Functional } from '../../../core/enums/functional.enum';
import { PAGES_CONFIG } from '../../../core/dictionaries/pages.config.dictionary';

type TProps = {
  viewpoint: TGetViewpointDto;
  isDetailed?: boolean;
}

export const ViewpointsCard = ({ viewpoint, isDetailed = false }: TProps) => {
  const navigate = useNavigate();
  return (
    <Card
      hoverable={isDetailed}
      onClick={() => {
        if (isDetailed) {
          const link = PAGES_CONFIG[Page.Viewpoints].subpages
            .find(x => x.functionals.includes(Functional.Read))?.link;
          if (link) navigate(link.replace(':id', `${viewpoint.id}`));
        }
      }}
      className='viewpoints-card'
    >
      <Meta title={viewpoint.name} description={viewpoint.description} />
    </Card>
  )
}