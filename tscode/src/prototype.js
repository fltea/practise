function Parent (name, age) {
  this.name = name;
  this.age = age;
}
Parent.prototype.friends = ['xiaozhang', 'xiaoli']
Parent.prototype.eat = function () {
  console.log(this.name + "  吃飯。")
}

function Son (favor, sex){
  this.favor = favor
  this.sex = sex
}

let parent = new Parent('wangwu', 23);
console.log('parent: ', parent)
let son = new Son('dalanqiu', 'nv')
console.log('son: ', son);
console.log('Son.prototype : ', Son.prototype)


// 原型鏈繼承
// 繼承帶來的好處
//  子類對象可以訪問父類的實例屬性
//  子類對象變量可以訪問父類原型對象空間中的屬性和方法
Son.prototype = new Parent('wang', 232)
Son.prototype.constructor = Son  // 讓 Son 類的對象或函數原型.prototype 指向的原型對象空間【 new Parent() 對象空間 】有一個 constructor 指向了 Son 構造函數對象空間

console.log('Som.prototype 原型鏈繼承後的指向：', Son.prototype)
let son2 = new Son('dsdf','nv')
console.log("son2 :", son2)
console.log("son2 訪問 Son 類自身的 favor 屬性【構造函數中 this 定義的對象屬性】：", son2.favor)
console.log("son2 訪問 son 對象原型上的 name 屬性： ", son2.name)
console.log("son2 訪問 friends 屬性：", son2.friends)

// Son.prototype = Parent.prototype
// Son.prototype.constructor = Son
// 執行後會讓 Son.prototype 和 Parent.prototype 和 son2.__proto__ 指向的原型對象空間 [ Parent.prototype 指向的原型對象空間 ]  指向 Son 構造函數對象空間
// 違背了 Parent 原型對象空間的 constructor 屬性必須指向 Parent 自身的構造函數

