export class Store{
  constructor(options) {

  }
}

export const install = function(_Vue) {
  const Vue = _Vue;

  Vue.mixin({
    beforeCreate(){
      let options = this.$options;
      if(options.store) {
        this.$store = options.store
      } else {
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}