import OrderDetail from './OrderDetail'

class Order2 {
  public orderId:number | undefined;
  public date:Date | undefined;
  public custname:string | undefined;
  public phone:string | undefined;
  // public orderDetail:OrderDetail[] = []
  // public orderDetail:Set = []
  // 原始值类型 = 基本数据类型
  public orderDetail:Array<OrderDetail> = []  // 定义了一个Array数组，Array数组当中的每一个元素都是OrderDetail类型的元素

  // 是一个引用属性【数组类型的引用属性】
  constructor(orderId_:number, date_: Date, custname_:string, phone_:string, orderDetail_: Array<OrderDetail>){
  // this.orderId = orderId_;
  // this.date = date_;
  // this.custname = custname_;
  // this.phone = phone_;
  // this.orderDetail= orderDetail_;
  }

}

const orderDate = new Date(2023, 10,27,5,20,0)
const orderDetailOne = new OrderDetail(1, "we", 3000, 3)
const orderDetailTwo = new OrderDetail(2, "w22e", 3020, 3)
const orderDetailThree = new OrderDetail(3, "w1e1", 350, 1)
// const orderDetailArray:Array<OrderDetail> = [orderDetailOne,orderDetailTwo,orderDetailThree]
// let order = new Order(1,orderDate,'对接客户','34343',orderDetailArray)

let order = new Order2(1,orderDate,'对接客户','34343',[orderDetailOne,orderDetailTwo,orderDetailThree])

console.log(order)