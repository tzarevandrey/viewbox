import { PlusCircleOutlined } from '@ant-design/icons'
import { Card, Popover } from 'antd'
import { useNavigate } from 'react-router-dom';
import { PAGES_CONFIG } from '../../../core/dictionaries/pages.config.dictionary';
import { Page } from '../../../core/enums/pages.enum';
import { Functional } from '../../../core/enums/functional.enum';

export const ViewpointsAddCard = () => {
  const navigate = useNavigate();
  return (
    <Popover content='Добавить панель воспроизведения'>
      <Card
        hoverable
        className='viewpoints-card card-only-icon'
        onClick={() => {
          const link = PAGES_CONFIG[Page.Viewpoints].subpages
            .find(x => x.functionals
              .includes(Functional.Create))?.link;
          if (link) navigate(link);
        }}
      >
        <PlusCircleOutlined className='viewpoint-card__icon_big item_add' />
      </Card>
    </Popover>
  )
}