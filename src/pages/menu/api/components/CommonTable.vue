<template>
  <div class="list-common-table">
    <t-form ref="form" :data="apiStore.searchFormData" :label-width="80" colon @reset="onReset" @submit="onSubmit">
      <t-row>
        <t-col :span="10">
          <t-row :gutter="[24, 24]">
            <t-col :span="4">
              <t-form-item label="url" name="url">
                <t-input
                  v-model="apiStore.searchFormData.url"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入url"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <!--            <t-col :span="4">
              <t-form-item label="method" name="method">
                <t-input
                  v-model="apiStore.searchFormData.method"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入method"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>-->
            <t-col :span="4">
              <t-form-item label="group" name="group">
                <t-input
                  v-model="apiStore.searchFormData.group"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入group"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
          </t-row>
        </t-col>

        <t-col :span="2" class="operation-container">
          <t-button theme="primary" type="button" :style="{ marginLeft: 'var(--td-comp-margin-s)' }" @click="addApi">
            添加
          </t-button>
          <t-button theme="primary" type="submit" :style="{ marginLeft: 'var(--td-comp-margin-s)' }"> 查询 </t-button>
          <t-button type="reset" variant="base" theme="default"> 重置 </t-button>
        </t-col>
      </t-row>
    </t-form>

    <div class="table-container">
      <t-table
        :data="apiStore.apiList"
        :columns="COLUMNS"
        :row-key="rowKey"
        :vertical-align="verticalAlign"
        :hover="hover"
        :pagination="apiStore.pagination"
        :loading="apiStore.dataLoading"
        :header-affixed-top="headerAffixedTop"
        @page-change="rehandlePageChange"
        @change="rehandleChange"
      >
        <template #op="slotProps">
          <t-space>
            <t-link theme="primary" @click="rehandleClickOp(slotProps)">编辑</t-link>
            <t-link theme="danger" @click="handleClickDelete(slotProps)">删除</t-link>
          </t-space>
        </template>
      </t-table>
      <t-dialog
        v-model:visible="confirmVisible"
        header="确认删除当前API？"
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

import { delApi } from '@/api/api';
import { prefix } from '@/config/global';
import { useApiStore, useSettingStore } from '@/store';

import { COLUMNS } from '../constants';

const apiStore = useApiStore();
const settingStore = useSettingStore();

const form = ref(null);

const rowKey = 'index';
const verticalAlign = 'top' as const;
const hover = true;

const confirmVisible = ref(false);

const deleteIdx = ref(-1);
const confirmBody = computed(() => {
  if (deleteIdx.value > -1) {
    return `删除后，api关联权限将被清空，且无法恢复`;
  }
  return '';
});
const resetIdx = () => {
  deleteIdx.value = -1;
};

const onConfirmDelete = async () => {
  await delApi(deleteIdx.value);
  confirmVisible.value = false;
  MessagePlugin.success('删除成功');
  resetIdx();
  apiStore.getApiList();
};

const onCancel = () => {
  resetIdx();
};

onMounted(() => {
  apiStore.getApiList();
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
  apiStore.getApiList();
};
const rehandlePageChange = (pageInfo: PageInfo, newDataSource: TableRowData[]) => {
  console.log('分页变化', pageInfo, newDataSource);
  apiStore.setPagination({
    ...apiStore.pagination,
    current: pageInfo.current,
    pageSize: pageInfo.pageSize,
  });
};
const rehandleChange = (changeParams: unknown, triggerAndData: unknown) => {
  console.log('统一Change', changeParams, triggerAndData);
};

const rehandleClickOp = (slot: { row: { id: number } }) => {
  apiStore.setCurrentRow(slot.row);
  editApi();
};

const headerAffixedTop = computed(
  () =>
    ({
      offsetTop: settingStore.isUseTabsRouter ? 48 : 0,
      container: `.${prefix}-layout`,
    } as any), // TO BE FIXED
);

const addApi = () => {
  apiStore.setAddVisible(true);
};

const editApi = () => {
  apiStore.setEditVisible(true);
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
    .t-api__text {
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
