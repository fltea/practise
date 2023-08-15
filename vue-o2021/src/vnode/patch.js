// export function patch(oldVnode, vnode) { 
//   // console.log(oldVnode, vnode)
//   // 創建真實 DOM
//   const el = createEl(vnode);
//   // console.log(el)

//   const parentEl = oldVnode.parentNode
//   parentEl.insertBefore(el, oldVnode.nextsibling);
//   parentEl.removeChild(oldVnode);
//   return el;
// }
export function patch(oldVnode, vnode) { 
  // 真實 DOM
  if(oldVnode.nodeType === 1) {
    // 創建真實 DOM
    const el = createEl(vnode);
    // console.log(el)
  
    const parentEl = oldVnode.parentNode
    parentEl.insertBefore(el, oldVnode.nextsibling);
    parentEl.removeChild(oldVnode);
    return el;
  } 
  // diff
  console.log(oldVnode, vnode)
  // 1. 標籤不一樣
  if(oldVnode.tag !== vnode.tag) {
    oldVnode.el.parentNode.replaceChild(createEl(vnode), oldVnode.el)
  }
  // 2. 標籤一樣
  if(!oldVnode.tag) {
    if(oldVnode.text !== vnode.text) {
      return oldVnode.el.textContent = vnode.text
    }
  }

  const el = vnode.el = oldVnode.el 
  updateProps(vnode, oldVnode.data)
  // childern diff
  let oldChildren = oldVnode.children || []
  let newChildren = vnode.children || []
  if(oldChildren.length && newChildren.length) {
    updateChild(oldChildren, newChildren, el)
  } else if(oldChildren.length) {
    el.innerHTML = ''
  } else if(newChildren.length) {
    for (let i = 0; i < newChildren.length; i++) {
      const child = newChildren[i];
      el.appendChild(createEl(child))
    }
  }
}

function isSomeVnode(oldChild, newChild) {
  return (oldChild.tag === newChild.tag) && (oldChild.key === newChild.key)
}

function makeIndexByKey(child){
  let map = {}
  child.forEach((item, index) => {
    if(item.key) {
      map[item.key] = index
    }
  })
  return map
}

function updateChild(oldChildren, newChildren, parent) {
  // vue diff 算法 做了很多優化
  // dom 中操作元素 常用的邏輯 尾部添加 頭部添加 倒序和正序的方法
  // vue 2 採用雙指針  
  //  1. 創建雙指針
  let oldStartIndex = 0
  let oldStartVnode = oldChildren[oldStartIndex]
  let oldEndIndex = oldChildren.length -1
  let oldEndVnode = oldChildren[oldEndIndex]
  
  let newStartIndex = 0
  let newStartVnode = newChildren[newStartIndex]
  let newEndIndex = newChildren.length -1
  let newEndVnode = newChildren[newEndIndex]

  let map = makeIndexByKey(oldChildren)

  while(oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    // 比對子元素
    // 是不是同一個元素
    if(isSomeVnode(oldStartVnode, newStartVnode)) {
      // 遞歸
      patch(oldStartVnode, newStartVnode)
      // 移動指針
      oldStartVnode = oldChildren[++oldStartIndex]
      newStartVnode = newChildren[++newStartIndex]
    } else if(isSomeVnode(oldEndVnode, newEndVnode)){
      // 遞歸
      patch(oldEndVnode, newEndVnode)
      // 移動指針
      oldEndVnode = oldChildren[--oldEndIndex]
      newEndVnode = newChildren[--newEndIndex]
    } else if(isSomeVnode(oldStartVnode, newEndVnode)) {
      // 遞歸
      patch(oldStartVnode, newEndVnode)
      // 移動指針
      oldStartVnode = oldChildren[++oldStartIndex]
      newEndVnode = newChildren[--newEndIndex]

    } else if(isSomeVnode(oldEndVnode, newStartVnode)) {
      // 遞歸
      patch(oldEndVnode, newStartVnode)
      // 移動指針
      oldEndVnode = oldChildren[--oldEndIndex]
      newStartVnode = newChildren[++newStartIndex]
    } else {
      // 暴力對比
      // 1. 創建舊元素映射表
      // 2. 舊元素中尋找元素
      let moveIndex = map[newStartVnode.key]
      if(moveIndex == undefined) {
        // 添加元素
        parent.insertBefore(createEl(newEndVnode), oldStartVnode.el)
      } else {
        // 獲取移動的元素
        let moveVnode = oldChildren[moveIndex]
        // 防止數組塌陷
        oldChildren[moveIndex] = null;
        // 插入元素
        parent.insertBefore(moveVnode.el, oldStartVnode.el)
        // 遞歸內容
        patch(moveVnode, newStartVnode)
      }
      // 新的指針位移
      newStartVnode = newChildren[++newStartIndex]
    }

    // 面試題： 為什麼要添加 key ，這個 key 不能是索引
  }

  //  2. 添加多餘的子元素
  if(newStartIndex <= newEndIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      parent.appendChild(createEl(newChildren[i]))
    }
  }

  //  3. 刪除多餘元素
  if(oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      let child = oldChildren[i]
      if(child) {
        parent.removeChild(child.el)
      }
    }
  }

}

// 添加屬性
function updateProps(vnode, oldProps = {}) {
  let newProps = vnode.data || {}
  let el = vnode.el
  for(let key in oldProps) {
    if(!newProps[key]) {
      el.removeAttribute(key)
    }
  }

  let newStyle = newProps.style || {}
  let oldStyle = oldProps.style || {}
  for(let key in oldStyle) {
    if(!newStyle[key]) {
      el.style[key] = ''
    }
  }


  for(let key in newProps) {
     if(key === 'style') {
      for (const styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName]
      }
     } else if (key === 'class') {
      el.className = newProps.class
     } else {
      el.setAttribute(key, newProps[key])
     }
  }
}

// tag, data, key, children, text
export function createEl(vnode) {
  const {tag, data, key, children, text} = vnode

  if(typeof tag === 'string') {
    vnode.el = document.createElement(tag)
    updateProps(vnode)
    if(children.length > 0) {
      children.forEach(child => {
        vnode.el.appendChild(createEl(child))
      })
    }
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el
}

// 渲染流程 ： 數據初始化 => 模板編譯 => 變成 render 函數 => 通過 render 函數變成 vnode =>  vnode 變成真實 DOM =>  放到頁面