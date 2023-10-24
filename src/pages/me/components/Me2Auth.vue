<template>
  <t-card class="user-info-list" title="二步校验" :bordered="false">
    <template #actions>
      <div v-if="isSetted">
        <t-button v-if="showContent === true" @click="save">提交</t-button>
        <t-button v-if="showContent === true" @click="cancel">取消</t-button>
        <t-switch v-if="showContent === false" v-model="isOpened" size="large" @change="onChange">
          <template #label="slotProps">{{ slotProps.value ? '开' : '关' }}</template>
        </t-switch>
        <t-button theme="default" shape="square" variant="text" @click="editOtp">
          <t-icon name="filter-2" />
        </t-button>
      </div>
      <t-button v-if="!isSetted" theme="primary" @click="save"> 设置 </t-button>
    </template>
    <t-space v-if="showContent" direction="vertical" size="large" style="width: 100%; margin-top: 20px">
      <t-form ref="form" :rules="rules" :data="formData" scroll-to-first-error="smooth" layout="inline">
        <t-form-item label="二维码">
          <qrcode-vue :value="otpInfo.url" :size="100" />
        </t-form-item>
        <t-form-item label="校验码" name="code">
          <t-input v-model.trim="formData.code" type="number"></t-input>
        </t-form-item>
        <t-form-item label="温馨提示：" label-width="72px">
          使用<t-link
            theme="success"
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_US"
            >Google Authenticator App</t-link
          >扫码获取校验码，输入提交校验
        </t-form-item>
      </t-form>
    </t-space>
  </t-card>
</template>
<script lang="ts">
export default {
  name: 'Me2Auth',
};
</script>
<script setup lang="ts">
import QrcodeVue from 'qrcode.vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';

import type { AddOtpParam, GetOtpRes } from '@/api/model/otpModel';
import { addOtp, getOtp, getOtpCheck, updateOtp, updateOtpStatus } from '@/api/otp';

const otpInfo = ref<GetOtpRes>({});
const isOpened = ref(false);
const isSetted = ref(false);
const showContent = ref(false);
const formData = ref<AddOtpParam>({});
const form = ref(null);
const rules = {
  code: [{ required: true }],
};
const onChange = (val) => {
  updateOtpStatus({ status: val ? 1 : 2 }).catch(() => {
    // 没成功就恢复原状
    isOpened.value = !val;
  });
};
getOtpCheck().then((res) => {
  isSetted.value = res.isSetted;
  isOpened.value = res.isOpened;
  //  没有设置过默认展开设置界面
  if (!isSetted.value) {
    getOtp().then((res) => {
      otpInfo.value = res;
      showContent.value = true;
    });
  }
});
const editOtp = () => {
  getOtp().then((res) => {
    otpInfo.value = res;
    showContent.value = true;
  });
};
const save = () => {
  form.value.validate({ showErrorMessage: true }).then(async (validateResult) => {
    if (validateResult === true) {
      if (isSetted.value) {
        await updateOtp({
          code: formData.value.code,
          secret: otpInfo.value.secret,
        });
      } else {
        await addOtp({
          code: formData.value.code,
          secret: otpInfo.value.secret,
        });
      }
      const res = await getOtpCheck();
      isSetted.value = res.isSetted;
      isOpened.value = res.isOpened;
      showContent.value = false;
      MessagePlugin.success('操作成功');
      return;
    }
    if (validateResult && Object.keys(validateResult).length) {
      const firstError = Object.values(validateResult)[0]?.[0]?.message;
      MessagePlugin.warning(firstError);
    }
  });
};
const cancel = () => {
  form.value.reset();
  showContent.value = false;
};
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
