import { Badge, Card, Flex } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useNavigate } from 'react-router-dom';
import { TGetContentDto } from './dto/get.content.dto';
import { CodeTwoTone, DribbbleOutlined, InstagramOutlined, PictureTwoTone, PlaySquareTwoTone, YoutubeOutlined } from '@ant-design/icons';
import { ContentType } from '../../../core/enums/content.enum';

type TProps = {
  content: TGetContentDto;
  isDetailed?: boolean;
}

export const ContentCard = ({ content, isDetailed = false }: TProps) => {
  const navigate = useNavigate();
  return (
    // <Badge
    //   count={content.contentType === ContentType.Picture
    //     ? <PictureTwoTone className='content-card__badge' twoToneColor={'black'} title='Изображение' />
    //     : (
    //       content.contentType === ContentType.Video
    //         ? <PlaySquareTwoTone className='content-card__badge' twoToneColor={'black'} title='Видео' />
    //         : <CodeTwoTone className='content-card__badge' twoToneColor={'black'} title='Веб-страница' />
    //     )
    //   }
    //   offset={[-6, 6]}
    // >
    <Card
      className='content-card'
      hoverable={isDetailed}
      onClick={() => {
        if (isDetailed) navigate(`/contents/${content.id}`)
      }}
      size='small'
    >
      <div className='content-card__space'>
        <div className='content-card__title'>
          <div className='content-card__title__icon'>
            {content.contentType === ContentType.Picture
              ? <InstagramOutlined className='content-card__badge' title='Изображение' />
              : (
                content.contentType === ContentType.Video
                  ? <YoutubeOutlined className='content-card__badge' title='Видео' />
                  : <DribbbleOutlined className='content-card__badge' title='Веб-страница' />
              )
            }
          </div>
          {content.name}
        </div>
        <div className='content-card__body'>{content.description}</div>
      </div>
      {/* <Meta
          title={content.name}
          description={content.description} /> */}
    </Card>
    // </Badge>
  )
}