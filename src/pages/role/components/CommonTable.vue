<template>
  <div class="list-common-table">
    <t-form ref="form" :data="formData" :label-width="80" colon @reset="onReset" @submit="onSubmit">
      <t-row>
        <t-col :span="10">
          <t-row :gutter="[24, 24]">
            <t-col :span="4">
              <t-form-item label="角色名称" name="name">
                <t-input
                  v-model="formData.name"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入角色名称"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
          </t-row>
        </t-col>

        <t-col :span="2" class="operation-container">
          <t-button theme="primary" type="button" :style="{ marginLeft: 'var(--td-comp-margin-s)' }" @click="addRole">
            添加
          </t-button>
          <t-button theme="primary" type="submit" :style="{ marginLeft: 'var(--td-comp-margin-s)' }"> 查询 </t-button>
          <t-button type="reset" variant="base" theme="default"> 重置 </t-button>
        </t-col>
      </t-row>
    </t-form>

    <div class="table-container">
      <t-table
        :data="data"
        :columns="COLUMNS"
        :row-key="rowKey"
        :vertical-align="verticalAlign"
        :hover="hover"
        :pagination="pagination"
        :loading="dataLoading"
        :header-affixed-top="headerAffixedTop"
        @page-change="rehandlePageChange"
        @change="rehandleChange"
      >
        <template #status="{ row }">
          <t-tag v-if="row.status === ROLE_STATUS.DISABLE" theme="danger" variant="light"> 禁用 </t-tag>
          <t-tag v-if="row.status === ROLE_STATUS.ENABLE" theme="success" variant="light"> 启用 </t-tag>
        </template>
        <template #op="slotProps">
          <t-space>
            <t-link theme="primary" @click="rehandleClickOp(slotProps)">菜单权限</t-link>
            <t-link theme="primary" @click="rehandleClickOp(slotProps)">API权限</t-link>
            <t-link theme="primary" @click="rehandleClickOp(slotProps)">编辑</t-link>
            <t-link theme="danger" @click="handleClickDelete(slotProps)">删除</t-link>
          </t-space>
        </template>
      </t-table>
      <t-dialog
        v-model:visible="confirmVisible"
        header="确认删除当前角色？"
        :body="confirmBody"
        :on-cancel="onCancel"
        @confirm="onConfirmDelete"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { MessagePlugin, PageInfo, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref, watch } from 'vue';

import type { RoleItem } from '@/api/model/roleModel';
import { delRole, getList } from '@/api/role';
import { prefix } from '@/config/global';
import { ROLE_STATUS } from '@/pages/role/constants';
import { useSettingStore } from '@/store';

const props = defineProps({
  doFetch: {
    type: Boolean,
  },
});

watch(
  () => props.doFetch, // 侦听props中的doFetch
  () => {
    fetchData().then();
  },
);

interface FormData {
  name: string;
  no?: string;
  status?: number;
  type?: string;
}

const store = useSettingStore();

const COLUMNS: PrimaryTableCol[] = [
  {
    title: '角色名',
    fixed: 'left',
    width: 280,
    ellipsis: true,
    align: 'left',
    colKey: 'name',
  },
  { title: '角色状态', colKey: 'status', width: 160 },
  {
    title: '排序',
    width: 160,
    ellipsis: true,
    colKey: 'listOrder',
  },
  {
    title: '备注',
    width: 160,
    ellipsis: true,
    colKey: 'remark',
  },
  {
    align: 'left',
    fixed: 'right',
    width: 160,
    colKey: 'op',
    title: '操作',
  },
];

const searchForm = {
  name: '',
};

const formData = ref<FormData>({ ...searchForm });
const rowKey = 'index';
const verticalAlign = 'top' as const;
const hover = true;

const pagination = ref({
  defaultPageSize: 20,
  total: 100,
  defaultCurrent: 1,
  current: 1,
  pageSize: 20,
});
const confirmVisible = ref(false);

const data = ref([]);

const dataLoading = ref(false);
const fetchData = async () => {
  dataLoading.value = true;
  try {
    const { list, total } = await getList({
      name: formData.value.name,
      page: pagination.value.current,
      size: pagination.value.pageSize,
    });
    data.value = list;
    pagination.value = {
      ...pagination.value,
      total,
    };
  } catch (e) {
    console.log(e);
  } finally {
    dataLoading.value = false;
  }
};

const deleteIdx = ref(-1);
const confirmBody = computed(() => {
  if (deleteIdx.value > -1) {
    return `删除后，角色关联权限将被清空，且无法恢复`;
  }
  return '';
});

const resetIdx = () => {
  deleteIdx.value = -1;
};

const onConfirmDelete = async () => {
  await delRole(deleteIdx.value);
  // 真实业务请发起请求
  confirmVisible.value = false;
  MessagePlugin.success('删除成功');
  resetIdx();
  fetchData();
};

const onCancel = () => {
  resetIdx();
};

onMounted(() => {
  fetchData();
});

const handleClickDelete = (slot: { row: { id: number } }) => {
  deleteIdx.value = slot.row.id;
  confirmVisible.value = true;
};
const onReset = (val: unknown) => {
  console.log(val);
};
const onSubmit = () => {
  fetchData();
};
const rehandlePageChange = (pageInfo: PageInfo, newDataSource: TableRowData[]) => {
  console.log('分页变化', pageInfo, newDataSource);
  pagination.value.current = pageInfo.current;
  pagination.value.pageSize = pageInfo.pageSize;
};
const rehandleChange = (changeParams: unknown, triggerAndData: unknown) => {
  console.log('统一Change', changeParams, triggerAndData);
};

const currentRow = ref<RoleItem>();
const rehandleClickOp = (slot: { row: { id: number } }) => {
  currentRow.value = slot.row;
  editRole();
};

const headerAffixedTop = computed(
  () =>
    ({
      offsetTop: store.isUseTabsRouter ? 48 : 0,
      container: `.${prefix}-layout`,
    } as any), // TO BE FIXED
);

const emit = defineEmits(['handle-visible']);

const addRole = () => {
  emit('handle-visible');
};

const editRole = () => {
  emit('handle-visible', currentRow.value);
};
</script>

<style lang="less" scoped>
.list-common-table {
  background-color: var(--td-bg-color-container);
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  border-radius: var(--td-radius-medium);

  .table-container {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.form-item-content {
  width: 100%;
}

.operation-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .expand {
    .t-button__text {
      display: flex;
      align-items: center;
    }
  }
}

.payment-col {
  display: flex;

  .trend-container {
    display: flex;
    align-items: center;
    margin-left: var(--td-comp-margin-s);
  }
}
</style>
