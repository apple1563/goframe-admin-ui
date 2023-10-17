import { getPermissionStore } from '@/store';

export default {
  // 指令绑定到元素时执行
  mounted(el, binding) {
    const permissionStore = getPermissionStore();
    if (!permissionStore.asyncButtons.includes(binding.value)) {
      el.remove();
    }
  },
};
