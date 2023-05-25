import MyLocalStorage from "./single";

// let myLocalStorage = new MyLocalStorage();
let myLocalStorage = MyLocalStorage.getInstance();
myLocalStorage.setItem('loginUser', { Usernam: '是的撒的', age : 2323 });