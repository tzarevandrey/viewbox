import { Fragment, useEffect } from 'react';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useDeleteContentMutation, useGetContentQuery } from '../../../api/content.api';
import { useNavigate, useParams } from 'react-router-dom';
import { ContentLoadingPage } from './content.loading.page';
import { ContentErrorPage } from './content.error.page';
import { Role } from '../../../core/enums/roles.enum';
import { ContentType } from '../../../core/enums/content.enum';
import { Alert, Button, Flex } from 'antd';
import { PAGES_CONFIG } from '../../../core/dictionaries/pages.config.dictionary';
import { Page } from '../../../core/enums/pages.enum';
import { openModal } from '../../../reducers/modal.slice';
import { DeleteModal } from '../../shared/delete-modal/delete.modal';
import { snack } from '../../../utils/snackbar';

type TProps = {
  functionals?: Functional[];
}

type TParams = {
  id: string;
}

export const Content = ({ functionals }: TProps) => {

  const { id: contentId } = useParams<TParams>();

  const { roles } = useAppSelector(x => x.user);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [deleteContent] = useDeleteContentMutation();

  useEffect(() => {
    dispatch(setTitle('Элемент контента'));
    // eslint-disable-next-line
  }, [])

  const {
    data: content,
    isLoading: contentLoading,
    isError: contentLoadingError
  } = useGetContentQuery(contentId ? +contentId : 0)
  if (contentLoading) return <ContentLoadingPage />
  if (contentLoadingError) return <ContentErrorPage />
  return (
    <div >
      <div className='content__view'>
        {roles.includes(Role.Superuser) || roles.includes(Role.Support) ? (
          <Fragment>
            <div className='content__view__label'>Идентификатор контента:</div>
            <div className='content__view__value'>{content?.id}</div>
            <div className='content__view__label'>Идентификатор отображаемого элемента:</div>
            <div className='content__view__value'>{content?.contentType === ContentType.Picture ? content.imageItem?.id : (
              content?.contentType === ContentType.Video ? content.videoItem?.id : content?.webpageItem?.id)}</div>
          </Fragment>
        ) : null}
        <div className='content__view__label'>Тип контента:</div>
        <div className='content__view__value'>{content?.contentType === ContentType.Picture ? 'Изображение' : (
          content?.contentType === ContentType.Video ? 'Видео' : 'Веб-страница')}
        </div>
        <div className='content__view__label'>{content?.contentType === ContentType.WebPage ? 'Ссылка' : 'Имя файла'}:</div>
        <div className='content__view__value'>{content?.contentType === ContentType.Picture ? content.imageItem?.originalName : (
          content?.contentType === ContentType.Video ? content.videoItem?.originalName : content?.name)}
        </div>
        <div className='content__view__label'>Описание:</div>
        <div className='content__view__value'>{content?.description}</div>
        <div className='content__view__label'>Используется в списках воспроизведения:</div>
        {(content?.playlists?.length ?? 0) > 0 ? (
          <div className='content__view__value content__view__value__list'>
            {content?.playlists?.map(playlist => (
              <div
                key={playlist.id}
                className='value_clickable'
                onClick={() => {
                  const link = PAGES_CONFIG[Page.Playlists].subpages.find(x => x.functionals.includes(Functional.Read))?.link;
                  if (link) navigate(link.replace(':id', `${playlist.id}`));
                }}
              >
                {playlist.name}
              </div>
            ))}
          </div>
        ) : (
          <div className='content__view__value_out'>Не используется</div>
        )}
      </div>
      <Flex className='buttons-block buttons-block_left'>
        <Button
          type='default'
          htmlType='button'
          onClick={() => navigate(-1)}
        >Назад</Button>
        {functionals?.includes(Functional.Update) ? (
          <Button
            type='default'
            htmlType='button'
            onClick={() => {
              if (contentId) {
                const link = PAGES_CONFIG[Page.Contents].subpages.find(x => x.functionals.includes(Functional.Update))?.link;
                if (link) navigate(link.replace(':id', contentId));
              }
            }}
          >Изменить</Button>
        ) : null}
        {functionals?.includes(Functional.Delete) ? (
          <Button
            type='default'
            htmlType='button'
            danger
            onClick={() => {
              if (contentId && (!content?.playlists || content.playlists.length === 0)) {
                let name = content?.name;
                switch (content?.contentType) {
                  case ContentType.Picture: name = content.imageItem?.originalName ?? name;
                    break;
                  case ContentType.Video: name = content.videoItem?.originalName ?? name;
                    break;
                }
                dispatch(openModal(() =>
                  <DeleteModal
                    handler={() => {
                      deleteContent(+contentId).then(() => navigate(PAGES_CONFIG[Page.Contents].link))
                    }}
                    text={`контент «${name}»`}
                  />
                ))
              } else {
                snack.error('Контент используется, удаление невозможно');
              }
            }}
          >Удалить</Button>
        ) : null}
      </Flex>
    </div>
  )
}