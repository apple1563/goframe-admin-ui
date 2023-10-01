<template>
  <div class="table-tree-container">
    <div class="list-tree-wrapper">
      <div class="list-tree-operator">
        <t-button @click="visible = true"> 添加菜单</t-button>
        <t-tree :data="TREE_DATA" hover expand-on-click-node :default-expanded="expanded" :filter="filterByText" />
      </div>
      <div class="list-tree-content"></div>
    </div>
    <add-menu :visible="visible" @handle-add-menu-visible="handleAddMenuVisible" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'MenuTree',
};
</script>

<script setup lang="ts">
// import type { TreeNodeModel } from 'tdesign-vue-next';
import { ref } from 'vue';

import AddMenu from './components/addMenu.vue';
import { TREE_DATA } from './constants';

const filterByText = ref();
// const filterText = ref();
const visible = ref(false);

const expanded = ['0', '0-0', '0-1', '0-2', '0-3', '0-4'];

/* const onInput = () => {
  filterByText.value = (node: TreeNodeModel) => {
    return node.label.indexOf(filterText.value) >= 0;
  };
}; */
const handleAddMenuVisible = () => {
  visible.value = !visible.value;
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
  width: 280px;
  float: left;
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
}

.list-tree-content {
  border-left: 1px solid var(--td-border-level-1-color);
  overflow: auto;
}
</style>
