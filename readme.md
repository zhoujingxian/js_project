# 一、药房网商城项目介绍

1. 药房网商城的演示项目
2. 使用node为服务器语言
3. 使用json文件模拟数据库
4. 使用git管理项目
5. 使用sass编写css
6. 使用node环境下的gulp编译sass

# 二、项目目录

- /databases
- /dist
- /node_modules
- /www
- .gitignore
- app.js
- gulpfile.js
- package.json
- redeme.md

# 三、gulp环境搭建

1. 使用npm init 初始化项目
2. 下载gulp
3. 下载gulp-sass和sass
4. 在gulpfile.js中配置sass的编译环境
5. 在gulpfile.js中配置js的编译环境
6. 在gulpfile.js中配置html的编译环境
7. 在gulpfile.js中配置图片的编译环境
8. 在gulpfile.js中配置modules的编译环境

# 四、git环境配置

1. 初始化git版本库：git init
2. 配置项目级用户信息
3. 配置.gitignore文件，设置要忽略的文件内容

# 五、服务器环境 - node

1. 使用原生node自己搭建服务器
2. 处理静态资源目录（dist）
   - http://localhost:3000/xxx/xxx.xxx
   - pathname中非api
3. 定义数据接口（设定路由）
   - 注册：http://localhost:3000/api?type=register
   - 登录：http://localhost:3000/api?type=login
   - 获取商品信息：http://localhost:3000/api?type=getGoods
   - 问诊医生信息：http://localhost:3000/api?type=zxwz
   - 推荐商家：http://localhost:3000/api?type=merchant
   - 新闻：http://localhost:3000/api?type=news



