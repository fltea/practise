<script setup lang="ts">
import { ref } from 'vue'
import useCounterStore from '@/store/counter'

const counterStore = useCounterStore()

const changeCounter = () => {
  counterStore.changeCounter(233)
}
</script>

<template>
  <section class="home">
    <h2>home</h2>
    <p>{{ counterStore.counter }} - {{ counterStore.doubleCounter }}</p>
    <button @click="changeCounter">修改</button>
  </section>
</template>

<style lang="less" scoped>
.home {
  color: red;
}
</style>
