<template>
  <t-card class="user-info-list" title="修改密码" :bordered="false">
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
        <t-form-item label="原密码" name="password">
          <t-input v-model.trim="formData.password" type="password" :disabled="disabled"></t-input>
        </t-form-item>
        <t-form-item
          label="新密码"
          name="passwordNew"
          title="长度至少为 8 个字符，至少一个字母、一个数字和一个特殊字符（@, $, !, %, *, ?, &）"
        >
          <t-input v-model.trim="formData.passwordNew" type="password" :disabled="disabled"></t-input>
        </t-form-item>
        <t-form-item label="确认密码" name="passwordNewAgain">
          <t-input v-model.trim="formData.passwordNewAgain" type="password" :disabled="disabled"></t-input>
        </t-form-item>
      </t-form>
    </t-space>
  </t-card>
</template>
<script lang="ts">
export default {
  name: 'MePassWord',
};
</script>
<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { AllValidateResult, FormValidateResult } from 'tdesign-vue-next/es/form/type';
import { ref } from 'vue';

import type { PassWordFormType } from '@/api/model/userModel';
import { updateUserPassword } from '@/api/user';

const disabled = ref(true);
const formData = ref<PassWordFormType>({ password: '', passwordNew: '' });
const form = ref(null);

const rules = {
  password: [{ required: true }],
  passwordNew: [
    { required: true },
    {
      validator: (val: string) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(val),
      message: '长度至少为 8 个字符，至少一个字母、一个数字和一个特殊字符（@, $, !, %, *, ?, &）',
    },
  ],
  passwordNewAgain: [
    { required: true },
    {
      validator: (val: string) => val === formData.value.passwordNew,
      message: '与新密码不一致',
    },
  ],
};
const save = () => {
  form.value.validate({ showErrorMessage: true }).then(async (validateResult: FormValidateResult<any>) => {
    if (validateResult === true) {
      await updateUserPassword({
        passwordNew: formData.value.passwordNew,
        password: formData.value.password,
      });
      MessagePlugin.success('修改成功');
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
  form.value.reset();
  form.value.clearValidate();
  disabled.value = true;
};
const onReset = () => {
  // MessagePlugin.success('重置成功');
};
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
