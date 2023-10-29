import type { DirectiveBinding } from 'vue';

import { getPermissionStore } from '@/store';

export default {
  // 指令绑定到元素时执行
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const permissionStore = getPermissionStore();
    if (!permissionStore.asyncButtons.includes(binding.value)) {
      el.remove();
    }
  },
};
