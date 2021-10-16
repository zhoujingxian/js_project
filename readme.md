# 药房网商城
药房网商城是一家正规的网上药店、网上药房及网上购药网站,找药房网、网上药店、网上药房、购药网站及网上买药平台就上药房网商城,让你买药放心,用药安心。

## 环境搭建
1. Node 14或以上版本
   - 使用的第三方node模块请查阅package.json
2. jQuery 2.0以上版本
   - 仅使用jQuery的load方法动态加载html，JS代码纯原生
3. require 第三方模块化

## 安装步骤

clone这个地址：`https://github.com/zhoujingxian/yfw.git`

## 快速入门
使用node启动app.js,访问本地3000端口的html文件

## 页面
1. 首页：`http://localhost:3000/index.html`
2. 主页：`http://localhost:3000/register.html`
3. 登录：`http://localhost:3000/login.html`
4. 商品列表页：`http://localhost:3000/list_page.html`
   - 首页点击三级菜单"全部商品分类"进入列表页
5. 商品详情页：`http://localhost:3000/detail_page.html`
   - 此页面无法直接访问，需在列表页中点击商品进入详情页
6. 购物车页面：`http://localhost:3000/cart.html`
   - 购物车须在登录后访问，并在登录时读取并显示用户购物车信息
7. 个人中心：`http://localhost:3000/personal_center.html`
   - 登录后点击个人中心进入，可修改密码、查看历史浏览记录

## 功能实现
1. 首页
   - 轮播图
   - 三级菜单
   - 选项卡
   - 搜索下拉菜单（使用`jsonp`跨域请求）
   - 楼层跳转（BUG:跳转过程中使用鼠标滚轮使动画无法停止）
2. 列表页
   - 分页功能
3. 详情页
   - 放大镜
4. 购物车
   - 登录守卫（未登录时无法访问）
   - 商品的增、删、改、查、价格合计、小计、数量实时显示
5. 个人中心
   - 密码修改
   - 历史浏览记录

## 模块化和SASS源文件
1. 模块化
   - modules/*
2. SASS
   - sass

## 项目目录

- /databases
- /dist
- /node_modules
- /www
  - images
  - js
  - libs
  - modules
  - public
  - sass
- package.json
- app.js
- gulpfile.js
- .gitignore
- redeme.md

## 如何参与开源项目
贡献使开源社区成为一个学习、激励和创造的绝佳场所。你所作的任何贡献都是非常感谢的。

1. Fork这个项目
创建您的单独分支 (git checkout -b feature/AmazingFeature)
2. 提交您的更改 (git commit -m 'Add some AmazingFeature')
3. 上传到您的分支中 (git push origin feature/AmazingFeature)
4. 打开拉去请求
   
## 版本控制
该项目使用Git进行版本管理。您可以在repository参看当前可用版本。

## 作者
zhoujingxian0302@163.com

## 结语
这个本人第一次做一个较为完整的项目，在做项目的过程中发现自已的经验不足，开始写项目之前没有一个很好的规划，代码编写过于凌乱，很多功能都是想到就往里加。希望之后的学习中能够做到更好。