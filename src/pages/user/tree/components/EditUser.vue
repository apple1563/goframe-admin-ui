<template>
  <div>
    <t-dialog
      size="large"
      :visible="userStore.editVisible"
      header="编辑用户"
      :on-confirm="onSubmit"
      @close="handleClose"
    >
      <t-space direction="vertical" size="large" style="width: 100%">
        <t-form ref="form" :data="formData" :rules="RULES" @reset="onReset">
          <t-form-item label="用户名" name="username">
            <t-input v-model="formData.username" disabled placeholder="请输入" />
          </t-form-item>
          <t-form-item label="昵称" name="nickname">
            <t-input v-model="formData.nickname" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="邮箱" name="email">
            <t-input v-model="formData.email" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="手机" name="phone">
            <t-input v-model="formData.phone" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="状态" name="status">
            <t-select
              v-model="formData.status"
              class="form-item-content"
              :options="USER_STATUS_OPTIONS"
              placeholder="请选择用户状态"
              clearable
            />
          </t-form-item>
          <t-form-item label="角色" name="menuId">
            <t-select
              v-model="formData.roleId"
              :keys="keys"
              class="form-item-content"
              :options="roleOptions"
              placeholder="请选择用户角色"
              clearable
            />
          </t-form-item>
        </t-form>
      </t-space>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { AllValidateResult, FormValidateResult } from 'tdesign-vue-next/es/form/type';
import { onMounted, ref, watch } from 'vue';

import { updateUser } from '@/api/user';
import { useRoleStore, useUserStore } from '@/store';

import { RULES, USER_STATUS_OPTIONS } from '../constants';
// eslint-disable-next-line
const form = ref(null);
const formData = ref({ username: '', nickname: '', email: '', phone: '', status: 0, roleId: 0 });
const keys = { value: 'id', label: 'name' };
const roleOptions = ref([]);
const userStore = useUserStore();
const roleStore = useRoleStore();

onMounted(() => {
  roleStore.getRoleListForSelect().then(() => {
    roleOptions.value = roleStore.roleListForSelect;
  });
});
watch(
  () => userStore.editVisible,
  (v) => {
    if (v) {
      formData.value = userStore.currentRow;
    }
  },
);
const handleClose = () => {
  userStore.setEditVisible(false);
};
const onReset = () => {
  form.value.reset();
};
const onSubmit = () => {
  // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
  form.value.validate({ showErrorMessage: true }).then(async (validateResult: FormValidateResult<any>) => {
    if (validateResult === true) {
      await updateUser({
        ...formData.value,
      });
      MessagePlugin.success('编辑成功');
      userStore.getUserList();
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
