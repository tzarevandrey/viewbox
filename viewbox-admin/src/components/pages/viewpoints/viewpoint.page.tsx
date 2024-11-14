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
    <Form
      layout='horizontal'
      labelCol={{ span: 6 }}
      size='small'
    >
      {roles.includes(Role.Superuser) || roles.includes(Role.Support) ? (
        <Form.Item label='Идентификатор'>
          <Typography.Text strong>{data?.id}</Typography.Text>
        </Form.Item>
      ) : null}
      <Form.Item label='Название'>
        <Typography.Text strong>{data?.name}</Typography.Text>
      </Form.Item>
      <Form.Item label='Описание'>
        <Typography.Text strong aria-multiline>{data?.description}</Typography.Text>
      </Form.Item>
      <Form.Item label='Список воспроизведения'>
        {data?.playlist ? (
          <Typography.Text strong>{data?.playlist?.name}</Typography.Text>
        ) : (
          <Typography.Text strong type='secondary'>не задан</Typography.Text>
        )}
      </Form.Item>
      <Flex className='buttons-block'>
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
      </Flex>
    </Form>
  )
}