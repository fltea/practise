let peopleObj = {
  name:'xoapsj',
  ppl_age: this.age,
  eat(address, who) {
    this.address = address;
    this.who = who;
    console.log('this: ', this);
    console.log(this.name + ' 年齡： ' +  this.age + ' 和' +  this.who + ' 在' + this.address)
    return 3
  }
}

let myobj = {
  name: '校網',
  age: 98
}

console.log('myobj: ', myobj);
// call 方法的使用
// peopleObj.eat.call(myobj, 'jsdhdfjk address', 'fjh d ls ')
// console.log('myobj: ', myobj);

// apply 方法的使用           傳遞的是數組
peopleObj.eat.apply(myobj, ['jsdhdfjk address', 'fjh d ls '])
console.log('myobj: ', myobj);

