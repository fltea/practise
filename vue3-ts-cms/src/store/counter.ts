import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 1,
  }),
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    },
  },
  actions: {
    changeCounter(counter: number) {
      this.counter = counter
    },
  },
})

export default useCounterStore
