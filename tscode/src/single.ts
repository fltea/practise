/**
 * 設計模式 ： 一種更好的編寫代碼方案。
 * 常見設計模式：單件設計模式、簡單工廠設計模式、工廠方法、抽象工廠設計模式、觀察者設計模式、裝飾設計模式、代理設計模式、MVC、MVP、MVVM架構設計模式。
 * 
 * 單件設計模式
 * 簡明定義：1. 一個類對外有且僅有一個實例【只提供一個實例】，這種編碼方案就是單件設計模式。
 * 完整定義：1. 如果某個類對外始終只提供一個對象【實例】，並且在該類的內部提供了一個外部訪問對象的方法或者對象屬性，那麼這種編寫代碼方案【就是設計模式】就是單件設計模式。
 * 完整定義：2. 如果一個類的任何外部通過訪問類提供的某個方法或某個屬性只能獲取該類一個對象【實例】，但如果該類提供了多個外部可以訪問的方法或屬性，那麼外部就能訪問到該類的多個不同的對象，但從實際開發來看，絕大多數情況的應用場景，我們對外都只提供一個唯一的可以訪問的方法或屬性，這樣就保證了實例為單個，類的這種編寫代碼的方案【就是設計模式】就是單間設計模式。
 * 
 * 實際開發中，外部訪問某個類的對象【實例】時，確保只能訪問該類的唯一對象時才能保證邏輯的正確性時，就應該使用單件設計模式了。
 * 
 * 
 */

// Test StorageNoClass 
// 代碼零散
// 可讀性差
// 影響後期維護
// 重復代碼多
// localStorage.setItem('count', '30');

// let User = { Usernam: '是的撒的', age : 2323 }
// localStorage.setItem('loginUser', JSON.stringify(User));

// let value = localStorage.getItem('loginUser')
// value = value != null ? JSON.parse(value) : null

// export default class MyLocalStorage {
//   public setItem(key:string, value: any) {
//     localStorage.setItem(key, JSON.stringify(value));
//   }

//   public getItem(key: string) {
//     let value = localStorage.getItem(key)
//     return  value != null ? JSON.parse(value) : null
//   }
// }

/**
 * 單件設計模式
 * 
 * 1. 把構造器設置為私有的，不允許外部來創建類的實例
 * 2. 至少應該一個外部訪問的方法或屬性，外部可以通過這個方法或屬性來得到
 * 
 */
export default class MyLocalStorage {
  // 靜態成員 = 靜態方法 + 靜態屬性 
  // 靜態成員與對象無關

  // 靜態方法不可以訪問實例屬性或實例方法【對象屬性】
  // 靜態屬性和對象屬性是類中兩大屬性
  static localstorage: MyLocalStorage // 靜態引用屬性
  static count: number = 3; // 靜態基本類型屬性
  // static 限制外部是否能訪問
  // 任何一個 TS 類中的靜態成員存儲在內存的靜態區，
  // 運行一個 TS 類，TS 首先回位靜態成員開劈內存空間，靜態成員的內存空間分配的時間要早於對象空間的分配，也就是任何一個對象創建之前 TS 就已經為靜態成員分配好了空間
  // 但一個靜態方法只會分配一個空間，只要當前服務器不重啟或控制台程序還沒有結束之前【如果是開發期間臨時測試，一般用控制台】，
  // 那麼靜態方法就一直存在內存空間，無論調用多少次這個靜態方法，都是調用的同一塊空間。

  // 靜態

  private constructor() {
    console.log('這是TS的單間設計模式的靜態方法的構造器');
  }

  // 提供一個外部訪問的方法
  // 通過這個方法來提供外部得到一個對象的方法

  // 1. 帶 static 關鍵字的方法就是一個靜態方法
  // 2. 靜態方法和對象無關，外部的對象變量不能調用靜態方法和靜態屬性
  // 3. 外部可以通過類目來調用
  
  /**
   * 靜態方法或屬性 和圓形對象空間上的 方法和屬性 區別
   * 1. 原型對象空間上的方法和屬性用來提供給該類的所有對象變量共用的方法和屬性，沒有對象和對象變量，原型上的屬性和方法就沒有了用武之地
   * 2. 靜態方法或靜態屬性屬於類，可以直接通過類來訪問
   * 3. 任何一個對象創建之前 TS 就已經為靜態成員分配好了空間
   * 4. 一個靜態方法或靜態屬性只會分配一個空間，每一個對象都有自己的空間
   * 
   * 
   * 靜態方法可以接受一個對象變量來作為方法的參數
   * 1. 靜態方法內部不能通過 this 來訪問對象屬性和方法 
   * 2. 可以通過調用靜態方法把對象變量傳遞給靜態方法使用
   * 例： js 的 Object 想象成一個 TS 類【實際 TS 編譯之後的 JS 文件中就變成了一個構造函數】
   *      Object 類中存在大量靜態方法： apply call bind keys ...
   *     【keys 獲取給定對象的自身可枚舉屬性組成的數組】
   * 
   */

  // keys 例
  // let obj = new Object({username: 'erer', age: 23}) 
  // let obj2 = {username: 'erer', age: 23} // 簡寫 
  // console.log(Object.keys(obj2))


  /**
   * 何時定義靜態屬性？
   * 1. 單件設計模式 
   * 2. 類中某個方法沒有任何必要使用任何對象屬性時，而且使用了對象屬性反而讓這個方法的邏輯不正確，那麼就應該禁止這個方法訪問任何屬性和其他其他的對象方法，這時就應該把這個方法定義為靜態方法
   * 3. 當一個類中某個方法只有一個或者1-2個對象屬性，而且更重要的是，創建這個類的對象毫無意義，只需要使用這個類的一個或多方法就可以了，那麼這個方法就應該定義為靜態方法。
   *    常見的工具類中的方法通常都應該定義為靜態方法，比如 StringUtil FileUtil 等。
   */
  // FileUtil 例

  public static getInstance() {
    // 重複 new  不是單件
    // return new MyLocalStorage();

    // 局部變量解決 失敗
    // let localstorage
    // if(!localstorage) { // undefined null 0 false
    //   localstorage =  new MyLocalStorage();
    // }
    // return localstorage;

    // 靜態方法不能訪問類中原型對象上的方法或者對象屬性【對象基本類型屬性 + 對象引用屬性】，反之亦然
    // Error: 类型“typeof MyLocalStorage”上不存在属性“getItem”。
    // this.getItem()

    // 懶式單件設計模式： 真正用到類的實例才創建這個唯一的對象
    // 靜態方法調用靜態屬性
    if(!this.localstorage) {
      // 一個靜態方法改變了某個靜態屬性，其他靜態方法或類外部任何地方訪問這個屬性都會發生改變。
      this.localstorage =  new MyLocalStorage();
    }
    return this.localstorage;
  }

  public setItem(key:string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string) {
    let value = localStorage.getItem(key)
    return  value != null ? JSON.parse(value) : null
  }
}

// TS 屏蔽了 new 一個類中的方法
// Error: 其目标缺少构造签名的 "new" 表达式隐式具有 "any" 类型。
// let oo = new MyLocalStorage.getInstance();

// 只能覆蓋原有的函數，不能新增函數
// Error: 类型“MyLocalStorage”上不存在属性“vv”。
// MyLocalStorage.prototype.vv = function(){}