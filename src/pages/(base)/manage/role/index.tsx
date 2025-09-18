import { Suspense } from 'react';

import { enableStatusRecord } from '@/constants/business';
import { ATG_MAP } from '@/constants/common';
import { TableHeaderOperation, useTable, useTableOperate, useTableScroll } from '@/features/table';
import { fetchAddRole, fetchDeleteRole, fetchEditRole, fetchGetRoleList } from '@/service/api';

import RoleSearch from './modules/role-search';

const RoleOperateDrawer = lazy(() => import('./modules/role-operate-drawer'));

const Role = () => {
  const { t } = useTranslation();

  const isMobile = useMobile();

  const nav = useNavigate();

  const { scrollConfig, tableWrapperRef } = useTableScroll();

  const { columnChecks, data, run, searchProps, setColumnChecks, tableProps } = useTable({
    apiFn: fetchGetRoleList,
    apiParams: {
      current: 1,
      querySearch: undefined,
      size: 10,
      status: undefined
    },
    columns: () => [
      {
        align: 'center',
        dataIndex: 'id',
        key: 'id',
        title: t('common.index'),
        width: 64
      },
      {
        align: 'center',
        dataIndex: 'roleName',
        key: 'roleName',
        minWidth: 120,
        title: t('page.manage.role.roleName')
      },
      {
        align: 'center',
        dataIndex: 'roleCode',
        key: 'roleCode',
        minWidth: 120,
        title: t('page.manage.role.roleCode')
      },
      {
        dataIndex: 'description',
        ellipsis: true,
        key: 'description',
        minWidth: 160,
        render: (_, record) => {
          if (record.description === null) {
            return <ATag color={ATG_MAP[record.status]}>暂无描述</ATag>;
          }
          return <div>{record.description}</div>;
        },
        title: t('page.manage.role.roleDesc')
      },
      {
        align: 'center',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (_, record) => {
          const label = t(enableStatusRecord[record.status]);
          return <ATag color={ATG_MAP[record.status]}>{label}</ATag>;
        },
        title: t('page.manage.role.roleStatus'),
        width: 100
      },
      {
        align: 'center',
        key: 'operate',
        render: (_, record) => (
          <div className="flex-center gap-8px">
            <AButton
              ghost
              size="small"
              type="primary"
              onClick={() => edit(record.id)}
            >
              {t('common.edit')}
            </AButton>
            <AButton
              size="small"
              onClick={() => nav(`/manage/role/${record.id}/${record.roleName}/${record.status}`)}
            >
              详情
            </AButton>
            <APopconfirm
              title={t('common.confirmDelete')}
              onConfirm={() => handleDelete(record.id)}
            >
              <AButton
                danger
                size="small"
              >
                {t('common.delete')}
              </AButton>
            </APopconfirm>
          </div>
        ),
        title: t('common.operate'),
        width: 195
      }
    ]
  });

  const {
    checkedRowKeys,
    editingData,
    generalPopupOperation,
    handleAdd,
    handleEdit,
    onBatchDeleted,
    onDeleted,
    rowSelection
  } = useTableOperate(data, run, async (res, type) => {
    if (type === 'add') {
      // add request 调用新增的接口
      await fetchAddRole(res);
    } else {
      // edit request 调用编辑的接口
      await fetchEditRole(res);
    }
  });

  async function handleBatchDelete() {
    // 删除角色
    await fetchDeleteRole(checkedRowKeys);
    await onBatchDeleted();
  }

  async function handleDelete(id: number) {
    // 删除角色
    await fetchDeleteRole([id]);
    await onDeleted();
  }

  function edit(id: number) {
    handleEdit(id);
  }

  return (
    <div className="h-full min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
      <ACollapse
        bordered={false}
        className="card-wrapper"
        defaultActiveKey={isMobile ? undefined : '1'}
        items={[
          {
            children: <RoleSearch {...searchProps} />,
            key: '1',
            label: t('common.search')
          }
        ]}
      />

      <ACard
        className="flex-col-stretch card-wrapper sm:flex-1-hidden"
        ref={tableWrapperRef}
        title={t('page.manage.role.title')}
        variant="borderless"
        extra={
          <TableHeaderOperation
            add={handleAdd}
            columns={columnChecks}
            disabledDelete={checkedRowKeys.length === 0}
            loading={tableProps.loading}
            refresh={run}
            setColumnChecks={setColumnChecks}
            onDelete={handleBatchDelete}
          />
        }
      >
        <ATable
          rowSelection={rowSelection}
          scroll={scrollConfig}
          size="small"
          {...tableProps}
        />

        <Suspense>
          <RoleOperateDrawer
            {...generalPopupOperation}
            rowId={editingData?.id || -1}
          />
        </Suspense>
      </ACard>
    </div>
  );
};

export default Role;
