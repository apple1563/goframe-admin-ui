<template>
  <div>
    <t-drawer
      size="large"
      :visible="buttonStore.addVisible"
      header="添加按钮"
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
import { ref } from 'vue';

import { addButton } from '@/api/button';
import type { ButtonItem } from '@/api/model/buttonModel';
import { useButtonStore, useMenuStore } from '@/store';

import { INITIAL_DATA, RULES } from '../constants';

// eslint-disable-next-line
const form = ref(null);
const formData = ref<ButtonItem>(INITIAL_DATA);

const treeProps = {
  keys: {
    label: 'title',
    value: 'id',
    children: 'children',
  },
};
const menuStore = useMenuStore();
menuStore.getMenuTreeList();

const buttonStore = useButtonStore();

const handleClose = () => {
  buttonStore.setAddVisible(false);
};

const onReset = () => {
  form.value.reset();
};
const onSubmit = () => {
  // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
  form.value.validate({ showErrorMessage: true }).then(async (validateResult) => {
    if (validateResult === true) {
      await addButton(formData.value);
      MessagePlugin.success('添加成功');
      buttonStore.getButtonList();
      handleClose();
      return;
    }
    if (validateResult && Object.keys(validateResult).length) {
      const firstError = Object.values(validateResult)[0]?.[0]?.message;
      MessagePlugin.warning(firstError);
    }
  });
};
</script>
