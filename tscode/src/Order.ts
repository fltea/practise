import OrderDetail from './OrderDetail'

class Order {
  // public orderId:number = 0;
  // public date:Date = new Date();
  // public custname:string = "nocustname";
  // public phone:string = "222";
  // public orderDetail:OrderDetail[] = []
  // public orderDetail:Set = []
  // 原始值类型 = 基本数据类型
  // public orderDetail:Array<OrderDetail> = []  // 定义了一个Array数组，Array数组当中的每一个元素都是OrderDetail类型的元素

  // 是一个引用属性【数组类型的引用属性】
  // constructor(orderId_:number, date_: Date, custname_:string, phone_:string, orderDetail_: Array<OrderDetail>){
  // this.orderId = orderId_;
  // this.date = date_;
  // this.custname = custname_;
  // this.phone = phone_;
  // this.orderDetail= orderDetail_;
  // }

  // 给构造器的参数加上 public ，这个参数就变成了一个属性
  /**
   * 这种写法是两部综合体： 
   * 1. 定义类一个属性
   * 2. 等于默认构造函数会给这个属性赋值[隐式操作]
   */
  constructor(public orderId:number, public date: Date, public custname:string, public phone:string, public orderDetail: Array<OrderDetail>){
  }
}

const orderDate = new Date(2023, 10,27,5,20,0)
const orderDetailOne = new OrderDetail(1, "we", 3000, 3)
const orderDetailTwo = new OrderDetail(2, "w22e", 3020, 3)
const orderDetailThree = new OrderDetail(3, "w1e1", 350, 1)
// const orderDetailArray:Array<OrderDetail> = [orderDetailOne,orderDetailTwo,orderDetailThree]
// let order = new Order(1,orderDate,'对接客户','34343',orderDetailArray)

let order = new Order(1,orderDate,'对接客户','34343',[orderDetailOne,orderDetailTwo,orderDetailThree])

console.log(order)