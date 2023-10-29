<template>
  <div>
    <t-dialog
      size="large"
      width="680px"
      :visible="fileStore.addVisible"
      header="添加文件"
      :on-confirm="onSubmit"
      :confirm-btn="null"
      :cancel-btn="null"
      @close="handleClose"
    >
      <t-space direction="vertical" size="large" style="width: 100%">
        <t-form ref="form" :data="formData" :rules="RULES" @reset="onReset">
          <t-form-item label="上传选项">
            <t-radio-group v-model="type">
              <t-radio :value="1">普通文件（10M内）</t-radio>
              <t-radio :value="2">大文件（10M以上）</t-radio>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="驱动" name="drive">
            <t-select
              v-model="formData.drive"
              auto-width
              :keys="keys"
              :options="fileStore.fileTypeList"
              placeholder="请选择"
            />
          </t-form-item>
          <t-form-item label="备注" name="remark">
            <t-input v-model="formData.remark" placeholder="请输入" />
          </t-form-item>
          <t-form-item v-if="type === 1" :key="1" label="文件" name="file">
            <t-upload
              ref="uploadRef"
              v-model="formData.file"
              multiple
              placeholder="支持批量上传文件，文件格式不限，最多只能上传 10 份文件"
              theme="file-flow"
              :auto-upload="false"
              :request-method="requestMethod"
              :on-fail="handleRequestFail"
              :max="10"
              :show-thumbnail="false"
              :allow-upload-duplicate-file="true"
              :is-batch-upload="true"
              :upload-all-files-in-one-request="true"
              show-upload-progress
              use-mock-progress
            ></t-upload>
          </t-form-item>
          <t-form-item v-if="type === 2" :key="2" label="大文件" name="file">
            <t-upload
              ref="uploadBigRef"
              v-model="formData.fileBig"
              show-upload-progress
              use-mock-progress
              placeholder="单个大文件上传"
              theme="file-flow"
              :auto-upload="false"
              :request-method="requestBigMethod"
              :on-fail="handleRequestFail"
              :show-thumbnail="false"
              :allow-upload-duplicate-file="true"
              :is-batch-upload="true"
              :upload-all-files-in-one-request="true"
            ></t-upload>
          </t-form-item>
        </t-form>
      </t-space>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { AllValidateResult, FormValidateResult } from 'tdesign-vue-next/es/form/type';
import type { RequestMethodResponse, UploadFailContext, UploadFile } from 'tdesign-vue-next/es/upload/type';
import { ref, watch } from 'vue';

import { addChunkFile, addFile } from '@/api/file';
import { useFileStore } from '@/store';

import { RULES } from '../constants';
// eslint-disable-next-line
const form = ref(null);
const formData = ref({ drive: '', remark: '', file: [], fileBig: [] });
const type = ref(1);
const uploadRef = ref();
const uploadBigRef = ref();
const fileStore = useFileStore();
const keys = { value: 'configValue', label: 'configKey' };

watch(
  () => fileStore.addVisible,
  (v) => {
    if (v) {
      formData.value.drive = fileStore.fileTypeList[0]?.configValue;
    }
  },
);
const handleClose = () => {
  fileStore.setAddVisible(false);
};
const onReset = () => {
  form.value.reset();
};
const requestMethod = (file: UploadFile | Array<UploadFile>): Promise<RequestMethodResponse> => {
  return new Promise((resolve) => {
    // 上传进度控制示例
    let percent = 0;
    const percentTimer = setInterval(() => {
      if (percent + 10 < 99) {
        percent += 10;
        uploadRef.value.uploadFilePercent({ file, percent });
      } else {
        // clearInterval(percentTimer);
      }
    }, 100);

    const timer = setTimeout(() => {
      addFile({
        drive: formData.value.drive,
        file: formData.value.file.map((v) => v.raw),
      }).then((res) => {
        // resolve 参数为关键代码
        resolve({ status: 'success', response: res });
        fileStore.getFileList();
        clearTimeout(timer);
        clearInterval(percentTimer);
      });
    }, 1000);
  });
};
const handleRequestFail = (e: UploadFailContext) => {
  console.log(e);
};
const CHUNK_SIZE = 5 * 1024 * 1024; // 分片大小，这里设置为10MB
const MAX_CONCURRENT_REQUESTS = 50; // 最大并发请求数
const requestBigMethod = (file: UploadFile): Promise<RequestMethodResponse> => {
  uploadBigRef.value.uploadFilePercent({ file, percent: 50 });
  console.log(file);
  const { size } = file;
  const ext = file.name.split('.').pop();
  const temp = file.name + String(Date.now());
  const originName = file.name;
  const fileRaw = file.raw;
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const fileChunks = [];
    let offset = 0;

    // 切分文件为分片
    while (offset < fileRaw.size) {
      const chunk = fileRaw.slice(offset, offset + CHUNK_SIZE);
      fileChunks.push(chunk);
      offset += CHUNK_SIZE;
    }
    const totalChunks = fileChunks.length;
    let uploadedChunks = 0;
    // 控制并发请求数的逻辑
    let concurrentCount = 0;
    const uploadPromises = [];

    for (let i = 0; i < totalChunks; i++) {
      const chunk = new File([fileChunks[i]], String(i));
      /*  const percent = Math.floor(((i + 1) / totalChunks) * 100);
      uploadBigRef.value.uploadFilePercent({ file, percent }); */

      // 模拟上传分片
      const uploadPromise = addChunkFile({
        drive: formData.value.drive,
        chunk,
        chunkIndex: i,
        totalChunks,
        temp,
        originName,
        ext,
        size,
        // eslint-disable-next-line no-loop-func
      }).then((res) => {
        uploadedChunks++;
        const percent = (uploadedChunks / totalChunks) * 100;
        console.log(percent, uploadedChunks, totalChunks);
        console.log(file);
        // 上传进度通知
        uploadBigRef.value.uploadFilePercent({ file, percent });

        // 如果所有分片上传完毕
        if (uploadedChunks === totalChunks) {
          console.log(res);
          resolve({ status: 'success', response: { msg: 'Upload completed' } });
          fileStore.getFileList();
        }
      });

      uploadPromises.push(uploadPromise);
      concurrentCount++;

      // 当达到最大并发请求数时，等待所有请求完成
      if (concurrentCount >= MAX_CONCURRENT_REQUESTS) {
        // eslint-disable-next-line no-await-in-loop
        await Promise.all(uploadPromises);
        uploadPromises.length = 0;
        concurrentCount = 0;
      }
    }
  });
};

const onSubmit = () => {
  // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
  form.value.validate({ showErrorMessage: true }).then(async (validateResult: FormValidateResult<any>) => {
    if (validateResult === true) {
      await addFile({
        ...formData.value,
      });

      MessagePlugin.success('添加成功');
      fileStore.getFileList();
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
