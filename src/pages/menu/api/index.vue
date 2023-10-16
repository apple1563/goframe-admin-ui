<template>
  <common-table />
  <add-api />
  <edit-api />
</template>
<script lang="ts">
export default {
  name: 'ListApi',
};
</script>
<script setup lang="ts">
import AddApi from '@/pages/menu/api/components/AddApi.vue';
import EditApi from '@/pages/menu/api/components/EditApi.vue';

import CommonTable from './components/CommonTable.vue';
</script>
