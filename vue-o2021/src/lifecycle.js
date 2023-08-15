import { patch } from "./vnode/patch";
import Watcher from './observe/watcher'

export function mountComponent(vm, el) {
  callHook(vm, 'beforeMount')
  // vm._update(vm._render()); // 將 render 變成 vnode  然後掛載到頁面
  const updateComponent = () => {
    vm._update(vm._render()); 
  }
  new Watcher(vm, updateComponent, () => {
    callHook(vm, 'updated')
  }, true);
  callHook(vm, 'mounted')
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    // console.log(vnode)
    const vm = this;
    //  區分首次渲染還是更新
    let prevVnode = vm._vnode;
    if(!prevVnode) {
      vm.$em = vm.$el = patch(vm.$el, vnode);
      vm._vnode = vnode;
    } else {
      patch(prevVnode, vnode);
    }
  }
}

// 生命周期調用
export function callHook(vm, hook) {
  const handlers = vm.$options[hook];
  if(handlers) {
    for (let i = 0; i < handlers.length; i++) {
      handlers[i].call(this);
    }
  }
}