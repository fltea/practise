import MyLocalStorage from "./single";

// let myLocalStorage = new MyLocalStorage();
let myLocalStorage = MyLocalStorage.getInstance();
myLocalStorage.setItem('loginUser', { Usernam: '是的撒的', age : 2323 });
// 外部調用 TS 類的靜態成員
// MyLocalStorage.count