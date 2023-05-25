/**
 * 構造器重載
 * this 其實是一個對象變量，當 new 出來一個對象時，構造器回隱式返回 this 給 new 對象等號左邊的對象變量， this 和等號左邊的變量都只想當前正在創建的對象
 * 哪一個對象效用 TS 類的方法， 那麼這個方法中的 this  都指向當前正使用的對象【 this 和當前的對象變量中都保存著當前對象的首地址】
 * 
 * TS 類構造器回隱式返回 this，如果非要返回值，TS 類構造器只允許返回 this，但構造器不需要返回值也能通過編譯，更沒有返回值類型之說，從這個意義上， TS 構造器可以說是沒有返回值這一說的構造函數。【 注意：TS 構造器和 JS 構造函數關於返回值的說法不完全相同 】
 * 
 * 意義：
 * 構造器重載和函數重載基本相同，主要區別是： TS 類構造器重載簽名和實現簽名都不需要管理返回值， TS 構造器是在對象創建出來之後，但是還沒有賦值給對象之前被執行，一般用來給對象屬性賦值。
 * 
 * 構造器是方法嗎？
 * 對象調用的才是方法，但是 TS 構造器是在對象空間地址賦值給對象變量之前調用，而不是用來 被對象變量調用的，所以構造器（constructor）可以說成構造函數，但不能被看成是一個方法。
 * 
 */

type type_ChartParam = {
  width?:number,
  height?:number,
  radius?:number,
  // ...
}

// 計算正方形面積
// 計算創建正方形對象，可以給構造器傳遞寬和高
// 也可以傳遞一個包含寬和高的形狀參數對象
class Square {
  public width: number;
  public height: number;

  constructor(width_:number, height_:number) // 重載簽名
  constructor(paramObj: type_ChartParam) // 重載簽名
  // constructor(value: number | type_ChartParam) { // 實現簽名
  // constructor(paramObjOrWidth_: any, height_?:number) { // 實現簽名
  constructor(paramObjOrWidth_: any, height_:number = 0) { // 實現簽名
    if(typeof paramObjOrWidth_ === 'object') {
      this.width = paramObjOrWidth_.width;
      this.height = paramObjOrWidth_.height;
    } else {
      this.width = paramObjOrWidth_;
      this.height = height_;
    }
  }

  public getArea():number {
    return this.height * this.width;
  }
} 


let square = new Square(40,50);
let chartParamObj:type_ChartParam = {width: 50, height: 90 }
let square1 = new Square(chartParamObj);