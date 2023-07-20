export function renderMixin(Vue) {
  Vue.prototype._c = function (){
    // console.log(arguments)
    return createElement(...arguments)
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
    // console.log(vnode)
    return vnode;
  }
}

// 創建元素
function createElement(tag, data={}, ...children) {
  return vnode(tag, data, data.key, children);
}

function createText(text){
  return vnode(undefined, undefined, undefined, undefined, text);
}

// 創建虛擬 DOM
function vnode(tag, data, key, children, text){
  return {
    tag,
    data,
    key,
    children,
    text,
  }
}