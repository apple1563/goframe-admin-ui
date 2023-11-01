<template>
  <t-space direction="vertical" size="large" style="width: 100%">
    <div class="t-row t-row--space-between t-row--align-center">
      <div class="receiver-title">消息中心</div>
      <t-button size="medium" @click.stop="setReadAll">全部已读</t-button>
    </div>
    <t-collapse @change="onCollapseChange">
      <t-collapse-panel v-for="item in msgData" :key="item.id" :value="item.id" :header="item.title">
        <template #headerRightContent>
          <t-space size="small">
            <t-tag>{{ item.tag }} </t-tag>
            <t-tag v-if="item.status === 2">已读 </t-tag>
            <t-button v-if="item.status === 1" size="small" @click.stop="setRead(item.id)">设为已读</t-button>
            <t-button size="small" @click.stop="handleClickDelete(item.id)">删除</t-button>
          </t-space>
        </template>
        <div v-html="item.content"></div>
      </t-collapse-panel>
    </t-collapse>
    <t-pagination
      v-model="current"
      v-model:pageSize="pageSize"
      :total="total"
      show-sizer
      :page-size-options="pageSizeOptions"
      @change="onPageChange"
      @page-size-change="onPageSizeChange"
      @current-change="onCurrentChange"
    />
    <t-dialog
      v-model:visible="confirmVisible"
      header="确认删除当前消息？"
      :body="confirmBody"
      :on-cancel="onCancel"
      @confirm="onConfirmDelete"
    />
  </t-space>
</template>
<script lang="ts">
export default {
  name: 'Receiver',
};
</script>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { PageInfo } from 'tdesign-vue-next';
import { CollapseValue, MessagePlugin } from 'tdesign-vue-next';
import { computed, ref } from 'vue';

import { delNoticeReceive } from '@/api/notice';
import { useNoticeReceiverStore } from '@/store';

const store = useNoticeReceiverStore();
const { msgData, current, pageSize, total } = storeToRefs(store);

const pageSizeOptions = [
  { label: '每页 10 条', value: 10 },
  { label: '每页 30 条', value: 30 },
  { label: '每页 100 条', value: 100 },
  { label: '每页 50 条', value: 50 },
];
store.getList();
const onPageSizeChange = (size: number) => {
  console.log('page-size:', size);
  MessagePlugin.success(`pageSize变化为${size}`);
};

const onCurrentChange = (index: number, pageInfo: PageInfo) => {
  // MessagePlugin.success(`转到第${index}页`);
  console.log(pageInfo);
};

const onPageChange = (pageInfo: PageInfo) => {
  console.log(pageInfo);
};

const onCollapseChange = (v: CollapseValue) => {
  console.log(v);
};
const setReadAll = () => {
  const arr: Array<number> = [];
  for (const item of msgData.value) {
    if (item.status === 1) {
      arr.push(item.id);
    }
  }
  store.batchUpdateMsgStatus(arr, () => {
    MessagePlugin.success(`操作成功`);
  });
};
const setRead = (id: number) => {
  store.updateMsgStatus(
    {
      id,
      status: 2,
    },
    () => {
      MessagePlugin.success(`操作成功`);
    },
  );
};
const confirmVisible = ref(false);
const deleteIdx = ref(-1);
const confirmBody = computed(() => {
  if (deleteIdx.value > -1) {
    return `删除后，消息无法恢复`;
  }
  return '';
});
const handleClickDelete = (id: number) => {
  deleteIdx.value = id;
  confirmVisible.value = true;
};
const resetIdx = () => {
  deleteIdx.value = -1;
};
const onConfirmDelete = async () => {
  await delNoticeReceive(deleteIdx.value);
  confirmVisible.value = false;
  MessagePlugin.success('删除成功');
  resetIdx();
  store.getList();
};
const onCancel = () => {
  resetIdx();
};
</script>

<style lang="less" scoped>
.receiver-title {
  font: var(--td-font-title-large);
  font-weight: 400;
}
</style>
