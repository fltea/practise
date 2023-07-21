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

  const el = vnode.el  = oldVnode.el 
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

function updateChild(oldChildren, newChildren, el) {
  // 
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