<template>
  <common-table />
  <add-file />
  <edit-file />
</template>
<script lang="ts">
export default {
  name: 'ListFile',
};
</script>
<script setup lang="ts">
import AddFile from '@/pages/file/components/AddFile.vue';
import EditFile from '@/pages/file/components/EditFile.vue';

import CommonTable from './components/CommonTable.vue';
</script>
