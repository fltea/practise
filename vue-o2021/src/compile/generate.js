 /**
  * 
  * render() {
  *  return _c('div', {id: app}, _v('hell'+_s(msg)))
  * }
  * _c 解析標簽
  * _v 解析文本
  */
function genPorps(attrs){
  let str = ''
  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    if(attr.name === 'style') {
      // let [key, val] = attr.value.aplit(';')
      let obj = {}
      attr.value.split(';').forEach(item => {
        let [key, val] = item.split(':');
        obj[key] = val;
      })
      attr.value = obj;
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0,-1)}}`
}

function genChildren(el) {
  const children = el.children;
  if(children) {
    const list = children.map(child => gen(child)).join(',')
    // console.log('genChildren', el, list)
    return list;
  }
}

const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{ xxx }}

function gen(node) {
  if(node.type === 1) {
    return generate(node);
  }

  // 文本
  const text = node.text;
  if(!defaultTagRE.test(text)) {
    return `_v(${JSON.stringify(text)})`
  }

  let tokens = []
  let lastIndex = defaultTagRE.lastIndex = 0
  let match
  while (match = defaultTagRE.exec(text)) {
    // console.log(match)
    let index = match.index
    if(index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)))
    }
    tokens.push(`_s(${match[1].trim()})`)
    lastIndex = index + match[0].length;
  }

  if(lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)))
  }
  return `_v(${tokens.join('+')})`
}

export function generate(el){
  // console.log(el)
  const children = genChildren(el);
  let code = `_c('${el.tag}', ${el.attrs.length ? genPorps(el.attrs) : 'undefined'}${children ? `,${children}` : ''})`
  // console.log(code)
  return code
}