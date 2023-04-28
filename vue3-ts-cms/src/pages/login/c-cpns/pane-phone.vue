<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <section class="pane-phone">
    <el-form label-width="60px" size="large">
      <el-form-item label="號碼">
        <el-input />
      </el-form-item>
      <el-form-item label="密碼">
        <el-input type="password" />
      </el-form-item>
    </el-form>
  </section>
</template>

<style lang="less" scoped>
.pane-phone {
  color: red;
}
</style>
