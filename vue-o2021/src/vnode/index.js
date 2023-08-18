export function renderMixin(Vue) {
  Vue.prototype._c = function (){
    // console.log(arguments)
    return createElement(this, ...arguments)
  } 

  Vue.prototype._v = function (text){
    return createText(text)
  }

  Vue.prototype._s = function (val) {
    return val === null ? '' : (typeof val === 'object') ? JSON.stringify(val) : val;
  }

  Vue.prototype._render = function () {
    const vm = this;
    const render = vm.$options.render
    const vnode = render.call(this)
    return vnode;
  }
}

function isResved(tag){ 
   return ['a', 'div', 'h', 'button', 'span', 'input'].includes(tag)
}
function Createcomponent(vm, tag, data, children, Ctor) {
  if(typeof Ctor === 'object') {
    Ctor = vm.constructor.extend()
  }
  data.hook = {
    // 初始化組件
    init(vnode) {
      let child = vnode.componentInstance = new vnode.componentOptions.Ctor({})
      console.log(child)
      child.$mount() 
    }
  }
  return vnode('vm', 'vue-component-'+ tag, data, undefined, undefined, undefined, {Ctor, children})
}

// 創建元素
function createElement(vm, tag, data={}, ...children) {
  // 標籤 
  if(isResved(tag)) {
    return vnode(vm, tag, data, data.key, children);
  } 
  // 組件
  // return vnode(tag, data, data.key, children);
  const Ctor = vm.$options['components'][tag];
  return Createcomponent(vm, tag, data, children, Ctor)
}

function createText(text){
  return vnode(undefined, undefined, undefined, undefined, undefined, text);
}

// 創建虛擬 DOM
function vnode(vm, tag, data, key, children, text, componentOptions) {
  return {
    vm,
    tag,
    data,
    key,
    children,
    text,
    componentOptions,
  }
}