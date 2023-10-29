<template>
  <div>
    <t-dialog size="large" :visible="apiStore.editVisible" header="修改API" :on-confirm="onSubmit" @close="handleClose">
      <t-space direction="vertical" size="large" style="width: 100%">
        <t-form ref="form" :data="formData" :rules="RULES" @reset="onReset">
          <t-form-item label="url" name="url">
            <t-input v-model="formData.url" disabled placeholder="请输入" />
          </t-form-item>
          <t-form-item label="method" name="method">
            <t-input v-model="formData.method" disabled placeholder="请输入" />
          </t-form-item>
          <!--          <t-form-item label="group" name="group">
            <t-input v-model="formData.group" disabled placeholder="请输入" />
          </t-form-item>-->
          <t-form-item label="备注" name="remark">
            <t-input v-model="formData.remark" placeholder="请输入" />
          </t-form-item>
        </t-form>
      </t-space>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { AllValidateResult, FormValidateResult } from 'tdesign-vue-next/es/form/type';
import { ref, watch } from 'vue';

import { updateApi } from '@/api/api';
import type { ApiItem } from '@/api/model/apiModel';
import { useApiStore } from '@/store';

import { RULES } from '../constants';
// eslint-disable-next-line
const apiStore = useApiStore();

const form = ref(null);

const formData = ref<ApiItem>({ url: '', method: '', remark: '' });
watch(
  () => apiStore.editVisible,
  (v) => {
    if (v) {
      formData.value = apiStore.currentRow;
    }
  },
);

const handleClose = () => {
  apiStore.setEditVisible(false);
};
const onReset = () => {
  form.value.reset();
};
const onSubmit = () => {
  // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
  form.value.validate({ showErrorMessage: true }).then(async (validateResult: FormValidateResult<any>) => {
    if (validateResult === true) {
      await updateApi({
        ...formData.value,
      });
      MessagePlugin.success('修改成功');
      apiStore.getApiList();
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
