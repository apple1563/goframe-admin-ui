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
import AddNotice from '@/pages/notice/sender/components/AddNotice.vue';
import CommonTable from '@/pages/notice/sender/components/CommonTable.vue';
import EditNotice from '@/pages/notice/sender/components/EditNotice.vue';
</script>
