# VUE

模塊化：JS CSS 資源
組件化：複用 UI 機構、樣式、行為
規範化：目錄結構的劃分 編碼規范化 接口規範化 文檔規范化 git 分支管理
自動化：自動化構建 自動部署 自動化測試

grunt
gulp

parcel
webpack

## webpack

前端工程化的具體解決方案（模塊化開發、代碼壓縮混淆、 JS 兼容性、 性能優化）

``` shell
npm install webpack webpack-cli -D
```

### webpack 配置 webpack.config.js

**mode** : development/production

webpack 4.x 和 5.x 默認配置
輸入文件： src -> index.js
輸出文件： dist -> main.js

**插件自動刷新頁面**:
npm install webpack-dev-server html-webpack-plugin -D  

``` json
  "scripts": {
    "dev": "webpack serve"
  },

```

``` js
const HtmlPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlPlugin({
  template: './src/index.html',
  filename: 'index.html'
})

...
plugins:[htmlPlugin],
...

```

**devServer**: server 配置，打包後打開瀏覽器

**loader**：webpack 默認只能打包處理 js 後綴結尾的模塊。其他非 .js 後綴結尾的模塊 webpack 默認處理不了，需要調用 loader 加載器才可以正常打包，否則報錯！
**loader**: 按順序( cssloader -> styleloader )處理文件後合並到打包文件 js 裡。

> css  

ERROR in ./src/index.css 1:3
Module parse failed: Unexpected token (1:3)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
\> li {
|   list-style: none;
| }
 @ ./src/index.js 3:0-20

npm install style-loader@3.0.0 css-loader@5.2.6 -D  

``` js

  // 第三方文件模塊的匹配規則
  module: {
    // 文件後綴名的匹配規則
    rules: [
      // 文件類型                loader
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  }

```

> less

npm i  less-loader@10.0.1 less@4.1.1 -D

> image

ERROR in ./src/img/ethical declarations.jpg 1:0
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
(Source code omitted for this binary file)
 @ ./src/index.js 7:0-48 8:25-28

npm install url-loader@4.1.1 file-loader@6.2.0 -D

> 新語法特性

npm i babel-loader@8.2.2 @babel/core@7.14.6 @babel/plugin-proposal-decorators@7.14.5 -D


