<template>
  <t-card class="user-info-list" title="个人信息" :bordered="false">
    <template #actions>
      <t-button v-if="disabled === false" @click="save">保存</t-button>
      <t-button v-if="disabled === false" @click="cancel">取消</t-button>
      <t-button theme="default" shape="square" variant="text" @click="disabled = false">
        <t-icon name="filter-2" />
      </t-button>
    </template>
    <t-space direction="vertical" size="large" style="width: 100%; margin-top: 20px">
      <t-form
        ref="form"
        :data="formData"
        :rules="rules"
        scroll-to-first-error="smooth"
        layout="inline"
        @reset="onReset"
      >
        <t-form-item label="账号" name="username">
          <t-input v-model="formData.username" :disabled="true"></t-input>
        </t-form-item>

        <t-form-item label="角色" name="roleName">
          <t-input v-model="formData.roleName" :disabled="true"></t-input>
        </t-form-item>

        <t-form-item label="上级账号" name="pUsername">
          <t-input v-model="formData.pUsername" :disabled="true"></t-input>
        </t-form-item>

        <t-form-item label="上级角色" name="pRoleName">
          <t-input v-model="formData.pRoleName" :disabled="true"></t-input>
        </t-form-item>
        <t-form-item label="昵称" name="nickname">
          <t-input v-model.trim="formData.nickname" :disabled="disabled"></t-input>
        </t-form-item>
        <t-form-item label="手机号" name="phone">
          <t-input v-model.trim="formData.phone" :disabled="disabled"></t-input>
        </t-form-item>
        <t-form-item label="邮箱" name="email">
          <t-input v-model.trim="formData.email" :disabled="disabled"></t-input>
        </t-form-item>
      </t-form>
    </t-space>
  </t-card>
</template>
<script lang="ts">
export default {
  name: 'MeInfo',
};
</script>
<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { AllValidateResult, FormValidateResult } from 'tdesign-vue-next/es/form/type';
import { ref } from 'vue';

import type { UserItem } from '@/api/model/userModel';
import { updateUser } from '@/api/user';
import { useSelfStore } from '@/store';

const disabled = ref(true);
const selfStore = useSelfStore();
const formData = ref<UserItem>({ ...selfStore.selfInfo });
const form = ref(null);

const rules = {
  phone: [
    {
      validator: (val: string) => /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(val),
      message: '手机号格式不正确',
    },
  ],
  email: [
    { required: false },
    {
      validator: (val: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
      message: '邮箱格式不正确',
    },
  ],
};
const save = () => {
  form.value.validate({ showErrorMessage: true }).then(async (validateResult: FormValidateResult<any>) => {
    if (validateResult === true) {
      await updateUser({
        id: formData.value.id,
        nickname: formData.value.nickname,
        phone: formData.value.phone,
        email: formData.value.email,
      });
      MessagePlugin.success('修改成功');
      selfStore.getUserInfo();
      disabled.value = true;
      return;
    }
    if (validateResult && Object.keys(validateResult).length) {
      const firstError = (Object.values(validateResult)[0] as Array<AllValidateResult>)?.[0]?.message;
      MessagePlugin.warning(firstError);
    }
  });
};
const cancel = () => {
  formData.value = { ...selfStore.selfInfo };
  disabled.value = true;
};
const onReset = () => {
  MessagePlugin.success('重置成功');
};
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
