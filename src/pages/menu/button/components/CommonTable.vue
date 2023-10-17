<template>
  <div class="list-common-table">
    <t-form ref="form" :data="buttonStore.searchFormData" :label-width="80" colon @reset="onReset" @submit="onSubmit">
      <t-row>
        <t-col :span="10">
          <t-row :gutter="[24, 24]">
            <t-col :span="4">
              <t-form-item label="名称" name="title">
                <t-input
                  v-model="buttonStore.searchFormData.title"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入按钮名称"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item label="标识符" name="name">
                <t-input
                  v-model="buttonStore.searchFormData.name"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入按钮名称"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item label="所在菜单" name="menuTitle">
                <t-input
                  v-model="buttonStore.searchFormData.menuTitle"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入所在菜单名称"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
          </t-row>
        </t-col>

        <t-col :span="2" class="operation-container">
          <t-button
            v-auth-button="4"
            theme="primary"
            type="button"
            :style="{ marginLeft: 'var(--td-comp-margin-s)' }"
            @click="addButton"
          >
            添加
          </t-button>
          <t-button v-auth-button="5" theme="primary" type="submit" :style="{ marginLeft: 'var(--td-comp-margin-s)' }">
            查询
          </t-button>
          <t-button v-auth-button="6" type="reset" variant="base" theme="default"> 重置 </t-button>
        </t-col>
      </t-row>
    </t-form>

    <div class="table-container">
      <t-table
        :data="buttonStore.buttonList"
        :columns="COLUMNS"
        :row-key="rowKey"
        :vertical-align="verticalAlign"
        :hover="hover"
        :pagination="buttonStore.pagination"
        :loading="buttonStore.dataLoading"
        :header-affixed-top="headerAffixedTop"
        @page-change="rehandlePageChange"
        @change="rehandleChange"
      >
        <template #op="slotProps">
          <t-space>
            <t-link v-auth-button="8" theme="primary" @click="rehandleClickOp(slotProps)">编辑</t-link>
            <t-link v-auth-button="9" theme="danger" @click="handleClickDelete(slotProps)">删除</t-link>
          </t-space>
        </template>
      </t-table>
      <t-dialog
        v-model:visible="confirmVisible"
        header="确认删除当前按钮？"
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

import { delButton } from '@/api/button';
import { prefix } from '@/config/global';
import { useButtonStore, useSettingStore } from '@/store';

import { COLUMNS } from '../constants';

const buttonStore = useButtonStore();
const settingStore = useSettingStore();
buttonStore.setPagination({ pageSize: 20 });

const form = ref(null);

const rowKey = 'index';
const verticalAlign = 'top' as const;
const hover = true;

const confirmVisible = ref(false);

const deleteIdx = ref(-1);
const confirmBody = computed(() => {
  if (deleteIdx.value > -1) {
    return `删除后，按钮关联权限将被清空，且无法恢复`;
  }
  return '';
});
const resetIdx = () => {
  deleteIdx.value = -1;
};

const onConfirmDelete = async () => {
  await delButton(deleteIdx.value);
  confirmVisible.value = false;
  MessagePlugin.success('删除成功');
  resetIdx();
  buttonStore.getButtonList();
};

const onCancel = () => {
  resetIdx();
};

onMounted(() => {
  buttonStore.getButtonList();
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
  buttonStore.getButtonList();
};
const rehandlePageChange = (pageInfo: PageInfo, newDataSource: TableRowData[]) => {
  console.log('分页变化', pageInfo, newDataSource);
  buttonStore.setPagination({
    ...buttonStore.pagination,
    current: pageInfo.current,
    pageSize: pageInfo.pageSize,
  });
  onSubmit();
};
const rehandleChange = (changeParams: unknown, triggerAndData: unknown) => {
  console.log('统一Change', changeParams, triggerAndData);
};

const rehandleClickOp = (slot: { row: { id: number } }) => {
  buttonStore.setCurrentRow(slot.row);
  editButton();
};

const headerAffixedTop = computed(
  () =>
    ({
      offsetTop: settingStore.isUseTabsRouter ? 48 : 0,
      container: `.${prefix}-layout`,
    } as any), // TO BE FIXED
);

const addButton = () => {
  buttonStore.setAddVisible(true);
};

const editButton = () => {
  buttonStore.setEditVisible(true);
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
