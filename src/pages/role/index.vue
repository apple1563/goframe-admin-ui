<template>
  <common-table />
  <add-role />
  <edit-role />
  <auth-menu />
  <auth-button />
  <auth-api />
</template>
<script lang="ts">
export default {
  name: 'ListRole',
};
</script>
<script setup lang="ts">
import AddRole from '@/pages/role/components/AddRole.vue';
import AuthApi from '@/pages/role/components/AuthApi.vue';
import AuthButton from '@/pages/role/components/AuthButton.vue';
import AuthMenu from '@/pages/role/components/AuthMenu.vue';
import EditRole from '@/pages/role/components/EditRole.vue';

import CommonTable from './components/CommonTable.vue';
</script>
