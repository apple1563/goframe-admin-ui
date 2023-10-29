<template>
  <t-form
    v-if="!selfStore.isOpened"
    ref="form"
    :class="['item-container', `login-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <template v-if="type == 'password'">
      <t-form-item name="account">
        <t-input v-model="formData.account" size="large" placeholder="请输入账号：">
          <template #prefix-icon>
            <t-icon name="user" />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input
          v-model="formData.password"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearable
          placeholder="请输入登录密码："
        >
          <template #prefix-icon>
            <t-icon name="lock-on" />
          </template>
          <template #suffix-icon>
            <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
          </template>
        </t-input>
      </t-form-item>

      <div class="check-container remember-pwd">
        <t-checkbox>记住账号</t-checkbox>
        <span class="tip">忘记账号？</span>
      </div>
    </template>

    <!-- 扫码登录 -->
    <template v-else-if="type == 'qrcode'">
      <div class="tip-container">
        <span class="tip">请使用微信扫一扫登录</span>
        <span class="refresh">刷新 <t-icon name="refresh" /> </span>
      </div>
      <qrcode-vue value="" :size="160" level="H" />
    </template>

    <!-- 手机号登录 -->
    <!--    <template v-else>
      <t-form-item name="phone">
        <t-input v-model="formData.phone" size="large" placeholder="请输入手机号码">
          <template #prefix-icon>
            <t-icon name="mobile" />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item class="verification-code" name="verifyCode">
        <t-input v-model="formData.verifyCode" size="large" placeholder="请输入验证码" />
        <t-button size="large" variant="outline" :disabled="countDown > 0" @click="sendCode">
          {{ countDown == 0 ? '发送验证码' : `${countDown}秒后可重发` }}
        </t-button>
      </t-form-item>
    </template>-->

    <t-form-item v-if="type !== 'qrcode'" class="btn-container">
      <t-button block size="large" type="submit"> 登录 </t-button>
    </t-form-item>

    <div class="switch-container">
      <span v-if="type !== 'password'" class="tip" @click="switchType('password')">使用账号密码登录</span>
      <!--      <span v-if="type !== 'qrcode'" class="tip" @click="switchType('qrcode')">使用微信扫码登录</span>
      <span v-if="type !== 'phone'" class="tip" @click="switchType('phone')">使用手机号登录</span>-->
    </div>
  </t-form>
  <t-form v-if="selfStore.isOpened" :class="['item-container', `login-${type}`]" label-width="0">
    <t-form-item tips="打开Google Authenticator获取验证码输入">
      <t-input v-model="otpCode" size="large" placeholder="请输入谷歌验证码：">
        <template #prefix-icon>
          <t-icon name="lock-on" />
        </template>
      </t-input>
    </t-form-item>
    <t-form-item class="btn-container">
      <t-button block size="large" type="button" @click="auth2Step"> 登录 </t-button>
    </t-form-item>
  </t-form>
</template>

<script setup lang="ts">
import QrcodeVue from 'qrcode.vue';
import type { FormInstanceFunctions, FormRule, SubmitContext } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// import { useCounter } from '@/hooks';
import { useSelfStore } from '@/store';

const selfStore = useSelfStore();

const INITIAL_DATA = {
  // phone: '',
  account: 'root',
  password: '1',
  // verifyCode: '',
  // checked: false,
};

const FORM_RULES: Record<string, FormRule[]> = {
  // phone: [{ required: true, message: '手机号必填', type: 'error' }],
  account: [{ required: true, message: '账号必填', type: 'error' }],
  password: [{ required: true, message: '密码必填', type: 'error' }],
  // verifyCode: [{ required: true, message: '验证码必填', type: 'error' }],
};

const otpCode = ref('');
const type = ref('password');

const form = ref<FormInstanceFunctions>();
const formData = ref({ ...INITIAL_DATA });
const showPsw = ref(false);

// const [countDown, handleCounter] = useCounter();

const switchType = (val: string) => {
  type.value = val;
};

const router = useRouter();
const route = useRoute();

/**
 * 发送验证码
 */
/* const sendCode = () => {
  form.value.validate({ fields: ['phone'] }).then((e) => {
    if (e === true) {
      handleCounter();
    }
  });
}; */

const onSubmit = async (ctx: SubmitContext) => {
  if (ctx.validateResult === true) {
    await selfStore.login(formData.value);
    if (!selfStore.isOpened) {
      jump();
    }
  }
};
function jump() {
  MessagePlugin.success('登录成功');
  const redirect = route.query.redirect as string;
  const redirectUrl = redirect ? decodeURIComponent(redirect) : '/dashboard';
  router.push(redirectUrl);
}
const auth2Step = async () => {
  await selfStore.login2step({
    username: formData.value.account,
    code: otpCode.value,
  });
  jump();
};
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
