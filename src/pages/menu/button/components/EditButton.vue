<template>
  <div>
    <t-drawer
      size="large"
      :visible="buttonStore.editVisible"
      header="修改按钮"
      :on-confirm="onSubmit"
      @close="handleClose"
    >
      <t-space direction="vertical" size="large" style="width: 100%">
        <t-form ref="form" :data="formData" :rules="RULES" @reset="onReset">
          <t-form-item label="名称" name="title">
            <t-input v-model="formData.title" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="标识码" name="name">
            <t-input v-model="formData.name" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="所在菜单" name="menuId">
            <t-cascader
              v-model="formData.menuId"
              value-mode="onlyLeaf"
              :keys="treeProps.keys"
              :options="menuStore.menuTreeList"
              clearable
            />
          </t-form-item>
          <t-form-item label="备注" name="remark">
            <t-input v-model="formData.remark" placeholder="请输入" />
          </t-form-item>
        </t-form>
      </t-space>
    </t-drawer>
  </div>
</template>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { AllValidateResult, FormValidateResult } from 'tdesign-vue-next/es/form/type';
import { ref, watch } from 'vue';

import { updateButton } from '@/api/button';
import { useButtonStore, useMenuStore } from '@/store';

import { RULES } from '../constants';
// eslint-disable-next-line
const buttonStore = useButtonStore();

const form = ref(null);

const formData = ref({ title: '', name: '', menuId: 0, menuTitle: '', remark: '' });
watch(
  () => buttonStore.editVisible,
  (v) => {
    if (v) {
      formData.value = buttonStore.currentRow;
    }
  },
);
const treeProps = {
  keys: {
    label: 'title',
    value: 'id',
    children: 'children',
  },
};
const menuStore = useMenuStore();
menuStore.getMenuTreeList();

const handleClose = () => {
  buttonStore.setEditVisible(false);
};
const onReset = () => {
  form.value.reset();
};
const onSubmit = () => {
  // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
  form.value.validate({ showErrorMessage: true }).then(async (validateResult: FormValidateResult<any>) => {
    if (validateResult === true) {
      await updateButton({
        ...formData.value,
      });
      MessagePlugin.success('修改成功');
      buttonStore.getButtonList();
      handleClose();
      return;
    }
    if (validateResult && Object.keys(validateResult).length) {
      const firstError = (Object.values(validateResult)[0] as Array<AllValidateResult>)?.[0]?.message;
      MessagePlugin.warning(firstError);
    }
  });
};
</script>
