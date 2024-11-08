import { PlusCircleOutlined } from '@ant-design/icons'
import { Card, Popover } from 'antd'
import { useNavigate } from 'react-router-dom';
import { PAGES_CONFIG } from '../../../core/dictionaries/pages.config.dictionary';
import { Page } from '../../../core/enums/pages.enum';
import { FunctionalPageType } from '../../../core/enums/functional.type.enum';
import { Functional } from '../../../core/enums/functional.enum';

export const ViewpointsAddCard = () => {
  const navigate = useNavigate();
  return (
    <Popover content='Добавить панель воспроизведения'>
      <Card
        hoverable
        className='viewpoints-card card-only-icon'
        onClick={() => navigate(PAGES_CONFIG[Page.Viewpoints].functionals[FunctionalPageType.Subpage][Functional.Create].link)}
      >
        <PlusCircleOutlined className='viewpoint-card__icon_big item_add' />
      </Card>
    </Popover>
  )
}