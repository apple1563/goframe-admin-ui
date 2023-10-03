<template>
  <common-table :do-fetch="fetchTag" @handle-visible="handleVisible" />
  <add-role
    :key="opType"
    :op-type="opType"
    :row-data="currentRow"
    :visible="visible"
    @handle-visible="handleVisible"
    @fetch-data="fetchData"
  />
</template>
<script lang="ts">
export default {
  name: 'ListRole',
};
</script>
<script setup lang="ts">
import { ref } from 'vue';

import type { RoleItem } from '@/api/model/roleModel';
import AddRole from '@/pages/role/components/AddRole.vue';

import CommonTable from './components/CommonTable.vue';

const opType = ref<string>('add');
const visible = ref(false);
const fetchTag = ref(Date.now());
const currentRow = ref<RoleItem | undefined>();
const fetchData = () => {
  fetchTag.value = Date.now();
};
const handleVisible = (opTy: string, data: RoleItem | undefined) => {
  visible.value = !visible.value;
  opType.value = opTy;
  if (opTy === 'update') {
    currentRow.value = data;
  }
};
</script>
