import { generate } from "./generate";
import { parseHTML } from "./parseAst";

export function compileToFunction(el) {
  console.log(el)

  // 將 html 變成 AST 語法樹
  const ast = parseHTML(el);
  // console.log(ast)

  // AST 語法樹 變成字符串 變成函數
  //  _c _v _s
  const code  = generate(ast)
  // console.log(code)

  // 將字符串變成函數
  const render = new Function(`with(this) {return ${code}}`)
  // console.log(render)

  return render;
}
