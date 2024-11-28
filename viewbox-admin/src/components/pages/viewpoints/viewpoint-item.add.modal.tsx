import { Button, Select } from 'antd';
import { useAppDispatch } from '../../../hooks';
import { closeModal } from '../../../reducers/modal.slice';
import { TGetPlaylistDto } from '../playlists/dto/get.playlists.dto';

type TProps = {
  items?: TGetPlaylistDto[];
  handler: (id: number) => void;
}

export const ViewpointItemAddModal = ({ items = [], handler }: TProps) => {

  const dispatch = useAppDispatch();

  return (
    <div className='viewpoint_add-item_modal'>
      <Select
        showSearch
        className='playlist__edit__value'
        onChange={(e) => handler(e)}
      >
        {items.map(item => {
          return (
            <Select.Option
              key={item.id}
              value={item.id}
            >
              {item.name}
            </Select.Option>
          )
        })}
      </Select>
      <div className='playlist__select-row'>
        <Button type='default' onClick={() => dispatch(closeModal())}>Отмена</Button>
      </div>
    </div>
  )
}