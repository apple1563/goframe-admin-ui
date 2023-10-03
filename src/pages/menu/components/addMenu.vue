<template>
  <div>
    <t-drawer size="large" :visible="visible" header="添加菜单" :on-confirm="onSubmit" @close="handleClose">
      <t-space direction="vertical" size="large" style="width: 100%">
        <t-form ref="form" :data="formData" :rules="RULES" @reset="onReset">
          <t-form-item label="类型" name="type">
            <t-radio-group v-model="formData.type" :default-value="2">
              <t-radio-button :value="1">目录</t-radio-button>
              <t-radio-button :value="2">菜单</t-radio-button>
              <t-radio-button :value="3">按钮</t-radio-button>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="上级" name="pid">
            <t-tree-select v-model="formData.pid" :data="menuTree" clearable :tree-props="treeProps" />
          </t-form-item>
          <t-form-item label="名称" name="title">
            <t-input v-model="formData.title" placeholder="请输入" />
          </t-form-item>
          <t-form-item v-if="formData.type !== 3" label="图标" name="icon">
            <t-input v-model="formData.icon" placeholder="请输入图标类名" />
          </t-form-item>
          <t-form-item v-if="formData.type !== 3" label="路由地址" name="path">
            <t-input v-model="formData.path" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="路由别名" name="name">
            <t-input v-model="formData.name" placeholder="请输入" />
          </t-form-item>
          <t-form-item v-if="formData.type !== 3" label="组件路径" name="component">
            <t-input
              v-model="formData.component"
              placeholder="主目录填 `Layout`;多级父目录填 `ParentLayout`;页面填具体的组件路径，如：`/system/menu/menu`"
            />
          </t-form-item>
          <t-form-item v-if="formData.type === 1" label="默认跳转" name="redirect">
            <t-input v-model="formData.redirect" placeholder="请输入" />
          </t-form-item>
          <t-form-item v-if="formData.type !== 3" label="高亮路由" name="activeMenu">
            <t-input v-model="formData.activeMenu" placeholder="请输入" />
          </t-form-item>
          <t-form-item v-if="formData.type !== 3" label="菜单排序" name="sort">
            <t-input-number v-model="formData.sort" placeholder="请输入" />
          </t-form-item>
          <t-form-item v-if="formData.type !== 3" :label-width="0">
            <t-form-item label="根路由" name="isRoot">
              <t-radio-group v-model="formData.isRoot" default-value="2">
                <t-radio-button :value="1">启用</t-radio-button>
                <t-radio-button :value="2">禁用</t-radio-button>
              </t-radio-group>
            </t-form-item>

            <t-form-item label="页签固定" name="affix">
              <t-radio-group v-model="formData.affix" default-value="2">
                <t-radio-button :value="1">启用</t-radio-button>
                <t-radio-button :value="2">禁用</t-radio-button>
              </t-radio-group>
            </t-form-item>
          </t-form-item>
          <t-form-item v-if="formData.type !== 3" :label-width="0">
            <t-form-item label="简化路由" name="alwaysShow">
              <t-radio-group v-model="formData.alwaysShow" default-value="2">
                <t-radio-button :value="1">启用</t-radio-button>
                <t-radio-button :value="2">禁用</t-radio-button>
              </t-radio-group>
            </t-form-item>

            <t-form-item label="keepAlive" name="keepAlive">
              <t-radio-group v-model="formData.keepAlive" default-value="2">
                <t-radio-button :value="1">启用</t-radio-button>
                <t-radio-button :value="2">禁用</t-radio-button>
              </t-radio-group>
            </t-form-item>
          </t-form-item>
          <t-form-item v-if="formData.type !== 3" :label-width="0">
            <t-form-item label="是否外链" name="isFrame">
              <t-radio-group v-model="formData.isFrame" default-value="2">
                <t-radio-button :value="1">启用</t-radio-button>
                <t-radio-button :value="2">禁用</t-radio-button>
              </t-radio-group>
            </t-form-item>
            <t-form-item v-if="formData.isFrame === 1" label="外链地址" name="frameSrc">
              <t-input v-model="formData.frameSrc" placeholder="请输入" />
            </t-form-item>
          </t-form-item>
          <t-form-item :label-width="0">
            <t-form-item label="是否隐藏" name="hidden">
              <t-radio-group v-model="formData.hidden" default-value="2">
                <t-radio-button :value="1">启用</t-radio-button>
                <t-radio-button :value="2">禁用</t-radio-button>
              </t-radio-group>
            </t-form-item>
            <t-form-item label="状态" name="status">
              <t-radio-group v-model="formData.status" default-value="2">
                <t-radio-button :value="1">启用</t-radio-button>
                <t-radio-button :value="2">禁用</t-radio-button>
              </t-radio-group>
            </t-form-item>
          </t-form-item>
        </t-form>
      </t-space>
    </t-drawer>
  </div>
</template>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';

import { addMenu, getMenuTree } from '@/api/menu';
import type { MenuItem } from '@/api/model/menuModel';

import { INITIAL_DATA, RULES } from '../constants';
// eslint-disable-next-line
const props = defineProps({
  visible: {
    type: Boolean,
  },
});
const treeProps = {
  keys: {
    label: 'title',
    value: 'id',
    children: 'children',
  },
};
// 0表示无上级
const initailTree = [{ id: 0, title: '' }];
const menuTree = ref<Array<MenuItem>>(initailTree);
getMenuTree().then((res) => {
  menuTree.value = res.list.concat(initailTree);
});
const form = ref(null);
const formData = ref(INITIAL_DATA);
const emit = defineEmits(['handle-add-menu-visible']);

const handleClose = () => {
  emit('handle-add-menu-visible');
};
const onReset = () => {
  form.value.reset();
};
const onSubmit = () => {
  // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
  form.value.validate({ showErrorMessage: true }).then(async (validateResult) => {
    if (validateResult === true) {
      await addMenu(formData.value);
      MessagePlugin.success('添加成功');
      return;
    }
    if (validateResult && Object.keys(validateResult).length) {
      const firstError = Object.values(validateResult)[0]?.[0]?.message;
      MessagePlugin.warning(firstError);
    }
  });

  /* if (ctx.validateResult === true) {
    MessagePlugin.success('添加成功');
  } */
};
</script>
