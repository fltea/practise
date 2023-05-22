class Person {
  // public name: string | undefined // ts 4.0 之前属性如果没有赋值的解决方法
  // 类上定义的属性一定是描绘这个类本身特征的变量，不能把一些无关的变量定义成类属性
  public name: string = "name"
  public age: number = 0
  public phone: string = "1111"
  // 对象的变量 = 实例的变量 = 类的非静态属性  = 简称属性
  // 实例属性 、 对象属性

  constructor(name_: string, age_:number, phone_: string){
    this.name = name_
    this.age = age_
    this.phone = phone_
  }

  // public doEat(): number{
  //   return 111
  // }

  // 默认返回值为 void 
  public doEat(who: string, address: string): void{
    console.log(`${this.name}和${who}在${address}吃饭`)
  }
}

/**
 * 1. 堆中为类的某个实例开辟空间
 * 2. 调用类对应的构造函数，把构造函数的各个参数赋值给对象属性
 * 3. 把对象赋值给对象变量【把实例赋值给实例变量】
 * */ 
const p1 = new Person("wewe",34,'ererer');
// p1.age = 23
// p1.name = "wewe"
p1.doEat('me', 'dedecxd0')
console.log(p1)

