<template>
  <div class="list-common-table">
    <t-form ref="form" :data="fileStore.searchFormData" :label-width="80" colon @reset="onReset" @submit="onSubmit">
      <t-row>
        <t-col :span="10">
          <t-row :gutter="[24, 24]">
            <t-col :span="4">
              <t-form-item label="上传驱动" name="drive">
                <t-select
                  v-model="fileStore.searchFormData.drive"
                  :keys="keys"
                  :options="fileStore.fileTypeList"
                  placeholder="请选择驱动"
                  :style="{ minWidth: '134px' }"
                  type="search"
                />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item label="原始文件名" name="originName">
                <t-input
                  v-model="fileStore.searchFormData.originName"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入原始文件名"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item label="文件后缀" name="ext">
                <t-input
                  v-model="fileStore.searchFormData.ext"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入文件后缀"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
          </t-row>
        </t-col>

        <t-col :span="2" class="operation-container">
          <t-button theme="primary" type="button" :style="{ marginLeft: 'var(--td-comp-margin-s)' }" @click="addFile">
            上传
          </t-button>
          <t-button theme="primary" type="submit" :style="{ marginLeft: 'var(--td-comp-margin-s)' }"> 查询 </t-button>
          <t-button type="reset" variant="base" theme="default"> 重置 </t-button>
        </t-col>
      </t-row>
    </t-form>

    <div class="table-container">
      <t-table
        :data="fileStore.fileList"
        :columns="COLUMNS"
        :row-key="rowKey"
        :vertical-align="verticalAlign"
        :hover="hover"
        :pagination="fileStore.pagination"
        :loading="fileStore.dataLoading"
        :header-affixed-top="headerAffixedTop"
        @page-change="rehandlePageChange"
        @change="rehandleChange"
      >
        <template #op="slotProps">
          <t-space>
            <t-link theme="primary" @click="rehandleClickOpView(slotProps)">预览</t-link>
            <t-link theme="primary" @click="rehandleClickOp(slotProps)">编辑</t-link>
            <t-link theme="danger" @click="handleClickDelete(slotProps)">删除</t-link>
          </t-space>
        </template>
      </t-table>
      <t-dialog
        v-model:visible="confirmVisible"
        header="确认删除当前文件？"
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

import { delFile } from '@/api/file';
import type { FileItem } from '@/api/model/fileModel';
import { prefix } from '@/config/global';
import { useFileStore, useSettingStore } from '@/store';

import { COLUMNS } from '../constants';

const keys = { value: 'configValue', label: 'configKey' };

const fileStore = useFileStore();
const settingStore = useSettingStore();
fileStore.getFileTypeList();
const form = ref(null);

const rowKey = 'index';
const verticalAlign = 'top' as const;
const hover = true;

const confirmVisible = ref(false);

const deleteIdx = ref(-1);
const confirmBody = computed(() => {
  if (deleteIdx.value > -1) {
    return `删除后，文件无法恢复`;
  }
  return '';
});
const resetIdx = () => {
  deleteIdx.value = -1;
};

const onConfirmDelete = async () => {
  await delFile(deleteIdx.value);
  confirmVisible.value = false;
  MessagePlugin.success('删除成功');
  resetIdx();
  fileStore.getFileList();
};

const onCancel = () => {
  resetIdx();
};

onMounted(() => {
  fileStore.getFileList();
});

const handleClickDelete = (slot: { row: FileItem }) => {
  deleteIdx.value = slot.row.id;
  confirmVisible.value = true;
};
const onReset = (val: unknown) => {
  form.value.reset();
  console.log(val);
};
const onSubmit = () => {
  fileStore.getFileList();
};
const rehandlePageChange = (pageInfo: PageInfo, newDataSource: TableRowData[]) => {
  console.log('分页变化', pageInfo, newDataSource);
  fileStore.setPagination({
    ...fileStore.pagination,
    current: pageInfo.current,
    pageSize: pageInfo.pageSize,
  });
  onSubmit();
};
const rehandleChange = (changeParams: unknown, triggerAndData: unknown) => {
  console.log('统一Change', changeParams, triggerAndData);
};

const rehandleClickOp = (slot: { row: FileItem }) => {
  fileStore.setCurrentRow(slot.row);
  editFile();
};

const rehandleClickOpView = (slot: { row: { fileUrl: string } }) => {
  console.log(slot);
  window.open(`http://127.0.0.1:8888/upload/${slot.row.fileUrl}`, '_blank');
};

const headerAffixedTop = computed(
  () =>
    ({
      offsetTop: settingStore.isUseTabsRouter ? 48 : 0,
      container: `.${prefix}-layout`,
    } as any), // TO BE FIXED
);

const addFile = () => {
  fileStore.setAddVisible(true);
};

const editFile = () => {
  fileStore.setEditVisible(true);
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
