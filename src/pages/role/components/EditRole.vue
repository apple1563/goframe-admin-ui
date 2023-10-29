<template>
  <div>
    <t-drawer
      size="large"
      :visible="roleStore.editVisible"
      header="编辑角色"
      :on-confirm="onSubmit"
      @close="handleClose"
    >
      <t-space direction="vertical" size="large" style="width: 100%">
        <t-form ref="form" :data="formData" :rules="RULES" @reset="onReset">
          <t-form-item label="名称" name="name">
            <t-input v-model="formData.name" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="状态" name="status">
            <t-radio-group v-model="formData.status" :default-value="2">
              <t-radio-button :value="1">启用</t-radio-button>
              <t-radio-button :value="2">禁用</t-radio-button>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="排序" name="listOrder">
            <t-input-number v-model="formData.listOrder" placeholder="请输入" />
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

import type { RoleItem } from '@/api/model/roleModel';
import { updateRole } from '@/api/role';
import { useRoleStore } from '@/store';

import { INITIAL_DATA, RULES } from '../constants';

const roleStore = useRoleStore();

// eslint-disable-next-line
const form = ref(null);
const formData = ref<RoleItem>(INITIAL_DATA);
watch(
  () => roleStore.editVisible,
  (v) => {
    if (v) {
      formData.value = roleStore.currentRow;
    }
  },
);
const handleClose = () => {
  roleStore.setEditVisible(false);
};
const onReset = () => {
  form.value.reset();
};
const onSubmit = () => {
  // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
  form.value.validate({ showErrorMessage: true }).then(async (validateResult: FormValidateResult<any>) => {
    if (validateResult === true) {
      await updateRole(formData.value);
      MessagePlugin.success('编辑成功');
      roleStore.setEditVisible(false);
      roleStore.getRoleList();
      return;
    }
    if (validateResult && Object.keys(validateResult).length) {
      const firstError = (Object.values(validateResult)[0] as Array<AllValidateResult>)?.[0]?.message;
      MessagePlugin.warning(firstError);
    }
  });
};
</script>
