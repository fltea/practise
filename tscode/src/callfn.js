function Parent(name, age) {
  this.name = name
  this.age = age
  // console.log(' this:', this)
  // console.log(' this.name:', this.name)
}

Parent.prototype.friends = ['sddfs','dsfdsf']
Parent.prototype.eat = function () {
  console.log(this.name +' 吃飯')
}


function Dugter(name, age, favor, sex) {
  this.favor = favor;
  this.sex = sex;
  Parent.call(this, name, age);  // TS 繼承中使用 super
}

// 繼承組合模式
// Dugter.prototype = new Parent('wewe', 34)

// function Dugter2(name, age, favor, sex) {
//   this.favor = favor;
//   this.sex = sex;
//   Parent.call(this, name, age);  // TS 繼承中使用 super
// }

// 寄生組合繼承實現步驟
// 第一步： 創建一個寄生構造函數
// function Middle() {
//   this.count = 23
// }
// Middle.prototype = Parent.prototype
// 第二步：創建一個寄生新創建的構造函數的對象
// 第三步：子類原型對象空間指向第二步的新創建的構造函數的對象
// Dugter.prototype = new Middle()
// Dugter.prototype.constructor = Dugter


// 構建一個公用的寄生組合繼承函數【最佳原型繼承模式】
// function createNewPrototypeObj (rootObj, ndour){
// function _extends (rootObj, ndour){
//   function Middle() {
//     this.constructor = ndour
//   }
//   Middle.prototype = rootObj.prototype
//   return new Middle()
// }

// Dugter.prototype = _extends(Parent, Dugter)

// Object.create 方式
Dugter.prototype = Object.create(Parent.prototype, {
  count: {
    writable: true,
    value: 23
  }
})
Dugter.prototype.constructor = Dugter



let sobj = new Dugter('lisi', 34,'dalanqiu','nv')
console.log('sobj: ', sobj);
// undefined  
// 繼承組合模式  [ 'sddfs', 'dsfdsf' ] 
// console.log('sobj.friends: ', sobj.friends);  

