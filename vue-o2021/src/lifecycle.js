import { patch } from "./vnode/patch";

export function mountComponent(vm, el) {
  vm._update(vm._render()); // 將 render 變成 vnode  然後掛載到頁面
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    // console.log(vnode)
    const vm = this;
    vm.$el = patch(vm.$el, vnode);
  }
}