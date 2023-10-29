<template>
  <div>
    <t-dialog
      size="large"
      :visible="roleStore.apiPermissionVisible"
      header="API权限设置"
      :on-confirm="onSubmit"
      @close="handleClose"
    >
      <t-space direction="vertical" size="large" style="width: 100%">
        <t-select
          v-model="selecteds"
          :min-collapsed-num="2"
          :options="options"
          multiple
          placeholder="-请选择-"
          :filter="filterMethod"
          style="width: 400px; display: inline-block"
          @blur="handleBlur"
          @change="handleChange"
        >
        </t-select>
      </t-space>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { SelectOption, SelectValue, SelectValueChangeTrigger } from 'tdesign-vue-next/es/select/type';
import { ref, watch } from 'vue';

import { getRoleApi, setRoleApi } from '@/api/api';
// import type { ApiItem } from '@/api/model/apiModel';
import { listToGroup } from '@/pages/role/tool';
import { useApiStore, useRoleStore } from '@/store';
// eslint-disable-next-line
const roleStore = useRoleStore();
const apiStore = useApiStore();
// const keys = { label: 'title', value: 'id' };
const options = ref([]);
const selecteds = ref();
apiStore.setPagination({ current: 1, pageSize: 9999 });
apiStore.getApiList().then(() => {
  options.value = listToGroup(apiStore.apiList);
});

watch(
  () => roleStore.apiPermissionVisible,
  (v) => {
    if (v) {
      getRoleApi(roleStore.currentRow.id).then((res) => {
        console.log(res, 555555);
        selecteds.value = res.list.map((o) => `${o.url}-${o.method}`);
      });
    }
  },
);

const handleClose = () => {
  roleStore.setApiPermissionVisible(false);
};
const onSubmit = async () => {
  // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
  await setRoleApi(
    roleStore.currentRow.id,
    selecteds.value.map((o: string) => {
      const arr = o.split('-');
      return {
        url: arr[0],
        method: arr[1],
      };
    }),
  );
  MessagePlugin.success('设置成功').then();
  handleClose();
};
const filterMethod = (search: string, option: { label: string }) => {
  console.log('filter:', search, option);
  return option.label.indexOf(search) !== -1;
};

const handleBlur = (ctx: { value: SelectValue; e: FocusEvent | KeyboardEvent }) => {
  console.log('handleBlur: ', ctx.value, ctx.e);
};

const handleChange = (
  value: SelectValue,
  context: {
    option?: SelectOption;
    selectedOptions: SelectOption[];
    trigger: SelectValueChangeTrigger;
    e?: MouseEvent | KeyboardEvent;
  },
) => {
  // context.selectedOptions
  console.log('handleChange: ', value, context);
};

/* const handleEnter = ({ value, e, inputValue }) => {
  console.log('handleEnter: ', value, e, inputValue);
}; */
</script>
