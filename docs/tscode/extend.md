# TS 繼承

1. 練就更深厚的 JS 原型，原型鏈功底，為面試、閱讀 Vue3 / React 源碼或其他流行框架源碼鋪路
2. 提升前端項目架構的根基技術 【工具庫、組件庫 ==> TS 開發，運用 TS 繼承，多態等技術寫高水平代碼】
3. 突破前端技術瓶頸之一的技能，晉級中、高級前端工程師必會技能

## 深度掌握 TS 繼承 -- 原型鏈繼承

原型鏈繼承實現的本質是改變 Son 構造函數的原型對象變量的指向【就是 Son.prototype 的指向】，Son.prototype = new Parent() 。那麼 Son.prototype 可以訪問 Parent 對象空間的屬性和方法。 所以順著 __proto __ 屬性，Son 類也可以 訪問 Parent 類的原型對象空間中的所有屬性和方法。

> 原型鏈繼承查找屬性和方法的完整路線描述： 子對象首先在自己的對象空間中查找要訪問的屬性或方法，如果找到就輸出，如果沒有找到，就沿著子對象中的 __proto __ 屬性指向的原型對象空間中去查找有沒有這個屬性或方法，如果找到就輸出，如果沒找到，繼續沿著原型對象空間中的 __ proto __ 查找上一級原型對象空間中的屬性或方法，直到找到 Object.prototype 原型對象屬性指向的原型對象空間為止，如果再找不到，就輸出 null 。

### 原型鏈繼承容易遺忘的一步

``` js
Son.prototype.constructor = Son
// 讓 Son 類的對象或函數原型.prototype 指向的原型對象空間【 new Parent() 對象空間 】有一個 
// constructor 指向了 Son 構造函數對象空間
```

### Son.prototype = Parent.prototype 可以嗎？

Son.prototype = Parent.prototype
Son.prototype.constructor = Son
執行後會讓 Son.prototype 和 Parent.prototype 和 son2.__proto __ 指向的原型對象空間 [ Parent.prototype 指向的原型對象空間 ]  指向 Son 構造函數對象空間
違背了 Parent 原型對象空間的 constructor 屬性必須指向 Parent 自身的構造函數

### 原型鏈繼承的不足

局限性： 不能通過子類構造函數想父類構造函數傳遞參數
