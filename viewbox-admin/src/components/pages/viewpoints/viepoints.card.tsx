import { Card } from 'antd';
import { TGetViewpointDto } from './dto/get.viewpoint.dto'
import Meta from 'antd/es/card/Meta';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { PAGES_JSX_LINKS } from '../../../core/dictionaries/pages.jsx.links.dict';
import { Page } from '../../../core/enums/pages.enum';
import { FUNCTIONAL_LINKS } from '../../../core/dictionaries/functional.links';
import { Functional } from '../../../core/enums/functional.enum';

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
          navigate(`/${PAGES_JSX_LINKS
            .find(x => x.page === Page.Viewpoints)?.link}${FUNCTIONAL_LINKS
              .find(x => x.functional === Functional.Read)?.link}/${viewpoint.id}`);
        }
      }}
      className='viewpoints-card'
    >
      <Meta title={viewpoint.name} description={viewpoint.description} />
    </Card>
  )
}