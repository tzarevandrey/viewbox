import { useNavigate, useParams } from 'react-router-dom';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { Fragment, useEffect } from 'react';
import { Button, Flex } from 'antd';
import { PAGES_CONFIG } from '../../../core/dictionaries/pages.config.dictionary';
import { Page } from '../../../core/enums/pages.enum';
import { openModal } from '../../../reducers/modal.slice';
import { DeleteModal } from '../../shared/delete-modal/delete.modal';
import { useDeleteViewpointMutation, useGetViewpointQuery } from '../../../api/viewpoints.api';
import { Loading } from '../../shared/loading/loading.page';
import { Error } from '../../shared/error/error.page';
import { ViewpointItemsTable } from './viewpoint-items.table';
import { getPageLink } from '../../../utils/func';
import { COLORS } from '../../../core/constants/colors';

type TProps = {
  functionals?: Functional[];
}

type TParams = {
  id: string;
}

export const Viewpoint = ({ functionals }: TProps) => {

  const { id: viewpointId } = useParams<TParams>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [deleteViewpoint] = useDeleteViewpointMutation();

  const {
    data: viewpoint,
    isLoading: viewpointLoading,
    isError: viewpointLoadingError
  } = useGetViewpointQuery(viewpointId ? +viewpointId : 0)

  useEffect(() => {
    let name = '';
    if (viewpoint) {
      name = `«${viewpoint.name}»`
    }
    dispatch(setTitle(`Панель воспроизведения ${name}`));
    // eslint-disable-next-line
  }, [viewpoint])

  if (viewpointLoading) return <Loading />
  if (viewpointLoadingError) return <Error />

  return (
    <Fragment>
      <div className='viewpoint-page__subheader'>
        <div className='viewpoint-page__subheader__legend-block'>
          <div style={{ fontWeight: 600 }}>список воспроизведения по умолчанию</div>
          <div style={{ color: COLORS.PLAYLIST_FUTURE }}>воспроизведение запланировано</div>
          <div style={{ color: COLORS.PLAYLIST_PAST }}>воспроизведение завершено</div>
        </div>
      </div>
      <div className='viewpoint__view'>
        <div className='viewpoint__view__label'>Идентификатор:</div>
        <div className='viewpoint__view__value'>{viewpoint?.id}</div>
        <div className='viewpoint__view__label'>Имя панели:</div>
        <div className='viewpoint__view__value'>{viewpoint?.name}</div>
        <div className='viewpoint__view__label'>Описание:</div>
        <div className='viewpoint__view__value'>{viewpoint?.description}</div>
        <div className='viewpoint__view__label'>Списки воспроизведения:</div>
        <div className='viewpoint__view__table'>
          {viewpoint?.items && viewpoint.items.length > 0
            ? <ViewpointItemsTable items={viewpoint.items} functionals={functionals} />
            : <div className='viewpoint__view__value_out'>Списки отсутствуют</div>
          }
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
                  const link = getPageLink(Page.Viewpoints, Functional.Update);
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
    </Fragment>
  )
}