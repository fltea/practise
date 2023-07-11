import { ArrayMethods } from "./arr";

export function observer (data) {
  // console.log(data)

  if(typeof data !== 'object' || data === null) {
    return data;
  }

  return new Observer(data)
}

// Object.defineProperty 只能對單個屬性劫持

class Observer {
  constructor(value) {
    Object.defineProperty(value, '__ob__', {
      enumerable: false, // 不能枚舉
      value: this,
    })
    // console.log(value)
    // 遍歷
    if(Array.isArray(value)) {
      // console.log(value, 'is Array')
      value.__proto__ = ArrayMethods
      // 如果是數組對象
      this.observeArray(value);
    } else {
      this.walk(value)
    }
  }

  walk(data) {
    let keys = Object.keys(data)
    const len = keys.length;
    for (let i = 0; i < len; i++) {
      // 對每個屬性劫持
      const key = keys[i];
      let value = data[key];
      defineReactive(data, key, value)
    }
  }

  observeArray(data) {
    for (let i = 0; i < data.length; i++) {
      observer(data[i]);
    }
  }
}

function defineReactive(data, key, value) {
  // 遞歸 設置
  observer(value) // 深度代理
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      if(newValue === value) return;
      observer(newValue) 
      value = newValue;
    }
  })
}

//  data 劫持
//  對象 
// Object.defineProperty
// 遍歷
// 遞歸

//  數組
//  方法函數劫持，劫持數組方法 arr.push()
// 