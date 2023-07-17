export function patch(oldVnode, vnode) { 
  // console.log(oldVnode, vnode)
  // 創建真實 DOM
  const el = createEl(vnode);
  // console.log(el)

  const parentEl = oldVnode.parentNode
  parentEl.insertBefore(el, oldVnode.nextsibling);
  parentEl.removeChild(oldVnode);
  return el;
}

// tag, data, key, children, text
function createEl(vnode) {
  const {tag, data, key, children, text} = vnode

  if(typeof tag === 'string') {
    vnode.el = document.createElement(tag)
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