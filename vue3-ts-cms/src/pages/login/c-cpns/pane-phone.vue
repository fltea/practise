<script setup lang="ts">
import type { FormRules } from 'element-plus'
import { reactive } from 'vue'

const form = reactive({
  name: '',
  password: '',
})

const formRules: FormRules = {
  name: [
    {
      required: true,
      message: '必須輸入賬號信息',
      trigger: 'blur',
    },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必須是 6-20 位数字或字母组成',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '必須填入密碼',
      trigger: 'blur',
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必須是 3 位以上的字母或數字',
      trigger: 'blur',
    },
  ],
}

function phoneActions() {
  console.log(form)
}

defineExpose({
  phoneActions,
})
</script>

<template>
  <section class="pane-phone">
    <el-form :model="form" :rules="formRules" label-width="60px" size="large">
      <el-form-item label="號碼" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="密碼" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
    </el-form>
  </section>
</template>

<style lang="less" scoped>
.pane-phone {
  color: red;
}
</style>
