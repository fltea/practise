# Vue

用於構建用戶界面的前端框架。

**於構建用戶界面**：往 html 頁面中填充數據，非常方便

**框架**：框架是一套現成的解決方案，程序員只能遵守框架的規範，去編寫自己的業務功能。學習 VUE，就是學習 Vue 框架中規定的寫法（Vue 的指令、組件[對 UI 結構的複用]、路由、Vuex）

## 2大特性

### 數據驅動視圖

vue 會監聽數據的變化，從而自動重新渲染頁面的結構[ 單向的數據綁定 ]

### 雙向數據綁定

> form 負責采集數據  Ajax 負責提交數據

在填寫表單時，雙向數據綁定可以輔助開發者在不操作 DOM 的前提下，自動把用戶填寫的內容填充到數據源中

## MVVM

MVVM 是 Vue 實現數據驅動視圖和雙向數據綁定的核心原理。 MVVM 指的是 Model、View 和 ViewModel，把每個 html 頁面都拆分成這三個部分。
        監聽數據變化                     自動更新
Model  ----------->  ViewModel  -----------> View
Model  <-----------  ViewModel  <----------- View
        自動同步                         監聽 Dom 變化

**ViewModel**：MVVM 的核心，把數據源（Model）和視圖（View）鏈接在了一起，是 Vue 的實例。
但數據源發生變化時，會被 ViewModel 監聽到， VM 會根據最新的數據源自動更新頁面的結構
當表單元素的值發生變化時，也會被 VM 監聽到， VM 會把變化過後的最新值自動同步到 Model 數據源中

## 版本

1.x 已淘汰
2.x 主流
3.x 20200919發佈

## 指令

模版語法，輔助開發者渲染頁面的基本結構，支持綁定簡單數值和 JavaScript 表達式的運算

### 內容渲染指令

渲染 DOM 元素的文本內容

- v-text 會覆蓋內容
- v-html 插入 html 內容，會覆蓋內容
- {{ }} 插值表達式
  1. 內容的佔位符，不會覆蓋內容，實際應用最多
  2. 只能用在元素的內容節點中，不能用在屬性節點中

### 屬性綁定指令

- v-bind 綁定動態屬性值 可以簡寫為英文的 :

### 事件綁定指令

- v-on:name 綁定事件 可以簡寫為英文的 @name

**傳參**：可以用 $event

**事件修飾符**：
.prevent 阻止默認行為 e.preventDefault()
.stop  阻止冒泡 e.stopPropagation()
.capture  捕獲方式觸發當前事件處理函數
.once  只觸發一次
.self  只有在 event.target 是當前元素自身時觸發事件處理函數

**按鍵修飾符**：
.enter

### 雙向綁定指令

- v-model

**修飾符**：.number .trim .lazy

### 條件渲染指令

- v-if  創建或移除元素，元素初始不需要顯示且後面不需要頻繁使用時，推薦使用
- v-show  使用樣式 display 控制，需要頻繁切換時，推薦使用

在實際開發中，大多數情況不需要考慮性能，使用 v-if

- v-else-if
- v-else

需要配合 v-if 使用

### 列表渲染指令

- v-for

## 過濾器

常用於文本的格式化, 可以連續調用多個過濾器（vue3 不支持）

**插值表達式**：{{ message | handler(arg1, arg2) | 過濾器2 | 過濾器3 }}

**v-bind 屬性綁定**：:id="message | 過濾器"

``` js
filters: {
  handler(val,arg1, arg2) {
    return `${val | ''} result`;
  }
}
```

## 監聽器

本質上是一個函數，想要監聽哪個數據的變化，就把數據名作為方法名

``` js
watch: {
  handle(val, oldVal) {
    
  }
}
```

無法進入頁面立即執行，可以通過配置屬性

``` js
watch: {
  handle： {
    // 是否自動觸發一次
    immediate: true,
    // 是否深度監聽
    // 對象的屬性改變就會觸發
    deep: true,
    handler(val, oldVal){}
  }
}
```

## 計算屬性

通過一系列運算之後，得到一個屬性值

定義時定義為方法，需要帶返回值，使用時可以當普通的屬性使用，可以在模版和 methods 中使用

實現了代碼的複用，依賴的數據源變化也會跟著變化

## axios

專注於網絡請求的庫，返回值是一個 Promise 對象，會在返回數據外面再套一層數據，config、headers、request、status、statusText，實際返回數據為 data

``` js

axios.get(url, {
  params:{}
})

axios.post(url, data={})

```

## SPA

單頁面應用程序（Single Page Application），簡稱 SPA ，指的是一個 Web 網站只有一個唯一的 HTML 頁面，所有的功能和交互都在這個頁面內完成。

### vue-cli

Vue.js 開發的標准工具，簡化了程序員基於 webpack 創建工程化的 Vue 項目的過程。

``` js

npm install -g @vue/cli

vue create name

```

### vue 組件

- template 唯一根節點
- script
- style  scoped /deep/ 深度選擇器

組件裡面的 data 不能指向對象，必須是函數返回一個包含屬性的對象

**Props**： 組件的自定義屬性，在封裝通用組件的時候，合理地使用 props 可以極大的提高組件的復用性。

``` js
props:['name']
props: {
  name : {
    // 配置項
  }
}
props:{
  name： {
    default: 0,
    required: true,
    type: Number,
  }
}

```

## 生命周期

一個組件從創建 -> 運行 -> 銷毀的整個階段，強調的是一個時間段。

**生命周期函數**：有 vue 框架提供的內置函數，會伴隨著組件的生命週期，自動按順序執行。

> 創建

- new Vue()

- beforeCreate
- created
- beforeMount
- mounted

> 運行

- beforeUpdate
- updated

> 銷毀

- beforeDestroy
- destroyed

### 生命周期流程

1. new Vue() 創建組件的實例對象
1. init Events& Lifecycle 初始化時間和生命周期函數
1. beforeCreate 函數  **組件的 props/data/methods 尚未被創建，都處於不可使用狀態**
1. init Injections & reactivity 初始化 props、data、methods
1. created 函數   **組件的 props/data/methods 已創建好，處於可用狀態，但是組件模板結構尚未創建**  可調用 methods 中方法請求服務器數據賦值給 data 中的屬性
1. Has 'el' option ---------> YES 直接進行下一步  ----------> No when vm.$mount(el) is called 執行下一步
1. Has 'template' option ---------> YES Compile template into render function  ---------> NO Compile el's outHTML as template **基於數據和模板在內存中編譯生成 HTML 結構**
1. beforeMount 函數 **將要把內存編譯好的 HTML 結構渲染到瀏覽器中，此時瀏覽器中還沒有當前組件的 DOM 結構**
1. Create vm.$el and replace 'el' width it 用內存中編譯生成的 HTML 結構替換掉 el 屬性綁定的 DOM 元素
1. mounted 已經把內存中的 HTML 結構成功渲染到了瀏覽器，此時瀏覽器中已包含當前組件的 DOM 結構。**操作 DOM 的最早時機**
1. Mounted 後
    ---------> when data changes  **循環**

    1. beforeUpdate 將要根據變化過後、最新的數據，重新渲染組件的模版結構
    1. Virtual DOM re-render and patch 根據最新的數據，重新渲染組件的 DOM 結構
    1. updated 已經根據最新的數據，完成了組件 DOM 結構的重新渲染

1. when vm.$destroy() is called
1. beforeDestroy 將要銷毀組件，此時尚未銷毀，組件還處於**正常工作**的狀態
1. Teardown wathers, chid components and event listeners 銷毀當前組件的數據偵聽器、子組件、事件監聽
1. destroyed **已經銷毀組件，組件在瀏覽器中對應的 DOM 結構已被完全移除**

## 組件數據共享

- props
- 自定義事件  內層：vm.$emit(name, options)  外層： @name=handle
- eventBus
    1. 創建 eventBus
    1. 組件綁定事件
    1. 組件觸發事件

    ``` js
      // eventBus.js
      export default new Vue()

      // components A 
      import bus from 'eventBus.js'
      ...
      created() {
        bus.$on('name', val => {
          // code
        })
      }

      // components B
      import bus from 'eventBus.js'
      ...
      fn() {
        bus.$emit('name', val)
      }

    ```

## ref 引用

vue 實例包含一個 $refs 對象，裡面存儲這對應的 DOM 元素或組件的引用，默認情況下組件的 $refs 指向一個空對象。

**$nextTick(cb)**： 把 cb 回調推遲到下一個 DOM 更新周期之後執行。

## 動態組件

``` html
<component is="name"></component> 
```

### keep-alive

把內部的組件進行緩存，保持組件狀態

``` html
<keep-alive include="name1,name2" exclude="name3,name4">
  <component is="name"></component>
</keep-alive> 
```

**include**（被緩存）  **exclude**（不被緩存） 不能同時使用這兩個屬性
**生命周期**： deactivated（被緩存） activated（被激活，組件被創建時也會被 執行激活）

## 插槽

vue 為組件的封裝者提供的功能，允許開發者在封裝組件時，把不確定的、希望由使用者指定的部分定義為插槽。
slot 的 name 屬性，默認值為 default

v-slot 只能使用在 component 上或者 template （高級語法），簡寫形式為 #

組件內部直接使用個 slot 標籤

``` html
<!-- template 不會渲染 -->
<template v-slot:default="item">
  <p>內容</p>
  <!-- hellow vue.js -->
  <p>{{ item.msg }}</p> 
</template>

<!-- 在封裝組件時，為預留的 slot 提供屬性對應的值，這種用法，叫做“作用域插槽” -->
<slot name="default" msg="hellow vue.js">可以提供默認內容</slot>
```

## 自定義指令

### 私有自定義指令

在每個 vue 組件中，可以在 directives 定義私有自定義指令

``` js
//  <p v-color>item.msg</p> 

directives: {
  color: {
    // 第一次被綁定到元素上，觸發
    bind(el, binding) {
      // el 綁定的元素
      // binding 指令的綁定配置、屬性
      // value  expression 
      // code
    },
    // Dom 更新的時候觸發
    update(el, binding) {
      // el 綁定的元素
      // binding 指令的綁定配置、屬性
      // value  expression 
      // code
    },
  }
  // 簡寫
  color(el, binding){
    // el 綁定的元素
    // binding 指令的綁定配置、屬性
    // value  expression 
    // code
  }
}
```

### 全局自定義指令

Vue.directive(name, handle);