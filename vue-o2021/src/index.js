import { initGlobApi } from "./global-api/index";
import { initMaixin } from "./init";
import { stateMixin } from "./initState";
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./vnode/index";

function Vue(options) {
  this._init(options)
}

initMaixin(Vue)
lifecycleMixin(Vue) // 添加生命周期
renderMixin(Vue) // render 函數
stateMixin(Vue)

// 全局方法 Vue.mixin Vue.component Vue.extend 
initGlobApi(Vue)

export default Vue;