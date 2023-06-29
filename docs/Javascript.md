# Javascript

## ES6 模塊化語法

node.js 遵循了 CommonJS 的模塊化規範

- 導入其他模塊使用 require() 方法
- 模塊對外共享成員使用 module.exports 對象

**模塊化的好處**：大家都遵守同樣的模塊化規範寫代碼，降低溝通成本，極大方便了各個模塊之間的互相調用，利人利己。

### 模塊化分類

Javascript 社區嘗試並提出

- AMD （瀏覽器端）
- CMD （瀏覽器端）
- CommonJS （服務器端）

存在差異性和局限性，並不是瀏覽器與服務器通用的模塊化標準，太多的模塊化給開發者增加了學習的難度與開發成本。

**ES6 模塊化規範**：瀏覽器端與服務器端通用的模塊化開發規范。

- 每個 Js 文件都是一個單獨的模塊
- 導入其他模塊成員使用 import 關鍵字
- 向外共享模塊成員使用 export 關鍵字

體驗：
> node >= 14.15.1
> package.json 配置 type: module

### 導出與導入

**默認導出**： export default XX  每個模塊中只允許使用一次，否則報錯；
**默認導入**： import XX from url   XX 只要合法，任意名稱

**按需導出**：export V  每個模塊中可以多次使用；
**按需導入**：import default, { V } from url  V 必須和導出的名稱一樣；可以使用 as 重命名(V as V2); 可以組合使用

**導入並執行**： 單純地執行某個模塊中的代碼，並不需要得到模塊中向外共享的成員 ->  import url

## Promise

Promise 是一個構造函數，可以 new Promise(success,error) new 一個實例，實例代表一個異步操作。
Promise.prototype 上包含 then 方法，每個實例都可以通過原型鏈訪問。
then 方法用來預先指定成功和失敗的回調函數 .then(success,error)，成功的回調函數時必選的，失敗的回調函數時可選的，可不寫;
catch 方法補貨錯誤，放在最後不會執行報錯後的代碼，放在最前會執行報錯後的代碼；

**Promise.all()**： 等所有異步操作全部完成後執行才會執行下一步的 then 操作。
**Promise.race()**：只要有一個異步操作完成，就立即執行下一步的 then 操作。

## async/await


## EventLoop

## 宏任務和微任務的執行順序
