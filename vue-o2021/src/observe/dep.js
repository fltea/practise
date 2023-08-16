let id = 0
class Dep {
  constructor(){
    this.id = id++
    this.subs = []
  }
  depend() {
    // this.subs.push(Dep.target)
    Dep.target.addDep(this)
  }
  addSub(watcher){
    this.subs.push(watcher)
  }
  notify(){
    this.subs.forEach(watcher => {
      watcher.update();
    })
  }
}

Dep.target = null
let stack = []
// 添加 watcher
export function pushTarget(watcher){
  Dep.target = watcher
  stack.push(watcher)
}
export function popTarget(){
  // Dep.target = null
  stack.pop();
  Dep.target = stack[stack.length - 1]
}

export default Dep;