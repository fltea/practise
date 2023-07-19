import { mergeOptions } from "../utils/index";

export function initGlobApi(Vue) {
  //  {created:[a,b,c]}
  Vue.options = {};
  Vue.Mixin = function (mixin) { // mixin: {}
    // 對象的合併
    this.options = mergeOptions(this.options, mixin)
  }
}