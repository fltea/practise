<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <section class="login">
    <h2>login</h2>

    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </section>
</template>

<style lang="less" scoped>
.login {
  color: red;
}
</style>
