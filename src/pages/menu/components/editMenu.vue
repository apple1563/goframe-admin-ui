<template>
  <div>
    <t-space direction="vertical" size="large" style="width: 100%">
      <t-form>
        <t-form-item :label-width="0">
          <t-form-item class="w-p40" label="类型">
            <t-radio-group v-model="type" :default-value="2">
              <t-radio-button :value="1">目录</t-radio-button>
              <t-radio-button :value="2">菜单</t-radio-button>
              <t-radio-button :value="3">按钮</t-radio-button>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="上级" name="pid" initial-data="123456">
            <t-tree-select />
          </t-form-item>
        </t-form-item>
        <t-form-item :label-width="0">
          <t-form-item class="w-p40" label="名称" name="name" initial-data="123456">
            <t-input placeholder="请输入" />
          </t-form-item>
          <t-form-item v-if="type !== 3" label="图标" name="icon" initial-data="123456">
            <t-input placeholder="请输入" />
          </t-form-item>
        </t-form-item>
        <t-form-item :label-width="0">
          <t-form-item v-if="type !== 3" class="w-p40" label="路由地址" name="icon" initial-data="123456">
            <t-input placeholder="请输入" />
          </t-form-item>
          <t-form-item label="路由别名" name="icon" initial-data="123456">
            <t-input placeholder="请输入" />
          </t-form-item>
        </t-form-item>
        <t-form-item :label-width="0">
          <t-form-item v-if="type !== 3" class="w-p40" label="组件路径" name="icon" initial-data="123456">
            <t-input placeholder="请输入" />
          </t-form-item>
          <t-form-item v-if="type === 1" label="默认跳转" name="icon" initial-data="123456">
            <t-input placeholder="请输入" />
          </t-form-item>
        </t-form-item>
        <t-form-item :label-width="0">
          <t-form-item v-if="type !== 3" class="w-p40" label="高亮路由" name="icon" initial-data="123456">
            <t-input placeholder="请输入" />
          </t-form-item>
          <t-form-item v-if="type !== 3" label="菜单排序" name="icon" initial-data="123456">
            <t-input-number placeholder="请输入" />
          </t-form-item>
        </t-form-item>
        <t-form-item v-if="type !== 3" :label-width="0">
          <t-form-item class="w-p40" label="根路由" name="type" :initial-data="1">
            <t-radio-group default-value="2">
              <t-radio-button value="1">启用</t-radio-button>
              <t-radio-button value="2">禁用</t-radio-button>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="页签固定" name="type" :initial-data="1">
            <t-radio-group default-value="2">
              <t-radio-button value="1">启用</t-radio-button>
              <t-radio-button value="2">禁用</t-radio-button>
            </t-radio-group>
          </t-form-item>
        </t-form-item>
        <t-form-item v-if="type !== 3" :label-width="0">
          <t-form-item class="w-p40" label="简化路由" name="type" :initial-data="1">
            <t-radio-group default-value="2">
              <t-radio-button value="1">启用</t-radio-button>
              <t-radio-button value="2">禁用</t-radio-button>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="缓存路由" name="type" :initial-data="1">
            <t-radio-group default-value="2">
              <t-radio-button value="1">启用</t-radio-button>
              <t-radio-button value="2">禁用</t-radio-button>
            </t-radio-group>
          </t-form-item>
        </t-form-item>
        <t-form-item v-if="type !== 3" :label-width="0">
          <t-form-item class="w-p40" label="是否隐藏" name="type" :initial-data="1">
            <t-radio-group default-value="2">
              <t-radio-button value="1">启用</t-radio-button>
              <t-radio-button value="2">禁用</t-radio-button>
            </t-radio-group>
          </t-form-item>
          <t-form-item label="是否外链" name="type" :initial-data="1">
            <t-radio-group default-value="2">
              <t-radio-button value="1">启用</t-radio-button>
              <t-radio-button value="2">禁用</t-radio-button>
            </t-radio-group>
          </t-form-item>
        </t-form-item>
        <t-form-item :label-width="0">
          <t-form-item class="w-p40" label="状态" name="type" :initial-data="1">
            <t-radio-group default-value="2">
              <t-radio-button value="1">启用</t-radio-button>
              <t-radio-button value="2">禁用</t-radio-button>
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
  </div>
</template>

<script setup>
import { ref } from 'vue';
// eslint-disable-next-line
const props = defineProps({});

const type = ref(1);

// const emit = defineEmits(['handle-add-menu-visible']);
</script>
<style lang="less" scoped>
.w-p40 {
  width: 40%;
}
</style>
