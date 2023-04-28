<script setup lang="ts">
import { ref } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'

const isKeep = ref(false)
const activeName = ref('account')
const paneAccount = ref<InstanceType<typeof PaneAccount>>()

function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    paneAccount.value?.accountActions()
  } else {
    console.log('phone')
  }
}
</script>

<template>
  <section class="login-panel">
    <h1 class="title">後台管理係統</h1>
    <div class="tabs">
      <el-tabs type="border-card" v-model="activeName" stretch>
        <el-tab-pane name="account">
          <template #label>
            <div class="tabs-label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">賬號登錄</span>
            </div>
          </template>
          <pane-account ref="paneAccount"></pane-account>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <div class="tabs-label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手機登錄</span>
            </div>
          </template>
          <pane-phone></pane-phone>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isKeep" label="記住密碼" size="large" />
      <el-link type="primary">忘記密碼</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleLoginBtnClick">立即登錄</el-button>
  </section>
</template>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  .title {
    margin-bottom: 15px;
    text-align: center;
  }
  .tabs-label {
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      margin-left: 5px;
    }
  }
  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
