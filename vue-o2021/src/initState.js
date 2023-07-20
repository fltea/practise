import { observer } from "./observe/index";
import Watcher from "./observe/watcher";
import { nextTick } from "./utils/nextTick";

export function initState(vm) {
  let ops = vm.$options;
  // console.log(ops)

  if(ops.props) {
    initProps(vm)
  }
  if(ops.methods) {
    initMethods(vm)
  }
  if(ops.data) {
    initData(vm)
  }
  if(ops.computed) {
    initComputed(vm)
  }
  if(ops.watch) {
    initWatch(vm)
  }
}

function proxy(vm, source, key){
  Object.defineProperty(vm, key, {
    get(){
      return vm[source][key];
    },
    set(newValue) {
      vm[source][key] = newValue;
    }
  })
}

function initProps(vm){}

// 初始化 data 
function initData(vm){
  // console.log('初始化 data')
  //  對象 OR function 
  let data = vm.$options.data;
  //  注意 data  的 this             綁定 this 為 vm
  data = vm._data = typeof data === 'function' ? data.call(vm) : data;

  //  data 數據劫持
  // 將 data 所有屬性代理到 實例上 
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      proxy(vm, '_data', key)
    }
  }
  observer(data)
}

function initComputed(vm){}
function initWatch(vm){
  let watch = vm.$options.watch;
  // console.log(watch)
  for (const key in watch) {
    const handler = watch[key]
    // 函數 對象 數組 字符串
    // console.log(handler)
    if(Array.isArray(handler)) {
      handler.forEach(item => createWatcher(vm, key, item))
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

// vm.$watch(() => {return 'a'}) 
function createWatcher(vm, exprOrfn, handler, options){
  if(typeof handler === 'object') {
    options = handler
    handler = handler.handler
  }

  if(typeof handler === 'string') {
    handler = vm[handler] // 將實例上的方法作為 handler 
  }

  // 其他是函數
  return vm.$watch(vm, exprOrfn, handler, options)
}

function initMethods(vm){
  const methods = vm.$options.methods;
  for (const key in methods) {
    vm[key] = methods[key]
  }
}

export function stateMixin(Vue) {
  Vue.prototype.$nextTick = function (cb) {
    nextTick(cb)
  }
  Vue.prototype.$watch = function (vm, exprOrfn, handler, options = {}) {
    // console.log(exprOrfn, handler, options)
    // 實現 watch 就是  new Watcher 渲染走 渲染 Watcher  $watch 走 watcher user:false

    let watcher = new Watcher(vm, exprOrfn, handler, {...options, user: true})
    if(options.immediate) {
      handler.call(vm) // 立即執行
    }
  }
}