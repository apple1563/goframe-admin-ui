<template>
  <div class="table-tree-container">
    <div class="list-tree-wrapper">
      <div class="list-tree-operator">
        <t-button @click="visible = true"> 添加菜单</t-button>
        <t-tree :data="TREE_DATA" hover expand-on-click-node :default-expanded="expanded" :filter="filterByText" />
      </div>
      <div class="list-tree-content">
        <t-space size="small">
          <edit2-icon />
          <span>编辑</span>
        </t-space>
        <t-divider />
        <edit-menu />
      </div>
    </div>
    <add-menu :visible="visible" @handle-visible="handleVisible" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'MenuTree',
};
</script>

<script setup lang="ts">
// import type { TreeNodeModel } from 'tdesign-vue-next';
import { Edit2Icon } from 'tdesign-icons-vue-next';
import { ref } from 'vue';

import AddMenu from './components/addMenu.vue';
import EditMenu from './components/editMenu.vue';
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
const handleVisible = () => {
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
