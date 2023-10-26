<template>
  <common-table />
  <add-notice />
  <edit-notice />
</template>
<script lang="ts">
export default {
  name: 'ListDict',
};
</script>
<script setup lang="ts">
import AddNotice from '@/pages/notice/components/AddNotice.vue';
import EditNotice from '@/pages/notice/components/EditNotice.vue';

import CommonTable from './components/CommonTable.vue';
</script>
