# hello-frontier
Demo: https://hello-frontier.herokuapp.com/home?page=1
### Project setup for development
```
docker-compose -f docker-compose-dev.yaml up -d --build

//serve in localhost:8081
```

### Compiles and minifies for production
```
docker-compose up -d
```

### Lints and fixes files
```
yarn lint
```
---
## 遇到的問題
### vue-cli使用tailwindcss
問題: Error: PostCSS plugin tailwindcss requires PostCSS 8
原因: 因為vue-cli的依賴是PostCSS 7，如果參考Tailwindcss Install Tailwind CSS with Vue 3 and Vite，就會遇到這個問題
解決方法: 先解除原本的套件，再安裝vue-cli-plugin-tailwind [1]
```
npm uninstall tailwindcss postcss autoprefixer
```
```
vue add tailwind 
```
### cors
原因: 基於同源政策，不能用ajax獲取跨來源資源
解決方法: 在vue.config.js設定devServer的proxy [2]
```javascript
//vue.config.js
module.exports = {
    devServer: {
        host: '127.0.0.1',
        port: 8081,
        proxy: {
            '/users': {
                target: "https://randomuser.me/api", //代表遠端API的網域路徑
                changeOrigin: true, //是否跨域
                pathRewrite: { // 把實際Request Url中的'/users'用""代替
                    '^/users': "" 
                }
            }
        }
    }
}
```
> devServer-proxy 只是一個暫時性的後端代理服務，僅在開發階段時有效。
因為我想將產品打包部署，有Demo網址，所以部屬至平台(Render Cloud Hosting for Developers)還是有cors的問題，一開始想用純前端的方式解決，就用CORS Anywhere套件，但是套件在2021年2月多了很多限制，試用還是沒有解決，看了Huli的文章，「大部分情形下，CORS 都不是前端的問題，純前端是解決不了的。」，於是寫node.js。[3]
### svg-sprite-loader使用
問題: 想乾淨的使用svg icon
解決: 使用svg-sprite-loader[4]

### 使用image部署
問題: 想打包專案的執行環境，所以選擇用docker image部署，將服務包成image後，不知道用哪個平台執行image
解決: 將image推到heroku server[6]

### 用docker執行專案，開發
問題: 不知道怎麼用同一個Dockerfile執行開發環境跟打包
解決: 使用multi-stage，及target參數 [8][9]

### docker執行vue開發環境，hot reload失效
```
// docker compose
environment: 
  - CHOKIDAR_USEPOLLING=true
```

### Reference
[1][vue cli use tailwindcss](https://stackoverflow.com/questions/64925926/error-postcss-plugin-tailwindcss-requires-postcss-8)

[2][重新認識Vue.js-vue-dev-server](https://book.vue.tw/CH3/3-3-vue-dev-server-build.html)

[3][CORS完全手冊](https://blog.huli.tw/2021/02/19/cors-guide-1/)

[4][vue-cli4使用svg-sprite-loader](https://www.jianshu.com/p/b20d9209b501)

[5][vue-node-api檔案結構/Dockerfile參考](https://github.com/johnpapa/heroes-vue-node-api)

[6][docker image deploy web application to heroku](https://medium.com/starbugs/deploy-any-web-application-to-heroku-with-docker-b64b9b0eb93)

[7][setting-the-port-for-node-js-server-on-heroku](https://stackoverflow.com/questions/28706180/setting-the-port-for-node-js-server-on-heroku)

[8][docker multistage-build](https://docs.docker.com/develop/develop-images/multistage-build/)

[9][multi-stage-build-in-docker-compose](https://stackoverflow.com/questions/53093487/multi-stage-build-in-docker-compose)

[10][docker-compose-hot-reloading-does-not-work-with-vuejs-app](https://stackoverflow.com/questions/59224130/docker-compose-hot-reloading-does-not-work-with-vuejs-app)

[][UI - list參考](https://tailwinduikit.com/components/webapp/table/list)

[][UI - card參考](https://www.pinterest.com/pin/711357703651909730/)

[][UI - pagination參考](https://ant.design/components/pagination/)

