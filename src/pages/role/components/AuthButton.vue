<template>
  <div>
    <t-dialog
      size="large"
      :visible="roleStore.buttonPermissionVisible"
      header="按钮权限设置"
      :on-confirm="onSubmit"
      @close="handleClose"
    >
      <t-space direction="vertical" size="large" style="width: 100%">
        <t-select
          v-model="selecteds"
          :min-collapsed-num="5"
          multiple
          placeholder="-请选择-"
          :filter="filterMethod"
          style="width: 400px; display: inline-block"
          @blur="handleBlur"
          @change="handleChange"
        >
          <t-option v-for="item in options" :key="item.id" :value="item.id" :label="item.title">
            <div>{{ item.menuTitle }}-{{ item.title }}</div>
          </t-option>
        </t-select>
      </t-space>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { SelectOption, SelectValue, SelectValueChangeTrigger } from 'tdesign-vue-next/es/select/type';
import { ref, watch } from 'vue';

import { getRoleButton, setRoleButton } from '@/api/button';
import { useButtonStore, useRoleStore } from '@/store';
// eslint-disable-next-line
const roleStore = useRoleStore();
const buttonStore = useButtonStore();
// const keys = { label: 'title', value: 'id' };
const options = ref([]);
const selecteds = ref();
buttonStore.setPagination({ current: 1, pageSize: 9999 });
buttonStore.getButtonList().then(() => {
  options.value = buttonStore.buttonList;
});
watch(
  () => roleStore.buttonPermissionVisible,
  (v) => {
    if (v) {
      getRoleButton(roleStore.currentRow.id).then((res) => {
        selecteds.value = res.list;
      });
    }
  },
);

const handleClose = () => {
  roleStore.setButtonPermissionVisible(false);
};
const onSubmit = async () => {
  // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
  await setRoleButton(roleStore.currentRow.id, selecteds.value);
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
