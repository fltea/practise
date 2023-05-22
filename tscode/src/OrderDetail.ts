class OrderDetail {
  // TS4 之前针对
  // 没有初始化的值，也没有在构造函数明确给这个属性赋值的一种解决方案
  // 增加 undefined 类型就可以  public orderDetailId:number | undefined;
  // public orderDetailId:number | undefined;
  // public productname:string | undefined;
  // public price:number | undefined;
  // public count:number | undefined;
  // TS4 之后
  public orderDetailId!:number;
  public productname!:string;
  public price!:number;
  public count!:number;

  constructor(orderDetailId_:number, productname_:string, price_:number, count_:number){
    this.orderDetailId = orderDetailId_;
    this.productname = productname_;
    // this.price = price_;
    this.count = count_;
  }

  // public price:number | undefined;  --> Error 对象可能为“未定义”。
  public getTotal(): number {
    return this.price * this.count;
  } 
}

let orderDetail = new OrderDetail(12, '333', 212, 323)
orderDetail.getTotal();

export default OrderDetail;