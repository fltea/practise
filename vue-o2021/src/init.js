import { compileToFunction } from "./compile/index";
import { initState } from "./initState";
import { callHook, mountComponent } from "./lifecycle";
import { mergeOptions } from "./utils/index";

export function initMaixin(Vue) {
  Vue.prototype._init = function(options) {
    // console.log(options)

    let vm = this;
    vm.$options = mergeOptions(Vue.options, options);

    callHook(vm, 'beforeCreate')

    // 初始化狀態
    initState(vm)

    callHook(vm, 'created')
    
    // 渲染模版
    if(vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }

  // 創建 $mount
  Vue.prototype.$mount = function (el) {
    // console.log(el)
    let vm = this;
    // 獲取元素
    el = document.querySelector(el)
    vm.$el = el;
    let options = vm.$options;
    if(!options.render) {
      let template = options.template;
      if(!template && el) {
        // 獲取 html
        el = el.outerHTML;
        // console.log(el);

        // 將 變成 render()
        const render = compileToFunction(el);
        
        // 將 render 函數變成虛擬 DOM  vnode {}
        options.render = render;
      }
    }
    // 掛載組件
    mountComponent(vm, el);
  }
}
