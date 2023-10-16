<template>
  <div>
    <t-dialog size="large" :visible="apiStore.addVisible" header="添加API" :on-confirm="onSubmit" @close="handleClose">
      <t-space direction="vertical" size="large" style="width: 100%">
        <t-form ref="form" :data="formData" :rules="RULES" @reset="onReset">
          <t-form-item label="url" name="url">
            <t-input v-model="formData.url" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="method" name="method">
            <t-input v-model="formData.method" placeholder="请输入" />
          </t-form-item>
          <!--          <t-form-item label="group" name="group">
            <t-input v-model="formData.group" placeholder="请输入" />
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
import { ref } from 'vue';

import { addApi } from '@/api/api';
import type { ApiItem } from '@/api/model/apiModel';
import { useApiStore } from '@/store';

import { RULES } from '../constants';
// eslint-disable-next-line
const form = ref(null);
const formData = ref<ApiItem>({});

const apiStore = useApiStore();

const handleClose = () => {
  apiStore.setAddVisible(false);
};
const onReset = () => {
  form.value.reset();
};
const onSubmit = () => {
  // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
  form.value.validate({ showErrorMessage: true }).then(async (validateResult) => {
    if (validateResult === true) {
      await addApi({
        ...formData.value,
        group: formData.value.method.split('/').slice(0, 3).join('/'),
      });
      MessagePlugin.success('添加成功');
      apiStore.getApiList();
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
