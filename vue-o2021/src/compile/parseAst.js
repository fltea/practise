// ast 語法樹 {}       vnode 虛擬 DOM {}
/**
 * {
 * 
 * tag: 'div',
 * attrs: [{id: 'app'}]
 * children: [{ tag: '', text: 'hello' }]
 * 
 * }
 * 
 *  */ 

// 規則
const ncname = '[a-zA-Z_][\\-\\.0-9_a-zA-Z]*'; // 標籤名稱
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //<span:xx>
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 標簽開頭  捕獲的內容是標簽名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 標籤結尾 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>]+)))?/;
const startTagClose = /^\s*(\/?)>/; // 匹配標簽結束的 > 
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // {{ xxx }}

// 遍歷

// 創建 Ast 對象
function createASTElement(tag, attrs) {
  return {
    tag,
    attrs,
    children: [],
    type: 1,
    parent: null,
  }
}

// 是否根元素
let root 
// 當前元素的母類
let createParent
// 數據結構 棧
let stack = []

// 開始標簽
function start(tag, attrs) {
  // console.log(tag, attrs, '開始標簽')
  const element = createASTElement(tag, attrs);
  if(!root) {
    root = element
  }
  createParent = element
  stack.push(element)
}
// 文本
function charts(text) {
  // console.log(text, '文本')
  text = text.replace(/\s/g,'');
  if(text) {
    createParent.children.push({
      type: 3,
      text,
    })
  }
}
// 結束標籤
function end(tag) {
  // console.log(tag, '結束標籤')
  const element = stack.pop();
  createParent = stack[stack.length - 1];
  if(createParent) {
    element.parent = createParent.tag;
    createParent.children.push(element);
  }
}

export function parseHTML(html){
  while(html) {
    // 判斷標簽 <>
    let textEnd = html.indexOf('<')
    // 標籤
    if(textEnd === 0) {
      // 開始
      const startTagMatch = parseStartTag();
      if(startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }

      // 結束
      const endTagMatch = html.match(endTag)
      if(endTagMatch) {
        advance(endTagMatch[0].length);
        end(endTagMatch[1]);
        continue;
      }
    }
    // 文本
    let text
    if(textEnd > 0) {
      text = html.substring(0, textEnd)
    } 
    if(text) {
      advance(text.length)
      charts(text)
    }
    // break;
  }

  function parseStartTag() {

    const start = html.match(startTagOpen);
    if(!start) {
      return null;
    }
    // console.log(start)

    // 創建 ast 語法樹
    let match = {
      tagName: start[1],
      attrs: []
    }

    // 刪除開始標籤
    advance(start[0].length)

    // 屬性 （多個）需要遍曆
    let attr

    // 注意標籤結束 > 
    let end
    while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
      // console.log(attr)
      match.attrs.push({
        name: attr[1],
        value: attr[3] || attr[4] || attr[5],
      })
      advance(attr[0].length)
    }

    if(end) {
      advance(end[0].length)
    }
    // console.log(match)
    return match;
  }

  function advance(n){
    html = html.substring(n)
    // console.log(html)
  }

  return root;
}