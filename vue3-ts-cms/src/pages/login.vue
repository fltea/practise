<script setup lang="ts">
import { ref } from 'vue'

import loginPanel from './login/c-cpns/login-panel.vue'
</script>

<template>
  <section class="login">
    <login-panel></login-panel>
  </section>
</template>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url(@/assets/img/login-bg.svg);
}
</style>
