<template>
  <div>
    <t-space v-if="formData && formData.id" direction="vertical" size="large" style="width: 100%">
      <t-form ref="form" :data="formData" :rules="RULES">
        <t-form-item :label-width="0">
          <t-form-item class="w-p45" label="类型" name="type">
            <t-radio-group v-model="formData.type">
              <t-radio-button :value="1">目录</t-radio-button>
              <t-radio-button :value="2">菜单</t-radio-button>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="上级" name="pid">
            <t-tree-select
              v-model="formData.pid"
              :disabled="formData.isRoot === 1"
              :tree-props="treeProps"
              :data="menuStore.menuTreeListOnlyFolder"
            />
          </t-form-item>
        </t-form-item>
        <t-form-item :label-width="0">
          <t-form-item class="w-p45" label="名称" name="title">
            <t-input v-model="formData.title" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="图标" name="icon">
            <t-input v-model="formData.icon" placeholder="请输入" />
          </t-form-item>
        </t-form-item>
        <t-form-item :label-width="0">
          <t-form-item class="w-p45" label="路由地址" name="path">
            <t-input v-model="formData.path" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="路由别名" name="name">
            <t-input v-model="formData.name" placeholder="请输入" />
          </t-form-item>
        </t-form-item>
        <t-form-item :label-width="0">
          <t-form-item class="w-p45" label="组件路径" name="component">
            <t-input v-model="formData.component" placeholder="请输入" />
          </t-form-item>
          <t-form-item v-if="formData.type === 1" label="默认跳转" name="redirect">
            <t-input v-model="formData.redirect" placeholder="请输入" />
          </t-form-item>
        </t-form-item>
        <t-form-item :label-width="0">
          <!--          <t-form-item class="w-p45" label="高亮路由" name="activeMenu">
            <t-input v-model="formData.activeMenu" placeholder="请输入" />
          </t-form-item>-->
          <t-form-item label="菜单排序" name="sort">
            <t-input-number v-model="formData.sort" placeholder="请输入" />
          </t-form-item>
        </t-form-item>
        <t-form-item :label-width="0">
          <t-form-item class="w-p45" label="根路由" name="isRoot">
            <t-radio-group v-model="formData.isRoot" @change="setIsRoot">
              <t-radio-button :value="1">启用</t-radio-button>
              <t-radio-button :value="2">禁用</t-radio-button>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="页签固定" name="affix">
            <t-radio-group v-model="formData.affix">
              <t-radio-button :value="1">启用</t-radio-button>
              <t-radio-button :value="2">禁用</t-radio-button>
            </t-radio-group>
          </t-form-item>
        </t-form-item>
        <t-form-item :label-width="0">
          <t-form-item class="w-p45" label="简化路由" name="alwaysShow">
            <t-radio-group v-model="formData.alwaysShow">
              <t-radio-button :value="1">启用</t-radio-button>
              <t-radio-button :value="2">禁用</t-radio-button>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="缓存路由" name="keepAlive">
            <t-radio-group v-model="formData.keepAlive">
              <t-radio-button :value="1">启用</t-radio-button>
              <t-radio-button :value="2">禁用</t-radio-button>
            </t-radio-group>
          </t-form-item>
        </t-form-item>
        <t-form-item :label-width="0">
          <t-form-item label="是否外链" name="isFrame">
            <t-radio-group v-model="formData.isFrame">
              <t-radio-button :value="1">启用</t-radio-button>
              <t-radio-button :value="2">禁用</t-radio-button>
            </t-radio-group>
          </t-form-item>
          <t-form-item v-if="formData.isFrame === 1" label="外链地址" name="frameSrc">
            <t-input v-model="formData.frameSrc" placeholder="请输入" />
          </t-form-item>
        </t-form-item>
        <t-form-item :label-width="0">
          <t-form-item class="w-p45" label="是否隐藏" name="hidden">
            <t-radio-group v-model="formData.hidden">
              <t-radio-button :value="1">启用</t-radio-button>
              <t-radio-button :value="2">禁用</t-radio-button>
            </t-radio-group>
          </t-form-item>
          <t-form-item class="w-p45" label="状态" name="status">
            <t-radio-group v-model="formData.status">
              <t-radio-button :value="1">启用</t-radio-button>
              <t-radio-button :value="2">禁用</t-radio-button>
            </t-radio-group>
          </t-form-item>
        </t-form-item>
      </t-form>
      <t-divider />
      <t-space>
        <t-col>
          <t-button type="button" @click="onSubmit">保存</t-button>
        </t-col>
        <t-col>
          <t-button type="button" @click="onDelete">删除</t-button>
        </t-col>
      </t-space>
    </t-space>
    <t-space v-else direction="vertical" size="large" style="width: 100%">请选择左侧菜单</t-space>
    <t-dialog
      v-model:visible="confirmVisible"
      header="确认删除当前菜单？"
      :body="confirmBody"
      :on-cancel="onCancel"
      @confirm="onConfirmDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { AllValidateResult, FormValidateResult } from 'tdesign-vue-next/es/form/type';
import { computed, PropType, ref, watch } from 'vue';

import { delMenu, editMenu } from '@/api/menu';
import type { MenuItem } from '@/api/model/menuModel';
import { getPermissionStore, useMenuStore } from '@/store';

// eslint-disable-next-line
import { RULES } from '../constants';
const props = defineProps({
  selectedMenuData: Object as PropType<MenuItem>,
});
const treeProps = {
  keys: {
    label: 'title',
    value: 'id',
    children: 'children',
  },
};
const form = ref(null);
const formData = ref(props.selectedMenuData);
const menuStore = useMenuStore();

watch(
  () => props.selectedMenuData,
  () => {
    formData.value = props.selectedMenuData;
  },
);
const setIsRoot = () => {
  if (formData.value.isRoot === 1) {
    formData.value.pid = 0;
  }
};
const onSubmit = () => {
  // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
  form.value.validate({ showErrorMessage: true }).then((validateResult: FormValidateResult<any>) => {
    if (validateResult === true) {
      editMenu(formData.value).then(() => {
        MessagePlugin.success('修改成功');
        menuStore.getMenuTreeList();
      });
      return;
    }
    if (validateResult && Object.keys(validateResult).length) {
      const firstError = (Object.values(validateResult)[0] as Array<AllValidateResult>)?.[0]?.message;
      MessagePlugin.warning(firstError);
    }
  });
};
const confirmVisible = ref(false);

const deleteIdx = ref(-1);
const confirmBody = computed(() => {
  if (deleteIdx.value > -1) {
    return `删除后，菜单关联权限将被清空，且无法恢复`;
  }
  return '';
});
const resetIdx = () => {
  deleteIdx.value = -1;
};
const onCancel = () => {
  resetIdx();
};
const permissionStore = getPermissionStore();
const onConfirmDelete = async () => {
  await delMenu(deleteIdx.value);
  // 真实业务请发起请求
  confirmVisible.value = false;
  MessagePlugin.success('删除成功');
  resetIdx();
  menuStore.getMenuTreeList();
  permissionStore.buildAsyncRoutes();
  formData.value.id = 0;
};
const onDelete = () => {
  deleteIdx.value = formData.value.id;
  confirmVisible.value = true;
};
</script>
<style lang="less" scoped>
.w-p45 {
  width: 45%;
}
</style>
