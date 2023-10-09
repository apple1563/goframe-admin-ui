<template>
  <div class="list-common-table">
    <t-form ref="form" :data="searchForm" :label-width="80" colon @reset="onReset" @submit="onSubmit">
      <t-row>
        <t-col :span="10">
          <t-row :gutter="[24, 24]">
            <t-col :span="3">
              <t-form-item label="用户id" name="id">
                <t-input-number
                  v-model="searchForm.id"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入用户id"
                />
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item label="用户名" name="username">
                <t-input
                  v-model="searchForm.username"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入用户名"
                />
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item label="用户角色" name="roleId">
                <t-select
                  v-model="searchForm.roleId"
                  class="form-item-content"
                  :keys="keys"
                  :options="roleOptions"
                  placeholder="请选择用户角色"
                  clearable
                />
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item label="直属上级" name="pUsername">
                <t-input v-model="searchForm.pUsername" class="form-item-content" placeholder="请输入直属上级名称" />
              </t-form-item>
            </t-col>
          </t-row>
        </t-col>

        <t-col :span="2" class="operation-container">
          <t-button
            theme="primary"
            type="button"
            :style="{ marginLeft: 'var(--td-comp-margin-s)' }"
            @click="rehandleClickOpAdd"
          >
            新增
          </t-button>
          <t-button theme="primary" type="submit" :style="{ marginLeft: 'var(--td-comp-margin-s)' }"> 查询 </t-button>
          <t-button type="reset" variant="base" theme="default"> 重置 </t-button>
        </t-col>
      </t-row>
    </t-form>

    <div class="table-container">
      <t-table
        :data="userStore.userList"
        :columns="COLUMNS"
        :row-key="rowKey"
        :vertical-align="verticalAlign"
        :hover="hover"
        :pagination="userStore.pagination"
        :loading="userStore.dataLoading"
        :header-affixed-top="headerAffixedTop"
        @page-change="rehandlePageChange"
        @change="rehandleChange"
      >
        <template #status="{ row }">
          <t-tag v-if="row.status === USER_STATUS.ENABLE" theme="success" variant="light"> 正常 </t-tag>
          <t-tag v-if="row.status === USER_STATUS.DISABLE" theme="warning" variant="light"> 禁用 </t-tag>
          <t-tag v-if="row.status === USER_STATUS.DEAD" theme="danger" variant="light"> 注销 </t-tag>
        </template>
        <template #op="slotProps">
          <t-space>
            <t-link theme="primary" @click="rehandleClickOpEdit(slotProps)">编辑</t-link>
            <t-link theme="danger" @click="handleClickDelete(slotProps)">注销</t-link>
          </t-space>
        </template>
      </t-table>
      <t-dialog
        v-model:visible="confirmVisible"
        header="确认注销当前用户？"
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

import { delUser } from '@/api/user';
import { prefix } from '@/config/global';
import { useRoleStore, useSettingStore, useUserStore } from '@/store';

import { COLUMNS, USER_STATUS } from '../constants';

/* interface FormData {
  username: string;
  roleId: number;
  id: number;
  pUsername: string;
} */

const settingStore = useSettingStore();
const userStore = useUserStore();
const roleStore = useRoleStore();

const keys = { value: 'id', label: 'name' };
const roleOptions = ref([]);
onMounted(() => {
  userStore.getUserList();
  roleStore.getRoleListForSelect().then(() => {
    roleOptions.value = roleStore.roleListForSelect;
  });
});

const searchForm = userStore.searchFormData;

const rowKey = 'index';
const verticalAlign = 'top' as const;
const hover = true;

const confirmVisible = ref(false);

const deleteIdx = ref(-1);
const confirmBody = computed(() => {
  if (deleteIdx.value > -1) {
    return `删除后，用户关联信息也会被删除，且无法恢复`;
  }
  return '';
});

const resetIdx = () => {
  deleteIdx.value = -1;
};

const onConfirmDelete = async () => {
  await delUser(deleteIdx.value);
  confirmVisible.value = false;
  MessagePlugin.success('删除成功');
  resetIdx();
  userStore.getUserList();
  userStore.getUserTreeList();
};

const onCancel = () => {
  resetIdx();
};

const handleClickDelete = (slot: { row: { id: number } }) => {
  deleteIdx.value = slot.row.id;
  confirmVisible.value = true;
};
const onReset = () => {
  form.value.reset();
};
const onSubmit = () => {
  userStore.getUserList();
};
const rehandlePageChange = (pageInfo: PageInfo, newDataSource: TableRowData[]) => {
  console.log('分页变化', pageInfo, newDataSource);
  userStore.setPagination({
    ...userStore.pagination,
    current: pageInfo.current,
    pageSize: pageInfo.pageSize,
  });
};
const rehandleChange = (changeParams: unknown, triggerAndData: unknown) => {
  console.log('统一Change', changeParams, triggerAndData);
};
const rehandleClickOpAdd = () => {
  userStore.setAddVisible(true);
};

const rehandleClickOpEdit = (ctx: unknown) => {
  userStore.setEditVisible(true);
  userStore.setCurrentRow(ctx.row);
};

const headerAffixedTop = computed(
  () =>
    ({
      offsetTop: settingStore.isUseTabsRouter ? 48 : 0,
      container: `.${prefix}-layout`,
    } as any), // TO BE FIXED
);
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
