<template>
  <div>
    <t-dialog
      size="large"
      :visible="fileStore.editVisible"
      header="修改文件"
      :on-confirm="onSubmit"
      @close="handleClose"
    >
      <t-space direction="vertical" size="large" style="width: 100%">
        <t-form ref="form" :data="formData" @reset="onReset">
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

import { updateFile } from '@/api/file';
import type { FileItem } from '@/api/model/fileModel';
import { useFileStore } from '@/store';

// eslint-disable-next-line
const fileStore = useFileStore();

const form = ref(null);

const formData = ref<FileItem>({});
watch(
  () => fileStore.editVisible,
  (v) => {
    if (v) {
      formData.value = fileStore.currentRow;
    }
  },
);

const handleClose = () => {
  fileStore.setEditVisible(false);
};
const onReset = () => {
  form.value.reset();
};
const onSubmit = () => {
  // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
  form.value.validate({ showErrorMessage: true }).then(async (validateResult) => {
    if (validateResult === true) {
      await updateFile({
        ...formData.value,
      });
      MessagePlugin.success('修改成功');
      fileStore.getFileList();
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
