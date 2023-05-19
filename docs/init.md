# 環境搭建

1. npm ini -y
    > 創建 package.json

2. npm i typscrpt -D
    > 安裝 typscript ， 如果自己本地環境可全局安裝

3. tsc --init
    > 創建 tsconfig.json

4. npm i ts-node -D
    > 讓 node 能直接運行 ts 代碼， 無需編譯

5. npm i nodemon -D
    > 自動檢測重啟工具

6. package 配置 自動重啟

    ``` js
    "scripts": {
      "dev": "nodemon --watch src/ -e ts --exec ts-node ./src/app.ts",
    },
    ```

7. Parcel 打包工具
    > npm i parcel-bundler -D

8. package 配置

    ``` js
    "scripts": {
      "start": "parcel ./index.html",
    },
    ```
