import { mergeOptions, toArray } from "../utils/index";

export function initGlobApi(Vue) {
  //  {created:[a,b,c]}
  Vue.options = {};
  Vue.Mixin = function (mixin) { // mixin: {}
    // 對象的合併
    this.options = mergeOptions(this.options, mixin)
  }

  Vue.options.components = {}
  Vue.component = function(id, componentDef) {
    componentDef.name = componentDef.name || id;
    // 核心 Vue 創建組件的核心 Vue.extend()
    componentDef = this.extend(componentDef)  // 返回一個實例
    this.options.components[id] = componentDef
  }
  // 核心 Vue 創建組件的核心 
  Vue.extend = function(options) {
    const spuer = this;
    const Sub = function vuecomponent(opts) {
      this._init(opts)
    }
    Sub.prototype = Object.create(spuer.prototype)
    Sub.prototype.constructor = Sub;
    Sub.options = mergeOptions(this.options, options)
    return Sub;
  }

  Vue.use = function(plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if(installedPlugins.indexOf(plugin) > -1) {
      return this;
    }

    var args = toArray(arguments, 1);
    args.unshift(this)
    if(typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  }
}

/**
 *  創建全局組件： 定義全局組件映射關係表
 *  Vue extend 創建子類，初始化子組件，繼承組件中屬性
 *  創建組件的 vnode node/index.js
 *  渲染組件
 * 
 *  標籤的渲染 => 獲取 el => Vnode => 真實 Dom
 * */

