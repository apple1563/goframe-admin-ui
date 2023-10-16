<template>
  <div>
    <t-dialog
      size="large"
      :visible="dictStore.editVisible"
      header="修改字典"
      :on-confirm="onSubmit"
      @close="handleClose"
    >
      <t-space direction="vertical" size="large" style="width: 100%">
        <t-form ref="form" :data="formData" :rules="RULES" @reset="onReset">
          <t-form-item label="字典类型" name="configType">
            <t-input v-model="formData.configType" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="参数名称" name="configName">
            <t-input v-model="formData.configName" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="字典key" name="configKey">
            <t-input v-model="formData.configKey" disabled placeholder="请输入" />
          </t-form-item>
          <t-form-item label="字典value" name="configValue">
            <t-input v-model="formData.configValue" placeholder="请输入" />
          </t-form-item>
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
import { ref, watch } from 'vue';

import { updateDict } from '@/api/dict';
import type { DictItem } from '@/api/model/dictModel';
import { useDictStore } from '@/store';

import { RULES } from '../constants';
// eslint-disable-next-line
const dictStore = useDictStore();

const form = ref(null);

const formData = ref<DictItem>({});
watch(
  () => dictStore.editVisible,
  (v) => {
    if (v) {
      formData.value = dictStore.currentRow;
    }
  },
);

const handleClose = () => {
  dictStore.setEditVisible(false);
};
const onReset = () => {
  form.value.reset();
};
const onSubmit = () => {
  // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
  form.value.validate({ showErrorMessage: true }).then(async (validateResult) => {
    if (validateResult === true) {
      await updateDict({
        ...formData.value,
      });
      MessagePlugin.success('修改成功');
      dictStore.getDictList();
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
