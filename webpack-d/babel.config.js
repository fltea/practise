module.exports = {
  //  webpack 調用 babe-loader 時預先加載 plugins 
  plugins:[
    ['@babel/plugin-proposal-decorators', { legacy: true }]
  ]
}