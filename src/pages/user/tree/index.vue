<template>
  <div class="table-tree-container">
    <div class="list-tree-wrapper">
      <div class="list-tree-operator">
        <t-input v-model="filterText" placeholder="请输入关键词" @change="onInput">
          <template #suffix-icon>
            <search-icon size="var(--td-comp-size-xxxs)" />
          </template>
        </t-input>
        <t-tree
          :keys="treeProps.keys"
          :data="userStore.userTreeList"
          hover
          expand-on-click-node
          :default-expanded="expanded"
          :filter="filterByText"
        />
      </div>
      <div class="list-tree-content">
        <common-table />
      </div>
    </div>
    <add-user />
    <edit-user />
  </div>
</template>

<script lang="ts">
export default {
  name: 'ListTree',
};
</script>

<script setup lang="ts">
import { SearchIcon } from 'tdesign-icons-vue-next';
import type { TreeNodeModel } from 'tdesign-vue-next';
import { ref } from 'vue';

import AddUser from '@/pages/user/tree/components/AddUser.vue';
import CommonTable from '@/pages/user/tree/components/CommonTable.vue';
import EditUser from '@/pages/user/tree/components/EditUser.vue';
import { useUserStore } from '@/store';

const userStore = useUserStore();
userStore.getUserTreeList();
const filterByText = ref();
const filterText = ref();
const treeProps = {
  keys: {
    label: 'username',
    value: 'id',
    children: 'children',
  },
};
const expanded = [];

const onInput = () => {
  filterByText.value = (node: TreeNodeModel) => {
    return node.label.indexOf(filterText.value) >= 0;
  };
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
