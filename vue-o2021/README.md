# Vue2 源碼分析

1. 初始化 Vue
1. 实现对 data 中对象的属性进行劫持
1. 实现对 data 中数组使用方法函数进行劫持
1. 实现对 data 中数组中的对象以及添加的对象进行劫持
1. 将 data 上的所有的属性代理到实例上
1. 获取到 html
1. 讲解真实 dom 变为 ast 语法树的形式
1. 创建 ast 语法树
1. 将 ast 语法树变为 render 函数（处理样式）
1. 将 ast 语法树变为 render 函数（处理子集）
1. 将 render 字符串变为函数-
1. 将 render 函数变为虚拟 dom
1. 将虚拟 dom 变为真实 dom
1. vue 的渲染流程讲解
1. 使用策略模式合并生命周期
1. 生命周期调用
1. 实现 dep
1. 实现对象的收集依赖
1. 实现 dep 和 watcher 多对多的关系
1. 实现数组的收集依赖
1. 创建 Watcher 实例，来实现更新
1. 列队处理
1. 实现 nextTick()
1. 实现生命周期
1. 实现 watch
1. 完善 watch
1. diff 算法（创建虚拟 dom 和数据更新）
1. diff 算法（patch 比对）
1. diff 算法（实现交叉比对）
1. 暴力比对
1. 实例获取到 computed 的属性
1. 实现 computed 缓存机制
1. 实现 computed
1. 实现 Vue.component 以及 Vue.extend
1. 创建组件的虚拟 dom
1. vuex 的基本使用
1. 实现 store 放到每一个使用的组件中
1. 将 store 中的 state 的数据变为响应式
1. 实现 vuex 中的 getters
1. 实现 vuex 的 mutations 和 actions
1. 实现 vuex 的 modules
1. 分析路由的使用以及特性
1. 给每一个组件添加一个 router 实例
1. 处理第一层路由
1. match 的实现
1. 创建 history 的三个模块
1. 实现 hash 模式
1. 实现 router 的重点
1. 实现路由改变的响应式
1. 实现路由占位符
1. 实现路由守卫

## watch 使用方法

1. 屬性： 方法
1. 屬性： 數組
1. 屬性： 對象
1. 屬性： 字符串

## vuex 屬性

- state 存放數據 響應式 改變視圖
- getters  緩存機制
- mutations  同步
- actions  異步


## Vue.use

1. 執行方法
2. 如果存在屬性 install 屬性，且是一個方法， 執行 install 方法
3. 如果 install 有參數 第一個參數是 Vue 的實例

