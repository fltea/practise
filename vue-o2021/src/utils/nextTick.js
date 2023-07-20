let callback = []
let pending = false

function flush (){
  callback.forEach(cb => cb())
  pending= false;
}

let timerFunc
// 處理兼容性
if(Promise) {
  timerFunc = () => {
    Promise.resolve().then(flush);
  }
} else if(MutationObserver) { // h5 異步 監聽 DOM 變化，渲染完畢後再執行
  let obseerve = new MutationObserver(flush);
  let textNode = document.createTextNode(1);
  obseerve.observe(textNode, { characterData: true }) // 觀測文本變化
  timerFunc = () => {
    textNode.textContent = 2
  }
} else if (setImmediate) { //ie
  timerFunc = () => {
    setImmediate(flush)
  }
}

export function nextTick(cb) {
  // console.log('cb',cb)
  callback.push(cb)
  if(!pending) {
    timerFunc();
    pending= true;
  }
}