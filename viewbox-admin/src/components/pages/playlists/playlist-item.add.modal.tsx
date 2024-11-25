import { Select } from 'antd';
import { ContentType } from '../../../core/enums/content.enum';
import { COLORS } from '../../../core/constants/colors';
import { TGetContentDto } from '../contents/dto/get.content.dto';

type TProps = {
  items?: TGetContentDto[];
  handler: (id: number) => void;
}

export const PlaylistItemAddModal = ({ items = [], handler }: TProps) => {

  return (
    <div>
      <Select
        showSearch
        className='content__edit__value'
        onChange={(e) => handler(e)}
      >
        {[...items].sort((a, b) => {
          if (a.contentType > b.contentType) return 1;
          if (a.contentType < b.contentType) return -1;
          let aName = a.name;
          let bName = b.name;
          switch (a.contentType) {
            case ContentType.Picture: aName = a.imageItem?.originalName ?? aName;
              bName = b.imageItem?.originalName ?? bName;
              break;
            case ContentType.Video: aName = a.videoItem?.originalName ?? aName;
              bName = b.videoItem?.originalName ?? bName;
              break;
          }
          aName = aName.toLowerCase();
          bName = bName.toLowerCase();
          if (aName > bName) return 1;
          if (aName < bName) return -1;
          return 0;
        }).map(item => {
          let borderColor = '';
          let name = item.name;
          switch (item.contentType) {
            case ContentType.Picture: borderColor = COLORS.CONTENT_IMAGE;
              name = item.imageItem?.originalName ?? name;
              break;
            case ContentType.Video: borderColor = COLORS.CONTENT_VIDEO;
              name = item.videoItem?.originalName ?? name;
              break;
            case ContentType.WebPage: borderColor = COLORS.CONTENT_WEB_PAGE;
              break;
          }
          return (
            <Select.Option
              key={item.id}
              value={item.id}
              style={{ borderColor }}
            >{name}</Select.Option>
          )
        })}
      </Select>
    </div>
  )
}