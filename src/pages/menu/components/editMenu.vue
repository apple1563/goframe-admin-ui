<template>
  <div>
    <t-space v-if="formData && formData.id" direction="vertical" size="large" style="width: 100%">
      <t-form ref="form" :data="formData" :rules="RULES">
        <t-form-item :label-width="0">
          <t-form-item class="w-p45" label="类型" name="type">
            <t-radio-group v-model="formData.type">
              <t-radio-button :value="1">目录</t-radio-button>
              <t-radio-button :value="2">菜单</t-radio-button>
              <t-radio-button :value="3">按钮</t-radio-button>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="上级" name="pid">
            <t-tree-select v-model="formData.pid" />
          </t-form-item>
        </t-form-item>
        <t-form-item :label-width="0">
          <t-form-item class="w-p45" label="名称" name="title">
            <t-input v-model="formData.title" placeholder="请输入" />
          </t-form-item>
          <t-form-item v-if="formData.type !== 3" label="图标" name="icon">
            <t-input v-model="formData.icon" placeholder="请输入" />
          </t-form-item>
        </t-form-item>
        <t-form-item :label-width="0">
          <t-form-item v-if="formData.type !== 3" class="w-p45" label="路由地址" name="path">
            <t-input v-model="formData.path" placeholder="请输入" />
          </t-form-item>
          <t-form-item label="路由别名" name="name">
            <t-input v-model="formData.name" placeholder="请输入" />
          </t-form-item>
        </t-form-item>
        <t-form-item :label-width="0">
          <t-form-item v-if="formData.type !== 3" class="w-p45" label="组件路径" name="component">
            <t-input v-model="formData.component" placeholder="请输入" />
          </t-form-item>
          <t-form-item v-if="formData.type === 1" label="默认跳转" name="redirect">
            <t-input v-model="formData.redirect" placeholder="请输入" />
          </t-form-item>
        </t-form-item>
        <t-form-item :label-width="0">
          <t-form-item v-if="formData.type !== 3" class="w-p45" label="高亮路由" name="activeMenu">
            <t-input v-model="formData.activeMenu" placeholder="请输入" />
          </t-form-item>
          <t-form-item v-if="formData.type !== 3" label="菜单排序" name="sort">
            <t-input-number v-model="formData.sort" placeholder="请输入" />
          </t-form-item>
        </t-form-item>
        <t-form-item v-if="formData.type !== 3" :label-width="0">
          <t-form-item class="w-p45" label="根路由" name="isRoot">
            <t-radio-group v-model="formData.isRoot">
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
        <t-form-item v-if="formData.type !== 3" :label-width="0">
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
        <t-form-item v-if="formData.type !== 3" :label-width="0">
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
          <t-button>保存</t-button>
        </t-col>
        <t-col>
          <t-button>删除</t-button>
        </t-col>
      </t-space>
    </t-space>
    <t-space v-else direction="vertical" size="large" style="width: 100%">请选择左侧菜单</t-space>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue';

import type { MenuItem } from '@/api/model/menuModel';

// eslint-disable-next-line
import { RULES } from '../constants';
const props = defineProps({
  selectedMenuData: {
    type: Object as PropType<MenuItem>,
  },
});
const form = ref(null);
const formData = ref<MenuItem>();

watch(
  () => props.selectedMenuData,
  () => {
    formData.value = props.selectedMenuData;
  },
);
// const emit = defineEmits(['handle-add-menu-visible']);
</script>
<style lang="less" scoped>
.w-p45 {
  width: 45%;
}
</style>
