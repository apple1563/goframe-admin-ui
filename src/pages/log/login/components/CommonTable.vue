<template>
  <div class="list-common-table">
    <t-form ref="form" :data="logStore.searchFormData" :label-width="80" colon @reset="onReset" @submit="onSubmit">
      <t-row>
        <t-col :span="10">
          <t-row :gutter="[24, 24]">
            <t-col :span="4">
              <t-form-item label="用户名" name="username">
                <t-input
                  v-model="logStore.searchFormData.username"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入username"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item label="ip地址" name="ip">
                <t-input
                  v-model="logStore.searchFormData.ip"
                  class="form-item-content"
                  type="search"
                  placeholder="请输入ip名"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item label="时间" name="timeBetween">
                <t-date-range-picker
                  v-model="logStore.searchFormData.timeBetween"
                  class="form-item-content"
                  enable-time-picker
                  allow-input
                  clearable
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
          </t-row>
        </t-col>

        <t-col :span="2" class="operation-container">
          <!--          <t-button theme="primary" type="button" :style="{ marginLeft: 'var(&#45;&#45;td-comp-margin-s)' }" @click="addLog">
            添加
          </t-button>-->
          <t-button theme="primary" type="submit" :style="{ marginLeft: 'var(--td-comp-margin-s)' }"> 查询 </t-button>
          <t-button type="reset" variant="base" theme="default"> 重置 </t-button>
        </t-col>
      </t-row>
    </t-form>

    <div class="table-container">
      <t-table
        :data="logStore.loginLogList"
        :columns="COLUMNS"
        :row-key="rowKey"
        :vertical-align="verticalAlign"
        :hover="hover"
        :pagination="logStore.pagination"
        :loading="logStore.dataLoading"
        :header-affixed-top="headerAffixedTop"
        @page-change="rehandlePageChange"
        @change="rehandleChange"
      >
      </t-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PageInfo, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { prefix } from '@/config/global';
import { useLogStore, useSettingStore } from '@/store';

import { COLUMNS } from '../constants';

const logStore = useLogStore();
const settingStore = useSettingStore();

const form = ref(null);

const rowKey = 'index';
const verticalAlign = 'top' as const;
const hover = true;

onMounted(() => {
  logStore.getLoginLogList();
});

const onReset = (val: unknown) => {
  form.value.reset();
  console.log(val);
};
const onSubmit = () => {
  logStore.getLoginLogList();
};
const rehandlePageChange = (pageInfo: PageInfo, newDataSource: TableRowData[]) => {
  console.log('分页变化', pageInfo, newDataSource);
  logStore.setPagination({
    ...logStore.pagination,
    current: pageInfo.current,
    pageSize: pageInfo.pageSize,
  });
  onSubmit();
};
const rehandleChange = (changeParams: unknown, triggerAndData: unknown) => {
  console.log('统一Change', changeParams, triggerAndData);
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
