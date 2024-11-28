import { Button, Select } from 'antd';
import { useAppDispatch } from '../../../hooks';
import { closeModal } from '../../../reducers/modal.slice';
import { TContent } from '../../../core/types/content';
import { getContentColor, getContentName } from '../../../utils/func';

type TProps = {
  items?: TContent[];
  handler: (id: number) => void;
}

export const PlaylistItemAddModal = ({ items = [], handler }: TProps) => {

  const dispatch = useAppDispatch();

  return (
    <div className='playlist_add-item_modal'>
      <Select
        showSearch
        className='content__edit__value'
        onChange={(e) => handler(e)}
      >
        {[...items].sort((a, b) => {
          if (a.contentType > b.contentType) return 1;
          if (a.contentType < b.contentType) return -1;
          const aName = getContentName(a).toLowerCase();
          const bName = getContentName(b).toLowerCase();
          if (aName > bName) return 1;
          if (aName < bName) return -1;
          return 0;
        }).map(item => {
          const name = getContentName(item);
          const borderColor = getContentColor(item);
          return (
            <Select.Option
              key={item.id}
              value={item.id}
            >
              <div className='content__select-row' title={name}>
                <div className='content__select-label' style={{ borderColor }}></div>
                <div className='content__select-options'>{name}</div>
              </div>
            </Select.Option>
          )
        })}
      </Select>
      <div className='content__select-row'>
        <Button type='default' onClick={() => dispatch(closeModal())}>Отмена</Button>
      </div>
    </div>
  )
}