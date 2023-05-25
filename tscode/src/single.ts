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

  // 靜態方法不可以訪問實例屬性或實例方法【對象屬性】
  // 靜態屬性和對象屬性是類中兩大屬性
  static localstorage: MyLocalStorage

  private constructor(){
    console.log('這是TS的單間設計模式的靜態方法的構造器');
  }

  // 提供一個外部訪問的方法
  // 通過這個方法來提供外部得到一個對象的方法

  // 1. 帶 static 關鍵字的方法就是一個靜態方法
  // 2. 靜態方法和對象無關，外部的對象變量不能調用靜態方法和靜態屬性
  // 3. 外部可以通過類目來調用
  

  public static getInstance() {
    // 重複 new  不是單件
    // return new MyLocalStorage();

    // 局部變量解決 失敗
    // let localstorage
    // if(!localstorage) { // undefined null 0 false
    //   localstorage =  new MyLocalStorage();
    // }
    // return localstorage;

    if(!this.localstorage) {
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