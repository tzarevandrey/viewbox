import { useNavigate, useParams } from 'react-router-dom';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { Fragment, useEffect } from 'react';
import { useGetViewpointQuery } from '../../../api/viewpoints.api';
import { Button, Flex, Form, Typography } from 'antd';
import { PAGES_CONFIG } from '../../../core/dictionaries/pages.config.dictionary';
import { Page } from '../../../core/enums/pages.enum';
import { Role } from '../../../core/enums/roles.enum';

type TProps = {
  functionals?: Functional[];
}

type TParams = {
  id: string;
}

export const Viewpoint = ({ functionals }: TProps) => {

  const { id } = useParams<TParams>();

  const { roles } = useAppSelector(x => x.user);

  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError
  } = useGetViewpointQuery(id ? +id : 0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTitle(`Панель воспроизведения ${data?.name ? ('«' + data?.name + '»') : ''}`))
    // eslint-disable-next-line
  }, [data])


  return (
    <div >
      <div className='viewpoint__view'>
        {roles.includes(Role.Superuser) || roles.includes(Role.Support) ? (
          <Fragment>
            <div className='viewpoint__view__label'>Идентификатор:</div>
            <div className='viewpoint__view__value'>{data?.id}</div>
          </Fragment>
        ) : null}
        <div className='viewpoint__view__label'>Наименование:</div>
        <div className='viewpoint__view__value'>{data?.name}</div>
        <div className='viewpoint__view__label'>Описание:</div>
        <div className='viewpoint__view__value'>{data?.description}</div>
        <div className='viewpoint__view__label'>Список воспроизведения:</div>
        <div className={`viewpoint__view__value${data?.playlist ? '' : ' viewpoint__view__value_out'}`}>{data?.playlist?.name || 'не задан'}</div>
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
              if (id) {
                const link = PAGES_CONFIG[Page.Viewpoints].subpages.find(x => x.functionals.includes(Functional.Update))?.link;
                if (link) navigate(link.replace(':id', id));
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
              if (id) {

              }
            }}
          >Удалить</Button>
        ) : null}
      </Flex>
    </div>
  )
}