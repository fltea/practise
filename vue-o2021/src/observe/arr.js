// export function 

// 重寫數組

// 獲取原來的數組方法
let oldArrayProtoMethods = Array.prototype;

// 繼承
export let ArrayMethods = Object.create(oldArrayProtoMethods)

// 劫持

let methods = ['push', 'pop', 'unshift', 'shift', 'splice']

methods.forEach(item => {
  ArrayMethods[item] = function (...args) {
    // console.log('數組劫持')
    let result = oldArrayProtoMethods[item].apply(this, args)
    // console.log('數組劫持 args:', args)
    // 數組追加對象 push unshift 
    let inserted
    switch(item) {
      case 'push': 
      case 'unshift': 
        inserted = args;
        break;
      case 'splice': 
        inserted = args.splice(2); 
        break;
    }
    // console.log('數組劫持 this:', this)
    let ob = this.__ob__;
    if(inserted) {
      // 對添加的對象進行劫持
      ob.observeArray(inserted)
    }
    return result;
  }
})