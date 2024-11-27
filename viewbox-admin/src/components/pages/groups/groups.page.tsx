import { Fragment, useEffect } from 'react';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useNavigate } from 'react-router-dom';
import { useGetAllGroupsQuery } from '../../../api/groups-api';
import { Button, Table, TableProps } from 'antd';
import { TGetGroupDto } from './dto/get.groups.dto';
import { Role } from '../../../core/enums/roles.enum';
import { COLORS } from '../../../core/constants/colors';
import { GroupsLoadingPage } from './groups.loading.page';
import { GroupsErrorPage } from './groups.error.page';
import { PAGES_CONFIG } from '../../../core/dictionaries/pages.config.dictionary';
import { Page } from '../../../core/enums/pages.enum';

type TProps = {
  functionals?: Functional[];
}

export const Groups = ({ functionals }: TProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTitle('Группы доступа'))
    // eslint-disable-next-line
  }, [])

  const navigate = useNavigate();

  const {
    data: groups,
    isLoading: groupsLoading,
    isError: groupsLoadingError
  } = useGetAllGroupsQuery(null);

  const columns: TableProps<TGetGroupDto>['columns'] = [
    {
      title: 'Идентификатор',
      dataIndex: 'id',
      key: 'id',
      render: (_, group) => {
        return (
          <div className='groups-row'>{group.id}</div>
        )
      }
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      sorter: {
        compare: (a, b) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();
          if (aName > bName) return 1;
          if (aName < bName) return -1;
          return 0;
        }
      },
      render: (_, group) => {
        return (
          <div className='groups-row'>{group.name}</div>
        )
      }
    },
    {
      title: 'Роли',
      dataIndex: 'roles',
      key: 'roles',
      render: (_, group) => {
        return (
          <div className='groups-row groups-row__roles'>
            {group.roles.map(role => {
              let color = '';
              let title = '';
              switch (role.role) {
                case Role.Administrator: color = COLORS.ROLE_ADMINISTRATOR;
                  title = 'Администраторы';
                  break;
                case Role.Support: color = COLORS.ROLE_SUPPORT;
                  title = 'Сопровождение';
                  break;
                case Role.Viewpoint: color = COLORS.ROLE_VIEWPOINT;
                  title = 'Воспроизведение';
                  break;
              }
              return (
                <div
                  key={`${group.id}_${role.role}`}
                  className='groups-row__role'
                  style={{ borderColor: color }}
                  title={title}
                ></div>
              )
            })}
          </div>
        )
      }
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      sorter: {
        compare: (a, b) => {
          const x = a.description ? a.description.toLowerCase() : '';
          const y = b.description ? b.description.toLowerCase() : '';
          if (x > y) return 1;
          if (x < y) return -1;
          return 0;
        },
      },
      render: (_, group) => {
        return (
          <div className='groups-row'>{group.description}</div>
        )
      }
    }
  ]

  if (groupsLoading) return <GroupsLoadingPage />
  if (groupsLoadingError) return <GroupsErrorPage />
  return (
    <Fragment>
      <div className='groups-page__subheader'>
        <div className='groups-page__subheader__buttons-block buttons-block'>
          {functionals?.includes(Functional.Create) ? (
            <Button
              onClick={() => {
                const link = PAGES_CONFIG[Page.Groups].subpages.find(x => x.functionals.includes(Functional.Create))?.link;
                if (link) navigate(link);
              }}
            >Добавить группу</Button>
          ) : null}
        </div>
        <div className='groups-page__subheader__legend-block'>
          <div style={{ borderColor: COLORS.ROLE_ADMINISTRATOR }} className='groups-legend-item'>&nbsp;-&nbsp;администраторы</div>
          <div style={{ borderColor: COLORS.ROLE_VIEWPOINT }} className='groups-legend-item'>&nbsp;-&nbsp;воспроизведение</div>
          <div style={{ borderColor: COLORS.ROLE_SUPPORT }} className='groups-legend-item'>&nbsp;-&nbsp;сопровождение</div>
        </div>
      </div>
      <Table<TGetGroupDto>
        bordered
        size='small'
        columns={columns}
        dataSource={groups}
        rowHoverable
        rowKey={item => item.id}
        onRow={item => {
          if (!(functionals?.includes(Functional.Read) || functionals?.includes(Functional.Update))) return {};
          return {
            onClick: () => {
              const link = PAGES_CONFIG[Page.Groups].subpages.find(x => x.functionals.includes(Functional.Read))?.link;
              if (link) navigate(link.replace(':id', `${item.id}`));
            }
          }
        }}
      />
    </Fragment>
  )
}