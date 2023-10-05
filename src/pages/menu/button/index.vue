<template>
  <common-table />
  <add-button />
</template>
<script lang="ts">
export default {
  name: 'ListButton',
};
</script>
<script setup lang="ts">
import AddButton from '@/pages/menu/button/components/AddButton.vue';

import CommonTable from './components/CommonTable.vue';
</script>
