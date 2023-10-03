<template>
  <common-table :do-fetch="fetchTag" @handle-visible="handleVisible" />
  <add-role :visible="visible" @handle-visible="handleVisible" @fetch-data="fetchData" />
</template>
<script lang="ts">
export default {
  name: 'ListRole',
};
</script>
<script setup lang="ts">
import { ref } from 'vue';

import AddRole from '@/pages/role/components/AddRole.vue';

import CommonTable from './components/CommonTable.vue';

const visible = ref(false);
const fetchTag = ref(Date.now());
const fetchData = () => {
  fetchTag.value = Date.now();
};
const handleVisible = () => {
  visible.value = !visible.value;
};
</script>
