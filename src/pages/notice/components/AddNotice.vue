<template>
  <div>
    <t-dialog
      size="large"
      width="800px"
      :visible="noticeStore.addVisible"
      header="发送通知"
      :on-confirm="onSubmit"
      @close="handleClose"
    >
      <t-space direction="vertical" size="large" style="width: 100%">
        <t-form ref="form" :data="formData" :rules="RULES" @reset="onReset">
          <t-form-item label="标题" name="title">
            <t-input v-model="formData.title" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="标签" name="tag">
            <t-input v-model="formData.tag" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="接收者" name="tag">
            <t-select
              v-model="formData.receivers"
              :min-collapsed-num="6"
              placeholder="请选择接收者"
              multiple
              filterable
            >
              <t-option label="全选" :check-all="true" />
              <t-option
                v-for="item in userStore.userList"
                :key="item.id"
                :value="item.id"
                :label="item.username"
              ></t-option>
            </t-select>
          </t-form-item>
          <t-form-item label="内容" name="content">
            <div style="border: 1px solid #ccc">
              <toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editorRef"
                :default-config="toolbarConfig"
                mode="default"
              />
              <editor
                v-model="formData.content"
                style="height: 240px; overflow-y: hidden"
                :default-config="editorConfig"
                mode="default"
                @on-created="handleCreated"
              />
            </div>
          </t-form-item>
          <t-form-item label="排序" name="sort">
            <t-input-number v-model="formData.sort" placeholder="请输入" />
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
import '@wangeditor/editor/dist/css/style.css'; // 引入 css

import type { IDomEditor } from '@wangeditor/core';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { AllValidateResult, FormValidateResult } from 'tdesign-vue-next/es/form/type';
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';

import { addNotice } from '@/api/notice';
import { useNoticeStore, useUserStore } from '@/store';

import { RULES } from '../constants';
// eslint-disable-next-line
const form = ref(null);
const formData = ref({ content: '', title: '', sort: 0, remark: '', tag: '', receivers: [] });

const noticeStore = useNoticeStore();
const userStore = useUserStore();
userStore.getUserList();
const handleClose = () => {
  noticeStore.setAddVisible(false);
};
const onReset = () => {
  form.value.reset();
};
const onSubmit = () => {
  // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
  form.value.validate({ showErrorMessage: true }).then(async (validateResult: FormValidateResult<any>) => {
    if (validateResult === true) {
      await addNotice({
        ...formData.value,
      });
      MessagePlugin.success('添加成功');
      noticeStore.getNoticeList();
      handleClose();
      return;
    }
    if (validateResult && Object.keys(validateResult).length) {
      const firstError = (Object.values(validateResult)[0] as Array<AllValidateResult>)?.[0]?.message;
      MessagePlugin.warning(firstError);
    }
  });
};

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const content = ref('<p>hello</p>');

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    content.value = '<p>模拟 Ajax 异步设置内容</p>';
  }, 1500);
});

const toolbarConfig = {};
const editorConfig = { placeholder: '请输入内容...' };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>
