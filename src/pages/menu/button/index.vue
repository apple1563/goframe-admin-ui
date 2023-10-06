<template>
  <common-table />
  <add-button />
  <edit-button />
</template>
<script lang="ts">
export default {
  name: 'ListButton',
};
</script>
<script setup lang="ts">
import AddButton from '@/pages/menu/button/components/AddButton.vue';
import EditButton from '@/pages/menu/button/components/EditButton.vue';

import CommonTable from './components/CommonTable.vue';
</script>
