<template>
  <div class="list-common-table">
    <t-form ref="form" :data="dictStore.searchFormData" :label-width="80" colon @reset="onReset" @submit="onSubmit">
      <t-row>
        <t-col :span="10">
          <t-row :gutter="[24, 24]">
            <t-col :span="4">
              <t-form-item label="字典类型" name="configType">
                <t-input
                  v-model="dictStore.searchFormData.configType"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入字典类型"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item label="参数键名" name="configKey">
                <t-input
                  v-model="dictStore.searchFormData.configKey"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入参数键名"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item label="参数键值" name="configValue">
                <t-input
                  v-model="dictStore.searchFormData.configValue"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入参数键值"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item label="参数名称" name="configName">
                <t-input
                  v-model="dictStore.searchFormData.configName"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入参数名称"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item label="创建者id" name="createBy">
                <t-input-number
                  v-model="dictStore.searchFormData.createBy"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入创建者id"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item label="更新者id" name="updateBy">
                <t-input-number
                  v-model="dictStore.searchFormData.updateBy"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入更新者id"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
          </t-row>
        </t-col>

        <t-col :span="2" class="operation-container">
          <t-button theme="primary" type="button" :style="{ marginLeft: 'var(--td-comp-margin-s)' }" @click="addDict">
            添加
          </t-button>
          <t-button theme="primary" type="submit" :style="{ marginLeft: 'var(--td-comp-margin-s)' }"> 查询 </t-button>
          <t-button type="reset" variant="base" theme="default"> 重置 </t-button>
        </t-col>
      </t-row>
    </t-form>

    <div class="table-container">
      <t-table
        :data="dictStore.dictList"
        :columns="COLUMNS"
        :row-key="rowKey"
        :vertical-align="verticalAlign"
        :hover="hover"
        :pagination="dictStore.pagination"
        :loading="dictStore.dataLoading"
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
        header="确认删除当前字典？"
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

import { delDict } from '@/api/dict';
import type { DictItem } from '@/api/model/dictModel';
import { prefix } from '@/config/global';
import { useDictStore, useSettingStore } from '@/store';

import { COLUMNS } from '../constants';

const dictStore = useDictStore();
const settingStore = useSettingStore();

const form = ref(null);

const rowKey = 'index';
const verticalAlign = 'top' as const;
const hover = true;

const confirmVisible = ref(false);

const deleteIdx = ref(-1);
const confirmBody = computed(() => {
  if (deleteIdx.value > -1) {
    return `删除后，字典无法恢复`;
  }
  return '';
});
const resetIdx = () => {
  deleteIdx.value = -1;
};

const onConfirmDelete = async () => {
  await delDict(deleteIdx.value);
  confirmVisible.value = false;
  MessagePlugin.success('删除成功');
  resetIdx();
  dictStore.getDictList();
};

const onCancel = () => {
  resetIdx();
};

onMounted(() => {
  dictStore.getDictList();
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
  dictStore.getDictList();
};
const rehandlePageChange = (pageInfo: PageInfo, newDataSource: TableRowData[]) => {
  console.log('分页变化', pageInfo, newDataSource);
  dictStore.setPagination({
    ...dictStore.pagination,
    current: pageInfo.current,
    pageSize: pageInfo.pageSize,
  });
  onSubmit();
};
const rehandleChange = (changeParams: unknown, triggerAndData: unknown) => {
  console.log('统一Change', changeParams, triggerAndData);
};

const rehandleClickOp = (slot: { row: DictItem }) => {
  dictStore.setCurrentRow(slot.row);
  editDict();
};

const headerAffixedTop = computed(
  () =>
    ({
      offsetTop: settingStore.isUseTabsRouter ? 48 : 0,
      container: `.${prefix}-layout`,
    } as any), // TO BE FIXED
);

const addDict = () => {
  dictStore.setAddVisible(true);
};

const editDict = () => {
  dictStore.setEditVisible(true);
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
