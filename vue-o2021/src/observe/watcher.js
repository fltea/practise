import { nextTick } from "../utils/nextTick";
import { popTarget, pushTarget } from "./dep";

let id = 0;
class Watcher {
  constructor(vm, updateComponent, cb, options) {
    this.vm = vm;
    this.exprOrFn = updateComponent;
    this.cb = cb;
    this.options = options;
    this.id = id++;
    this.deps = []
    this.depsId = new Set()

    if(typeof updateComponent === 'function') {
      this.getter = updateComponent;  // 用來更新視圖
    }

    // 更新視圖
    this.get();
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
  get(){
    pushTarget(this)
    this.getter()
    popTarget()
  }
  run() {
    this.getter();
  }
  // 更新
  update(){
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
    item.cb();
  })
  queue = []
  has = {}
  pending = false;
}

function queueWatcher(watcher) {
  console.log(watcher.id)

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
