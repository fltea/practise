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

解決了回調低於的問題，但是代碼冗餘、閱讀性差、不易理解。

**Promise.all()**： 等所有異步操作全部完成後執行才會執行下一步的 then 操作。
**Promise.race()**：只要有一個異步操作完成，就立即執行下一步的 then 操作。

## async/await

簡化 Promise 異步操作

- 如果在 function 中使用了 await ，則 function 必須被 async 修飾
- 在 async 方法中，第一個 await 之前的代碼會同步執行， await 之後的額代碼會異步執行

## EventLoop

Javascript 是單線程執行的編程語言。同一時間只能做一件事。如果一個任務非常耗時，則後續的任務就不得不一直等待，從而導致程序假死的問題。

未來防止某個耗時任務導致程序假死的問題， Javascript 把待執行的任務分為了兩類：

- 同步任務 非耗時任務，指的是在主線上排隊執行的那些任務，只有前一個任務執行完畢，才能執行後一個任務
- 異步任務 耗時任務，一步任務有 Javascript 委託個宿主環境（js執行環境 -> 瀏覽器/ node 環境）執行，異步任務執行完成後，會通知 Javascript 主線程執行異步任務的回調函數

1. 主線程次序執行任務，如果是同步任務，直接執行，如果是異步任務，則把耗時任務委託給宿主環境
2. 已完成的異步任務對應的回調函數，會被加入到任務隊列中等待執行
3. 主線程的執行棧被清空後，會讀取任務隊列中的回調函數，放到執行棧中次序執行
4. Javascript 主線程不斷重復上一個步驟

## 宏任務和微任務的執行順序

Javascript 又把異步任務做進一步的劃分：

- 宏任務（macrotask） 異步 Ajax 請求、setTimeout setInterval 、文件操作、其他宏任務
- 微任務（microtask） Promise.then .catch .finaaly、 process.nextTick 、其他微任務

下一個宏任務執行前，先判斷是否有待執行微任務，如果有微任務，則立即執行完所有微任務，再繼續執行下一個宏任務（交替執行）
如果是主線程的執行棧清空後，則先判斷是否有待執行微任務，如果有微任務，則立即執行所有完微任務，再繼續執行下一個宏任務

``` js
// 經典面試題
console.log('1')

setTimeout(() => {
  console.log('2')
  new Promise((resolve) => {
    console.log('3')
    resolve()
  }).then(() => {
    console.log('4')
  })
})
new Promise((resolve) => {
  console.log('5')
  resolve()
}).then(() => {
  console.log('6')
})

setTimeout(() => {
  console.log('7')
  new Promise((resolve) => {
    console.log('8')
    resolve()
  }).then(() => {
    console.log('9')
  })
})

//  輸出 ： 1 5 6 2 3 4 7 8 9
```
