import { nextTick } from "../utils/nextTick";
import { popTarget, pushTarget } from "./dep";

let id = 0;
class Watcher {
  constructor(vm, exprOrFn, cb, options) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.cb = cb;
    this.options = options;
    this.user = !!options.user
    this.id = id++;
    this.deps = []
    this.depsId = new Set()

    if(typeof exprOrFn === 'function') {
      this.getter = exprOrFn;  // 用來更新視圖
    } else {
      this.getter = function () { //屬性
        let path = exprOrFn.split('.')
        let obj  = vm
        for (let i = 0; i < path.length; i++) {
          obj  = obj[path[i]]
        }
        return obj;
      }
    }

    // 更新視圖
    this.value = this.get();
  }
  addDep(dep) {
    let id = dep.id
    if(!this.depsId.has(id)) {
      this.deps.push(dep)
      this.depsId.add(id)
      dep.addSub(this)
    }
  }
  // 初次渲染
  get() {
    pushTarget(this)
    const value = this.getter()
    popTarget()
    return value;
  }
  run() {
    let value = this.get();
    let oldvalue = this.value
    this.value = value
    // 執行 handler
    if(this.user) {
      this.cb.call(this.vm, value, oldvalue)
    }
  }
  // 更新
  update() {
    // this.getter()
    queueWatcher(this)
  }
}

let queue = [] // 緩存 watcher
let has = {}
let pending = false

function flushWatcher(){
  queue.forEach(item => {
    item.run();
    if(!item.user) {
      item.cb();
    }
  })
  queue = []
  has = {}
  pending = false;
}

function queueWatcher(watcher) {
  // console.log(watcher.id)

  if(!has[id]) {
    queue.push(watcher)
    has[id] = true
    if(!pending) {
      // setTimeout(() => {
      //   queue.forEach(item => item.run())
      //   queue = []
      //   has = {}
      //   pending = false;
      // }, 0)
      nextTick(flushWatcher)
    }
    pending = true;
  }
}

export default Watcher;

// 收集依賴 vue dep watcher data:{name, msg}
// dep 和 data 屬性一一對應

// 實現對象收集依賴
