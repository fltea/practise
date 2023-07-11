import { initMaixin } from "./init";
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./vnode/index";

function Vue(options) {
  this._init(options)
}

initMaixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue;