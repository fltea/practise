// 需求1： 汽車租賃功能實現： 有小轎車、大巴、卡車 三種類型的車，顧客可以租任意一種或多種不同的車
// 需求2： 計算退回費用： 最終退回顧客的費用為押金扣除使用天數，如押金不足需額外支付不足
// 小轎車、大巴、卡車共同屬性：品牌（ brand ） 車牌（ VechileNo ） 天數（ days ） 總費用（ total ） 押金（ deposit ）
// 小轎車、大巴、卡車共同方法：計算租賃的價格( calculateRent ) 支付押金的方法（ payDesposit ）  安全規則方法（ safeShow ）


class Vechile {
  public brand: string // 品牌
  public vechileNo: string // 車牌
  public days: number // 天數
  public total!: number // 總費用
  public deposit: number // 押金

  constructor(brand_: string, vechileNo_: string, days_: number, deposit_: number){
    this.brand = brand_;
    this.vechileNo = vechileNo_;
    this.days = days_;
    // this.total = total_;
    this.deposit = deposit_;
  }


  public calculateRent(){
    console.log(`${this.brand} 車牌號為：${this.vechileNo} 開始被租`)
    return 0;
  }

  public payDesposit(){
    console.log(`${this.brand} 車牌號為：${this.vechileNo} 支付了：${this.deposit}`)
  }

  public safeShow(){
    console.log(`${this.brand} 車牌號為：${this.vechileNo} 違規了：${this.deposit}`)
  }

}

class Car extends Vechile {
  public type: string

  constructor(brand_: string, vechileNo_: string, days_: number, deposit_: number, type_: string){
    super(brand_, vechileNo_, days_, deposit_)
    this.type = type_;
  }

  public getPriceByType(){
    let rentMoneyByDay: number = 0;
    if(this.type === '1') {
      rentMoneyByDay = 800;
    } else if(this.type === '2') {
      rentMoneyByDay = 400;
    } else {
      rentMoneyByDay = 200;
    }
    return rentMoneyByDay;
  }

  public calculateRent(){  // 方法重寫 【override】
    super.calculateRent();
    return this.days * this.getPriceByType();
  }
}

let car = new Car('brand_', 'vechileNo_', 4, 50000,'1')


class Bus extends Vechile {
  public seatNum: number

  constructor(brand_: string, vechileNo_: string, days_: number, deposit_: number, seatNum_: number){
    super(brand_, vechileNo_, days_, deposit_)
    this.seatNum = seatNum_;
    if(this.seatNum > 200) {
      throw new Error('座位數不能大於200')
    }
  }

  public getPriceBySeatNum(){
    let rentMoneyByDay: number = 0;
    if(this.seatNum >100) {
      rentMoneyByDay = 800;
    } else if(this.seatNum >10) {
      rentMoneyByDay = 400;
    } else {
      rentMoneyByDay = 200;
    }
    return rentMoneyByDay;
  }

  public calculateRent(){
    return this.days * this.getPriceBySeatNum();
  }
}