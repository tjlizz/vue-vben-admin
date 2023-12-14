<script setup lang="ts">
  import {
    BasicColumn,
    BasicTable,
    PaginationProps,
    TableAction,
    useTable,
  } from '@/components/Table';
  import { defHttp } from '@/utils/http/axios';
  import { reactive, ref } from 'vue';
  import { demoListApi } from '@/api/demo/table';
  import { getBasicColumns } from '@/views/demo/table/tableData';

  const getFormConfig = () => {
    return {
      labelWidth: 100,
      schemas: [
        {
          field: `ip`,
          label: `ip`,
          component: 'Input',
          colProps: {
            xl: 12,
            xxl: 8,
          },
        },
      ],
    };
  };
  const baseColumn = [
    {
      title: 'IP',
      dataIndex: 'ip',
    },
    {
      title: '端口',
      dataIndex: 'port',
    },
  ];

  const dataLoad = async () => {
    let pagination = getPaginationRef() as PaginationProps;

    let params = {
      page: pagination.current,
      limit: pagination.pageSize,
    };

    const form = getForm();
    let formVal = form.getFieldsValue();
    // 遍历formVal ,有值就加入到params
    for (let formValKey in formVal) {
      if (formVal[formValKey]) {
        params[formValKey] = formVal[formValKey];
      }
    }

    const data = await defHttp.get({
      url: '/system/v2/processingservice/page',
      params,
    });
    return {
      items: data.rows,
      total: data.total,
    };
  };

  const [registerTable, { getPaginationRef, getForm }] = useTable({
    api: dataLoad,
    columns: baseColumn,
    useSearchForm: true,
    formConfig: getFormConfig(),
    showTableSetting: true,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    canResize: false,
    // :canResize="false"
    // :useSearchForm="true"
  });
</script>

<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary"> 新增处理单元</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>

<style scoped></style>
