<template>
  <div class="table-tree-container">
    <div class="list-tree-wrapper">
      <div class="list-tree-operator">
        <div class="t-row">
          <div class="t-col-4">
            <t-button @click="handleVisible"> 添加菜单</t-button>
          </div>
          <t-input v-model="filterText" class="t-col-8" placeholder="请输入关键词" @change="onInput">
            <template #suffix-icon>
              <search-icon size="var(--td-comp-size-xxxs)" />
            </template>
          </t-input>
        </div>
        <t-tree
          :keys="treeProps.keys"
          :data="treeData"
          hover
          activable
          expand-on-click-node
          :default-expanded="expanded"
          :filter="filterByText"
          @click="clickTree"
        />
      </div>
      <div class="list-tree-content">
        <t-space size="small">
          <edit2-icon />
          <span>编辑</span>
        </t-space>
        <t-divider />
        <edit-menu :selected-menu-data="selectedMenuData" />
      </div>
    </div>
    <add-menu />
  </div>
</template>

<script lang="ts">
export default {
  name: 'MenuTree',
};
</script>

<script setup lang="ts">
import { Edit2Icon, SearchIcon } from 'tdesign-icons-vue-next';
import type { TreeNodeModel } from 'tdesign-vue-next';
import { ref } from 'vue';

import { useMenuStore } from '@/store';

import AddMenu from './components/addMenu.vue';
import EditMenu from './components/editMenu.vue';

const selectedMenuData = ref({});

const menuStore = useMenuStore();
const treeData = ref([]);
menuStore.getMenuTreeList().then(() => {
  treeData.value = menuStore.menuTreeList;
});
const treeProps = {
  keys: {
    label: 'title',
    value: 'id',
    children: 'children',
  },
};
const filterByText = ref();
const filterText = ref();

const expanded = [];

const clickTree = (context: { node: TreeNodeModel<T>; e: MouseEvent }) => {
  selectedMenuData.value = context.node.data;
};

const onInput = () => {
  filterByText.value = (node: TreeNodeModel) => {
    return node.label.indexOf(filterText.value) >= 0;
  };
};
const handleVisible = () => {
  menuStore.setAddVisible(true);
};
</script>

<style lang="less" scoped>
.table-tree-container {
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);

  .t-tree {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.list-tree-wrapper {
  overflow-y: hidden;
}

.list-tree-operator {
  width: 40%;
  float: left;
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
}

.list-tree-content {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  border-left: 1px solid var(--td-border-level-1-color);
  overflow: auto;
}
</style>
