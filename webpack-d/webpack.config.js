const path = require('path')

const HtmlPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlPlugin({
  template: './src/index.html',
  filename: 'index.html'
})

// remove all files inside webpack's output.path directory
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // 開發調試階段建議 
  // eval-source-map 顯示源碼 行號
  // 生產環境 建議 關閉 source map 或
  // nosources-source-map 顯示行號 不顯示源碼
  devtool: 'nosources-source-map',
  // 運行模式 可選值： development production
  // development 速度快 體積大
  // production 速度慢 體積小
  mode: 'development',
  // 指定入口文件
  entry: path.join(__dirname, './src/index.js'),
  // 指定輸出文件
  output: {
    // 路徑
    path: path.join(__dirname, 'dist'),
    // 文件名
    filename: 'js/bundle.js'
  },
  plugins:[
    htmlPlugin,
    new CleanWebpackPlugin()
  ],
  devServer: {
    // 打包成功後自動打開瀏覽器
    open: true,
    host: '192.168.3.218',
    port: 9899
  },
  // 第三方文件模塊的匹配規則
  module: {
    // 文件後綴名的匹配規則
    rules: [
      // 文件類型                loader
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      // 單個 loader 可以用字符串  小於等於 limit 轉 base64
      { test: /\.jpg|png|gif$/, use: 'url-loader?limit=470&ouput=images' },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  }
}