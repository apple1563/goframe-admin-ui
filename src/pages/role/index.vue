<template>
  <common-table :do-fetch="fetchTag" @handle-visible="handleVisible" />
  <add-role :row-data="currentRow" :visible="visible" @handle-visible="handleVisible" @fetch-data="fetchData" />
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

const visible = ref(false);
const fetchTag = ref(Date.now());
const currentRow = ref<RoleItem | undefined>();
const fetchData = () => {
  fetchTag.value = Date.now();
};
const handleVisible = (data: RoleItem | undefined) => {
  visible.value = !visible.value;
  if (visible.value) {
    currentRow.value = data;
  }
};
</script>
