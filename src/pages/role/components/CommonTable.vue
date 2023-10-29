<template>
  <div class="list-common-table">
    <t-form ref="form" :data="roleStore.searchFormData" :label-width="80" colon @reset="onReset" @submit="onSubmit">
      <t-row>
        <t-col :span="10">
          <t-row :gutter="[24, 24]">
            <t-col :span="4">
              <t-form-item label="角色名称" name="name">
                <t-input
                  v-model="roleStore.searchFormData.name"
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
        :data="roleStore.roleList"
        :columns="COLUMNS"
        :row-key="rowKey"
        :vertical-align="verticalAlign"
        :hover="hover"
        :pagination="roleStore.pagination"
        :loading="roleStore.dataLoading"
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
            <t-link theme="primary" @click="rehandleClickOpMenu(slotProps)">菜单权限</t-link>
            <t-link theme="primary" @click="rehandleClickOpButton(slotProps)">按钮权限</t-link>
            <t-link theme="primary" @click="rehandleClickOpAPI(slotProps)">API权限</t-link>
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
import { MessagePlugin, PageInfo, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import type { RoleItem } from '@/api/model/roleModel';
import { delRole } from '@/api/role';
import { prefix } from '@/config/global';
import { COLUMNS, ROLE_STATUS } from '@/pages/role/constants';
import { useRoleStore, useSettingStore } from '@/store';

const form = ref(null);

const roleStore = useRoleStore();

const rehandleClickOpMenu = (slot: { row: RoleItem }) => {
  roleStore.setCurrentRow(slot.row);
  roleStore.setMenuPermissionVisible(true);
};

const rehandleClickOpAPI = (slot: { row: RoleItem }) => {
  roleStore.setCurrentRow(slot.row);
  roleStore.setApiPermissionVisible(true);
};

const rehandleClickOpButton = (slot: { row: RoleItem }) => {
  roleStore.setCurrentRow(slot.row);
  roleStore.setButtonPermissionVisible(true);
};

const store = useSettingStore();

const rowKey = 'index';
const verticalAlign = 'top' as const;
const hover = true;

const confirmVisible = ref(false);

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
  roleStore.getRoleList();
};

const onCancel = () => {
  resetIdx();
};

onMounted(() => {
  roleStore.getRoleList();
});

const handleClickDelete = (slot: { row: { id: number } }) => {
  deleteIdx.value = slot.row.id;
  confirmVisible.value = true;
};
const onReset = (val: unknown) => {
  form.value.reset();
  console.log(val);
};
const onSubmit = () => {
  roleStore.getRoleList();
};
const rehandlePageChange = (pageInfo: PageInfo, newDataSource: TableRowData[]) => {
  console.log('分页变化', pageInfo, newDataSource);
  roleStore.setPagination({
    ...roleStore.pagination,
    current: pageInfo.current,
    pageSize: pageInfo.pageSize,
  });
  onSubmit();
};
const rehandleChange = (changeParams: unknown, triggerAndData: unknown) => {
  console.log('统一Change', changeParams, triggerAndData);
};

const rehandleClickOp = (slot: { row: RoleItem }) => {
  roleStore.setCurrentRow(slot.row);
  roleStore.setEditVisible(true);
};

const headerAffixedTop = computed(
  () =>
    ({
      offsetTop: store.isUseTabsRouter ? 48 : 0,
      container: `.${prefix}-layout`,
    } as any), // TO BE FIXED
);

const addRole = () => {
  roleStore.setAddVisible(true);
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
