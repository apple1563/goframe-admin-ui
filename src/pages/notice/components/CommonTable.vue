<template>
  <div class="list-common-table">
    <t-form ref="form" :data="noticeStore.searchFormData" :label-width="80" colon @reset="onReset" @submit="onSubmit">
      <t-row>
        <t-col :span="10">
          <t-row :gutter="[24, 24]">
            <t-col :span="3">
              <t-form-item label="标题" name="title">
                <t-input
                  v-model="noticeStore.searchFormData.title"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入标题关键字"
                />
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item label="内容" name="content">
                <t-input
                  v-model="noticeStore.searchFormData.content"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入内容关键字"
                />
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item label="标签" name="tag">
                <t-input
                  v-model="noticeStore.searchFormData.tag"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入标签"
                />
              </t-form-item>
            </t-col>
            <t-col :span="3">
              <t-form-item label="创建者" name="creater">
                <t-input-number
                  v-model="noticeStore.searchFormData.creater"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入创建者账号"
                />
              </t-form-item>
            </t-col>
          </t-row>
        </t-col>

        <t-col :span="2" class="operation-container">
          <t-button theme="primary" type="button" :style="{ marginLeft: 'var(--td-comp-margin-s)' }" @click="addNotice">
            发送
          </t-button>
          <t-button theme="primary" type="submit" :style="{ marginLeft: 'var(--td-comp-margin-s)' }"> 查询 </t-button>
          <t-button type="reset" variant="base" theme="default"> 重置 </t-button>
        </t-col>
      </t-row>
    </t-form>

    <div class="table-container">
      <t-table
        :data="noticeStore.noticeList"
        :columns="COLUMNS"
        :row-key="rowKey"
        :vertical-align="verticalAlign"
        :hover="hover"
        :pagination="noticeStore.pagination"
        :loading="noticeStore.dataLoading"
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
        header="确认删除当前公告？"
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

import { delNotice } from '@/api/notice';
import { prefix } from '@/config/global';
import { useNoticeStore, useSettingStore } from '@/store';

import { COLUMNS } from '../constants';

const noticeStore = useNoticeStore();
const settingStore = useSettingStore();

const form = ref(null);

const rowKey = 'index';
const verticalAlign = 'top' as const;
const hover = true;

const confirmVisible = ref(false);

const deleteIdx = ref(-1);
const confirmBody = computed(() => {
  if (deleteIdx.value > -1) {
    return `删除后，公告无法恢复`;
  }
  return '';
});
const resetIdx = () => {
  deleteIdx.value = -1;
};

const onConfirmDelete = async () => {
  await delNotice(deleteIdx.value);
  confirmVisible.value = false;
  MessagePlugin.success('删除成功');
  resetIdx();
  noticeStore.getNoticeList();
};

const onCancel = () => {
  resetIdx();
};

onMounted(() => {
  noticeStore.getNoticeList();
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
  noticeStore.getNoticeList();
};
const rehandlePageChange = (pageInfo: PageInfo, newDataSource: TableRowData[]) => {
  console.log('分页变化', pageInfo, newDataSource);
  noticeStore.setPagination({
    ...noticeStore.pagination,
    current: pageInfo.current,
    pageSize: pageInfo.pageSize,
  });
  onSubmit();
};
const rehandleChange = (changeParams: unknown, triggerAndData: unknown) => {
  console.log('统一Change', changeParams, triggerAndData);
};

const rehandleClickOp = (slot: { row: { id: number } }) => {
  noticeStore.setCurrentRow(slot.row);
  editNotice();
};

const headerAffixedTop = computed(
  () =>
    ({
      offsetTop: settingStore.isUseTabsRouter ? 48 : 0,
      container: `.${prefix}-layout`,
    } as any), // TO BE FIXED
);

const addNotice = () => {
  noticeStore.setAddVisible(true);
};

const editNotice = () => {
  noticeStore.setEditVisible(true);
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
