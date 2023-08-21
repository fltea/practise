import { foreach } from "./utils";
import { Vue } from './mixin'

/**
 * root = {
 *  _raw: '用戶傳過來的默認數據',
 *  _children: {
 *    a : {
 *      _raw: '',
 *      _children: {}
 *    }
 *  },
 *  state: '根數據'
 * }
 */

// class ModulesCollections {
//   constructor(options) {

//   }
// }

export class Store{
  constructor(options) {

    // 模塊化處理
    //  1. 格式化數據  樹形結構
    // this._modules = new ModulesCollections(options)

    // getter 相當於 Vue 的計算屬性，有緩存機制
    let getters = options.getters
    this.getters = {}
    let computed = {}
    foreach(getters, (key, value) => {
      computed[key] = () => {
        return value(this.state)
      }
      Object.defineProperty(this.getters, key, {
        get: () => {
          return this._vm[key]
        }
      })
    })

    let mutations = options.mutations
    this.mutations = {}
    foreach(mutations, (key, value) => {
      this.mutations[key] = (data) => {
        value(this.state, data)
      }
    })

    let actions = options.actions
    this.actions = {}
    foreach(actions, (key, value) => {
      this.actions[key] = (data) => {
        value(this, data)
      }
    })

    // this.state = options.state;
    this._vm = new Vue({
      data: {
        state: options.state
      },
      computed,
    });
  }

  get state(){
    return this._vm.state
  }

  commit = (name, data) => {
    this.mutations[name](data)
  }

  dispatch = (name, data) => {
    this.actions[name](data)
  }
}
