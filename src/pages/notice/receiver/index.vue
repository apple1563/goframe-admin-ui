<template>
  <t-space direction="vertical" size="large" style="width: 100%">
    <div class="t-row t-row--space-between t-row--align-center">
      <div class="receiver-title">消息中心</div>
      <t-button size="medium" @click.stop="setReadAll">全部设为已读</t-button>
    </div>
    <t-collapse @change="onCollapseChange">
      <t-collapse-panel v-for="item in list" :key="item.id" :value="item.id" :header="item.title">
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
import type { PageInfo } from 'tdesign-vue-next';
import { CollapseValue, MessagePlugin } from 'tdesign-vue-next';
import { computed, ref } from 'vue';

import { delNoticeReceive, getNoticeReceiveList, updateNoticeReceive } from '@/api/notice';

const current = ref(1);
const pageSize = ref(30);
const total = ref(10);
const list = ref([]);
const pageSizeOptions = [
  { label: '每页 10 条', value: 10 },
  { label: '每页 30 条', value: 30 },
  { label: '每页 100 条', value: 100 },
  { label: '每页 50 条', value: 50 },
];

const getList = (): void => {
  getNoticeReceiveList({ page: current.value, size: pageSize.value }).then((res) => {
    current.value = res.page;
    pageSize.value = res.size;
    list.value = res.list;
    total.value = res.total;
  });
};
getList();
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
  const arr: Array<Promise<any>> = [];
  for (const item of list.value) {
    if (item.status === 1) {
      arr.push(
        updateNoticeReceive({
          id: item.id,
          status: 2,
        }),
      );
    }
  }
  Promise.all(arr).then(() => {
    MessagePlugin.success(`操作成功`);
    getList();
  });
};
const setRead = async (id: number) => {
  await updateNoticeReceive({
    id,
    status: 2,
  });
  MessagePlugin.success(`操作成功`);
  getList();
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
  getList();
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
