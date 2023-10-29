<template>
  <div>
    <t-dialog
      v-if="userStore.addVisible"
      size="large"
      :visible="true"
      header="新增用户"
      :on-confirm="onSubmit"
      @close="handleClose"
    >
      <t-space direction="vertical" size="large" style="width: 100%">
        <t-form ref="form" :data="formData" :rules="RULES" @reset="onReset">
          <t-form-item label="用户名" name="username">
            <t-input v-model="formData.username" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="用户密码" name="password">
            <t-input v-model="formData.password" placeholder="请输入" />
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
import { onMounted, ref } from 'vue';

import { addUser } from '@/api/user';
import { useRoleStore, useUserStore } from '@/store';

import { RULES } from '../constants';
// eslint-disable-next-line
const form = ref(null);
const formData = ref({
  username: '',
  password: '',
  roleId: 0,
});
const keys = { value: 'id', label: 'name' };
const roleOptions = ref([]);
const userStore = useUserStore();
const roleStore = useRoleStore();

onMounted(() => {
  roleStore.getRoleListForSelect().then(() => {
    roleOptions.value = roleStore.roleListForSelect;
  });
});
const handleClose = () => {
  userStore.setAddVisible(false);
};
const onReset = () => {
  form.value.reset();
};
const onSubmit = () => {
  // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
  form.value.validate({ showErrorMessage: true }).then(async (validateResult: FormValidateResult<any>) => {
    if (validateResult === true) {
      await addUser({
        ...formData.value,
      });
      MessagePlugin.success('新增成功');
      userStore.getUserList();
      userStore.getUserTreeList();
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
