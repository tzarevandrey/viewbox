import { useNavigate, useParams } from 'react-router-dom';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { Fragment, useEffect } from 'react';
import { useDeleteViewpointMutation, useGetViewpointQuery } from '../../../api/viewpoints.api';
import { Button, Flex } from 'antd';
import { PAGES_CONFIG } from '../../../core/dictionaries/pages.config.dictionary';
import { Page } from '../../../core/enums/pages.enum';
import { Role } from '../../../core/enums/roles.enum';
import { ViewpointsLoadingCard } from './viewpoints.loading-card';
import { ViewpointsErrorCard } from './viepoints.error-card';
import { openModal } from '../../../reducers/modal.slice';
import { DeleteModal } from '../../shared/delete-modal/delete.modal';

type TProps = {
  functionals?: Functional[];
}

type TParams = {
  id: string;
}

export const Viewpoint = ({ functionals }: TProps) => {

  const { id: viewpointId } = useParams<TParams>();

  const { roles } = useAppSelector(x => x.user);

  const navigate = useNavigate();

  const [deleteViewpoint] = useDeleteViewpointMutation();

  const {
    data: viewpoint,
    isLoading: viewpointLoading,
    isError: viewpointLoadingError
  } = useGetViewpointQuery(viewpointId ? +viewpointId : 0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTitle(`Панель воспроизведения ${viewpoint?.name ? ('«' + viewpoint?.name + '»') : ''}`))
    // eslint-disable-next-line
  }, [viewpoint])

  if (viewpointLoading) return <ViewpointsLoadingCard />

  if (viewpointLoadingError) return <ViewpointsErrorCard />

  return (
    <div >
      <div className='viewpoint__view'>
        {roles.includes(Role.Superuser) || roles.includes(Role.Support) ? (
          <Fragment>
            <div className='viewpoint__view__label'>Идентификатор:</div>
            <div className='viewpoint__view__value'>{viewpoint?.id}</div>
          </Fragment>
        ) : null}
        <div className='viewpoint__view__label'>Наименование:</div>
        <div className='viewpoint__view__value'>{viewpoint?.name}</div>
        <div className='viewpoint__view__label'>Описание:</div>
        <div className='viewpoint__view__value'>{viewpoint?.description}</div>
        <div className='viewpoint__view__label'>Список воспроизведения:</div>
        <div
          className={`viewpoint__view__value${viewpoint?.playlist ? ' viewpoint__view__value_clickable' : ' viewpoint__view__value_out'}`}
          onClick={() => {
            if (viewpoint?.playlistId) {
              const link = PAGES_CONFIG[Page.Playlists].subpages.find(x => x.functionals.includes(Functional.Read))?.link;
              if (link) navigate(link.replace(':id', `${viewpoint?.playlistId}`));
            }
          }}
        >{viewpoint?.playlist?.name || 'не задан'}</div>
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
              if (viewpointId) {
                const link = PAGES_CONFIG[Page.Viewpoints].subpages.find(x => x.functionals.includes(Functional.Update))?.link;
                if (link) navigate(link.replace(':id', viewpointId));
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
              if (viewpointId) {
                dispatch(openModal(() =>
                  <DeleteModal
                    handler={() => {
                      deleteViewpoint(+viewpointId).then(() => navigate(PAGES_CONFIG[Page.Viewpoints].link))
                    }}
                    text={`панель воспроизведения «${viewpoint?.name}»`}
                  />
                ))
              }
            }}
          >Удалить</Button>
        ) : null}
      </Flex>
    </div>
  )
}