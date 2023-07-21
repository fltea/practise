import { compileToFunction } from "./compile/index";
import { initGlobApi } from "./global-api/index";
import { initMaixin } from "./init";
import { stateMixin } from "./initState";
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./vnode/index";
import { createEl, patch } from "./vnode/patch";

function Vue(options) {
  this._init(options)
}

initMaixin(Vue)
lifecycleMixin(Vue) // 添加生命周期
renderMixin(Vue) // render 函數
stateMixin(Vue)

// 全局方法 Vue.mixin Vue.component Vue.extend 
initGlobApi(Vue)

// 創建 vnode
const vm1 = new Vue({data:{name:'張數量'}})
const render1 = compileToFunction(`<div id="a" style="color: red;font-size: 20px"><p>{{name}}</p></div>`)
const vnode1 = render1.call(vm1)
document.body.appendChild(createEl(vnode1))

const vm2 = new Vue({data:{name:'張數量2'}})
const render2 = compileToFunction(`<div id="app" style="font-size: 25px;"><p>{{name}}</p><span>{{name}}</span></div>`)
const vnode2 = render2.call(vm2)
// document.body.appendChild(createEl(vnode1))
patch(vnode1, vnode2)
export default Vue;