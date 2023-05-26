/**
 * 餓式單件設計模式
 * 
 * 1. 把構造器設置為私有，不允許外部來創建類的實例【對象】
 * 2. 建立一個靜態引用屬性，同時把這個靜態引用屬性直接指向一個對象【 new 實例 】
 * 3. 外部調用提供的靜態方法來獲取一個對象
 * 
 */

export default class MyLocalStorage {
  static localstorage: MyLocalStorage  = new MyLocalStorage() // 靜態引用屬性

  private constructor() {
    console.log('這是TS的單間設計模式的靜態方法的構造器');
  }

  public static getInstance() {
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