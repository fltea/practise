import { observer } from "./observe/index";

export function initState(vm) {
  let ops = vm.$options;
  // console.log(ops)

  if(ops.props) {
    initProps(vm)
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
  if(ops.methods) {
    initMethods(vm)
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
function initWatch(vm){}
function initMethods(vm){}