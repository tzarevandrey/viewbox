import { useNavigate, useParams } from 'react-router-dom';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useDeleteGroupMutation, useGetGroupQuery } from '../../../api/groups-api';
import { useEffect } from 'react';
import { GroupsLoadingPage } from './groups.loading.page';
import { GroupsErrorPage } from './groups.error.page';
import { Button, Flex } from 'antd';
import { PAGES_CONFIG } from '../../../core/dictionaries/pages.config.dictionary';
import { Page } from '../../../core/enums/pages.enum';
import { openModal } from '../../../reducers/modal.slice';
import { DeleteModal } from '../../shared/delete-modal/delete.modal';
import { Role } from '../../../core/enums/roles.enum';

type TProps = {
  functionals?: Functional[];
}

type TParams = {
  id: string;
}

export const Group = ({ functionals }: TProps) => {

  const { id: groupId } = useParams<TParams>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [deleteGroup] = useDeleteGroupMutation();

  const {
    data: group,
    isLoading: groupLoading,
    isError: groupLoadingError
  } = useGetGroupQuery(groupId ? +groupId : 0);

  useEffect(() => {
    dispatch(setTitle(`Группа доступа ${group?.name}`))
    // eslint-disable-next-line
  }, [group])

  if (groupLoading) return <GroupsLoadingPage />

  if (groupLoadingError) return <GroupsErrorPage />

  return (
    <div >
      <div className='group__view'>
        <div className='group__view__label'>Идентификатор группы:</div>
        <div className='group__view__value'>{group?.id}</div>
        <div className='group__view__label'>Имя группы:</div>
        <div className='group__view__value'>{group?.name}</div>
        <div className='group__view__label'>Описание:</div>
        <div className='group__view__value'>{group?.description}</div>
        <div className='group__view__label'>Роли:</div>
        {(group?.roles?.length ?? 0) > 0 ? (
          <div className='group__view__value group__view__value__list'>
            {group?.roles?.map(role => {
              let roleName = '';
              switch (role.role) {
                case Role.Administrator: roleName = 'Администраторы';
                  break;
                case Role.Viewpoint: roleName = 'Воспроизведение';
                  break;
                case Role.Support: roleName = 'Сопровождение';
                  break;
              }
              return (
                <div
                  key={role.role}
                  className='group__view__value'
                >
                  {roleName}
                </div>
              )
            })}
          </div>
        ) : (
          <div className='group__view__value_out'>Не заданы</div>
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
              if (groupId) {
                const link = PAGES_CONFIG[Page.Groups].subpages.find(x => x.functionals.includes(Functional.Update))?.link;
                if (link) navigate(link.replace(':id', groupId));
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
              if (groupId) dispatch(openModal(() =>
                <DeleteModal
                  handler={() => {
                    deleteGroup(+groupId).then(() => navigate(PAGES_CONFIG[Page.Groups].link))
                  }}
                  text={`группу доступа «${group?.name}»`}
                />
              ))
            }}
          >Удалить</Button>
        ) : null}
      </Flex>
    </div>
  )
}