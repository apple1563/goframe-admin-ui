<template>
  <common-table />
  <add-dict />
  <edit-dict />
</template>
<script lang="ts">
export default {
  name: 'ListDict',
};
</script>
<script setup lang="ts">
import AddDict from '@/pages/dict/components/AddDict.vue';
import EditDict from '@/pages/dict/components/EditDict.vue';

import CommonTable from './components/CommonTable.vue';
</script>
