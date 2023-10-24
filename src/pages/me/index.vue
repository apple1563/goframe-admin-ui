<template>
  <t-space direction="vertical" size="large">
    <!--    <t-tabs
      placement="left"
      :default-value="1"
      theme="card"
      size="large"
      style="width: 100%; background: var(&#45;&#45;td-bg-color-page)"
    >
      <t-tab-panel :value="1" label="个人信息">-->
    <div class="user-left-greeting" style="width: 100%">
      <div>
        Hi，{{ selfStore.selfInfo.nickname || selfStore.selfInfo.username }}
        <span class="regular"> {{ ampm }}好，今天又是心情愉悦的一天～😊😊😊</span>
      </div>
      <img src="../../assets/assets-tencent-logo.png" class="logo" alt="goframe-admin-ui" />
    </div>
    <me-info />
    <me-password />
    <me2-auth />
    <!--      </t-tab-panel>
      <t-tab-panel :value="2" label="选项卡2">
        <p style="margin: 20px">选项卡2内容区</p>
      </t-tab-panel>
      <t-tab-panel :value="3" label="选项卡3">
        <p style="margin: 20px">选项卡3内容区</p>
      </t-tab-panel>
    </t-tabs>-->
  </t-space>
</template>
<script lang="ts">
export default {
  name: 'MeIndex',
};
</script>
<script setup lang="ts">
import { computed } from 'vue';

import Me2Auth from '@/pages/me/components/Me2Auth.vue';
import MeInfo from '@/pages/me/components/MeInfo.vue';
import MePassword from '@/pages/me/components/MePassword.vue';
import { useSelfStore } from '@/store';

const ampm = computed(() => {
  const h = new Date().getHours();
  if (h > 8 && h < 12) {
    return '上午';
  }
  if (h >= 6 && h < 8) {
    return '早上';
  }
  if (h > 0 && h < 6) {
    return '午夜';
  }
  if (h >= 12 && h < 18) {
    return '下午';
  }
  if (h >= 18 && h < 19) {
    return '傍晚';
  }
  if (h >= 19 && h <= 23) {
    return '晚上';
  }
  return '您';
});
const selfStore = useSelfStore();
</script>

<style lang="less" scoped>
@import 'index.less';
</style>
