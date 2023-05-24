
/**
 * 方法重載
 * 方法： 方法是一種特定場景下的函數，有對象變量【實例變量】直接調用的函數都是方法
 * 例：
 * 1. 函數內部用 this 定義的函數是方法
 * 2. TS 類中定義的函數是方法【TS 類中定義的方法就是編譯後 JS 底層 prototype 的一個函數】
 * 3. 接口內部定義的函數就是方法【注意：不是接口函數】
 * 4. type 內部定義的函數時方法 【注意：不是 type 函數】
 * 
 * 方法簽名： 方法簽名 =  方法名稱 + 方法參數 + 方法參數類型 + 返回值類型  四者合成。
 * 
 */

// 對現有的數組進行封裝
// 提供 get remove【重載】 顯示 方法

class ArrayList {
  // 引用屬性
  constructor(public element:Array<object>){

  }

  // 根據索引查詢元素
  get(index:number) {
    return this.element[index]
  }

  // 顯示
  show(){
    this.element.forEach((ele) => {
      console.log(ele)
    })
  }

  // 刪除
  // 如果地根據數字去刪除，返回一個數字
  remove(value:number): number
  // 如果根據對象去刪除，返回一個對象
  remove(vlaue:object): object 
  remove(value:number | object):number | object {
    this.element = this.element.filter((ele, index) => {
        if(typeof value === 'number') {
          return value !== index
        } else {
          return value !== ele
        }
    })
    return value;
  }
}

let sone = {stuname: 'wewe', age: 3}
let stwo = {stuname: 'we23 we', age: 33}
let sthree = {stuname: 'w34 ewer e', age: 63}

let arr  = new ArrayList([sone, stwo, sthree]);
arr.show()

// arr.remove(1)
// arr.show()