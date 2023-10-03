<template>
  <div>
    <t-drawer size="large" :visible="visible" header="添加角色" :on-confirm="onSubmit" @close="handleClose">
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
import { ref } from 'vue';

import { addRole } from '@/api/role';

import { INITIAL_DATA, RULES } from '../constants';
// eslint-disable-next-line
const props = defineProps({
  visible: {
    type: Boolean,
  },
});

const form = ref(null);
const formData = ref(INITIAL_DATA);
const emit = defineEmits(['handle-visible', 'fetch-data']);

const handleClose = () => {
  emit('handle-visible');
};
const fetchData = () => {
  emit('fetch-data');
};
const onReset = () => {
  form.value.reset();
};
const onSubmit = () => {
  // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
  form.value.validate({ showErrorMessage: true }).then(async (validateResult) => {
    if (validateResult === true) {
      await addRole(formData.value);
      MessagePlugin.success('添加成功');
      handleClose();
      fetchData();
      return;
    }
    if (validateResult && Object.keys(validateResult).length) {
      const firstError = Object.values(validateResult)[0]?.[0]?.message;
      MessagePlugin.warning(firstError);
    }
  });
};
</script>
