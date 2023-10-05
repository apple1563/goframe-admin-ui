<template>
  <div>
    <t-drawer size="large" :visible="visible" header="菜单权限设置" :on-confirm="onSubmit" @close="handleClose">
      <t-space direction="vertical" size="large" style="width: 100%">
        <t-cascader
          v-model="selectedMenus"
          value-mode="all"
          :keys="treeProps.keys"
          :options="options"
          multiple
          clearable
          :min-collapsed-num="6"
          placeholder="请选择"
        >
        </t-cascader>
      </t-space>
    </t-drawer>
  </div>
</template>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { ref, watch } from 'vue';

import { getRoleMenu, setRoleMenu } from '@/api/menu';
import type { RoleItem } from '@/api/model/roleModel';
import { useMenuStore } from '@/store';
// eslint-disable-next-line
const props = defineProps<{
  visible: boolean;
  currentRow: RoleItem;
}>();

const treeProps = {
  keys: {
    label: 'title',
    value: 'id',
    children: 'children',
  },
};
const options = ref([]);
const selectedMenus = ref();
const menuStore = useMenuStore();

menuStore.getMenuTreeList().then(() => {
  options.value = menuStore.menuTreeList;
});
watch(
  () => props.visible,
  (val) => {
    if (val) {
      getRoleMenu(props.currentRow.id).then((res) => {
        selectedMenus.value = res.list;
      });
    }
  },
);

const emit = defineEmits(['handle-visible']);

const handleClose = () => {
  emit('handle-visible');
  selectedMenus.value = [];
};

const onSubmit = async () => {
  // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
  await setRoleMenu(props.currentRow.id, selectedMenus.value);
  MessagePlugin.success('设置成功').then();
  handleClose();
};
</script>
