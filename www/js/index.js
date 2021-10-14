;
(function () {
    "use strict"

    class Pharmacy {
        constructor() {
            this.banMain = document.querySelector('.banner');
            this.banImg = document.querySelector('.banner .banner_img')
            this.ban = document.querySelector(".banner_img .ban_img");
            this.btn_ban_left = document.querySelector(".banner_img .btn_left");
            this.btn_ban_right = document.querySelector(".banner_img .btn_right");
            this.oXsg = document.querySelector(".xsg_cont ul");
            this.oZxwzUl = document.querySelector('.zxwz_cont .zc_left')
            this.oZxwzNav = Array.from(document.querySelectorAll('.zxwz .nav_title>li'));
            this.oProDiv = Array.from(document.querySelectorAll('.product>div'));
            this.oProduct = document.querySelector(".product");
            this.oMoreUl = document.querySelector(".content_more ul");
            this.newsUl = document.querySelector('.news_bottom')
            this.readUl = document.querySelector('.read_bottom')
            this.evaUl = document.querySelector('.eva_bottom')
            this.oLink = document.getElementsByClassName('links_friend');
            this.oLinkBtn = Array.from(document.querySelectorAll(".links_header li"));
            this.oFloor = document.querySelector('.floor')
            this.oFloorLi = Array.from(document.querySelectorAll('.floor li'));
            this.oBack = document.querySelector('.back')
            this.bannerPrev = 0;
            this.bannerIndex = 0;
            this.menuPrev = 0;
            this.zxwzType = "internist";
            this.zxwzPrev = 0;
            this.productPrev = [0, 0, 0, 0, 0];
            this.evaPrev = 0;
            this.linkPrev = 0;
            this.floorPrev = 0;

            this.f = ["family", "health", "famliy", "rare", "cosm"];
            this.url = "http://localhost:3000/api";

            this.addEvent();
            this.init();
        }
        addEvent() {
            const that = this;
            // 在线问诊导航栏
            this.oZxwzNav.forEach((value, index) => {
                value.onmouseenter = function () {
                    that.zxwzNav(value, index);
                }
            })

            // 产品的分类切换
            document.onmouseover = function (eve) {
                const e = eve || window.event;
                const target = e.target || e.srcEvent;
                if (target.getAttribute("my_title") === "product") {
                    that.productChange(target);
                }
            }

            // 轮播图
            this.btn_ban_left.onclick = function () {
                that.banner_left()
            }
            this.btn_ban_right.onclick = function () {
                that.banner_right()
            }
            this.banImg.onmouseover = function () {
                that.stopInterval();
            }
            this.banImg.onmouseout = function () {
                that.bannerTime();
            }

            // 底部链接
            this.oLinkBtn.forEach((value, index) => {
                value.onmouseenter = function () {
                    that.linkEnter(value, index)
                }
            })

            // 楼层跳转
            document.onscroll = function () {
                that.floorShow();
                that.backShow();
            }
            this.oFloorLi.forEach((value, index) => {
                value.onclick = function () {
                    that.floorClick(value, index);
                }
            })

            this.oBack.onclick = function () {
                that.backTop();
            }
        }
        init() {
            this.xsg();
            this.zxwz();
            this.product();
            this.more();
            this.banner();
            this.bannerTime();
            this.news();
            this.read();
            this.eva();
            this.link();
            this.floorInit();
        }
        backTop() {
            move(document.documentElement, {
                scrollTop: 0
            })
        }
        backShow() {
            let scr = document.documentElement.scrollTop;
            if (scr > 1800) {
                this.oBack.style.display = "block"
            } else {
                this.oBack.style.display = "none"
            }
        }
        floorInit() {
            this.floorShow()
        }
        // 点击楼层切换
        floorClick(value, index) {
            move(document.documentElement, {
                scrollTop: this.oProduct.children[index].offsetTop + this.oProduct.children[index].offsetHeight
            })
        }

        // 楼层显示
        floorShow() {
            let scr = document.documentElement.scrollTop;
            const child = this.oProduct.children;
            if (scr >= child[0].offsetTop && scr <= child[child.length - 1].offsetTop + child[0].offsetHeight * 2) {
                this.oFloor.style.opacity = 1;
            } else {
                this.oFloor.style.opacity = 0;
            }
            for (let i = 0; i < this.oProduct.children.length; i++) {
                if (this.oProduct.children[i].offsetTop + this.oProduct.children[i].offsetHeight * 7 / 4 > scr) {
                    this.oFloorLi[this.floorPrev].className = ""
                    this.oFloorLi[i].className = "floor_change";
                    this.floorPrev = i;
                    break;
                }
            }

        }
        // 友情链接
        link() {
            ajax({
                url: this.url,
                data: {
                    type: "link"
                },
                success: res => {
                    if (res.code) {
                        console.log(res.title)
                    } else {
                        console.log(res.title);
                        this.linkInit(res.data);
                    }
                }
            })
        }
        linkInit(data) {
            Array.from(this.oLink).forEach((value, index) => {
                if (data[index].data.length > 30) {
                    this.linkSelect(value, data[index].data.slice(0, 29), 1)
                } else {
                    this.linkSelect(value, data[index].data, 0)
                }
            })

        }
        linkSelect(value, data, sign) {
            let str = "";
            for (let i of data) {
                str += `<a href="">${i}</a>`
            }
            if (sign) {
                str += `<a href="">查看更多</a>`
            }
            value.innerHTML = str;
        }
        linkEnter(value, index) {
            this.oLinkBtn[this.linkPrev].className = "";
            value.className = "lh_change";
            this.oLink[this.linkPrev].style.display = "none"
            this.oLink[index].style.display = "block";
            this.linkPrev = index;
        }
        // 最新资讯
        news() {
            ajax({
                url: this.url,
                data: {
                    type: "news"
                },
                success: res => {
                    if (res.code) {
                        console.log(res.title)
                    } else {
                        console.log(res.title);
                        this.newsSelect(res.data);
                    }
                }
            })
        }
        newsSelect(data) {
            let str = `<li><a href=""><b>【${data[0].title}】</b>${data[0].name}</a><p>${data[0].p}</p></li>`;

            for (let i = 1; i < data.length; i++) {
                str += `<li><a href=""><b>【${data[i].title}】</b>${data[i].name}</a></li>`
            }
            this.newsUl.innerHTML = str;
        }

        // 阅读排行
        read() {
            ajax({
                url: this.url,
                data: {
                    type: "read"
                },
                success: res => {
                    if (res.code) {
                        console.log(res.title);
                    } else {
                        console.log(res.title);
                        this.readSelect(res.data);
                    }
                }
            })
        }
        readSelect(data) {
            let str = ` <li><a href=""><em>1</em><b>【${data[0].title}】</b>${data[0].name}}</a><p>${data[0].p}</p></li>`
            for (let i = 1; i < 3; i++) {
                str += `<li><a href=""><em>${i+1}</em><b>【${data[i].title}】</b>${data[i].name}</a></li>`
            }
            for (let i = 3; i < data.length; i++) {
                str += `<li><a href=""><b>【${data[i].title}】</b>${data[i].name}</a></li>`
            }
            this.readUl.innerHTML = str;
        }
        // 最新评价
        eva() {
            ajax({
                url: this.url,
                data: {
                    type: "eva"
                },
                success: res => {
                    if (res.code) {
                        console.log(res.title)
                    } else {
                        console.log(res.title);
                        this.evaSelect(res.data);
                    }
                }
            })
        }
        evaSelect(data) {
            let str = "";
            for (let i of data) {
                str += ` <li class="clearfix">
                <div class="eva_left">
                    <img src="${i.img}" alt="">
                    <p class="eva_id">${i.name.replace(/(?<=[\w]|[\u4e00-\u9fff]{1})([\w]|[\u4e00-\u9fff])*(?=[\w]|[\u4e00-\u9fff]{1})/, "***")}</p>
                </div>
                <div class="eva_right">${i.content}</div>
            </li>`
            }
            for (let i = 0; i < 2; i++) {
                str += ` <li class="clearfix">
                <div class="eva_left">
                    <img src="${data[i].img}" alt="">
                    <p class="eva_id">${data[i].name.replace(/(?<=[\w]|[\u4e00-\u9fff]{1})([\w]|[\u4e00-\u9fff])*(?=[\w]|[\u4e00-\u9fff]{1})/, "***")}</p>
                </div>
                <div class="eva_right">${data[i].content}</div>
            </li>`
            }
            this.evaUl.innerHTML = str;
            this.evaMove()
        }
        evaMove() {
            let num = 0;
            setInterval(() => {
                if (num === -678) {
                    this.evaUl.style.top = "0"
                    num = -226;
                } else {
                    num -= 226;
                }
                this.evaInit(num);
            }, 3000)

        }
        evaInit(num) {
            move(this.evaUl, {
                top: num
            })
        }
        // 轮播图
        banner() {
            ajax({
                url: this.url,
                data: {
                    type: "banner"
                },
                success: res => {
                    if (res.code) {
                        console.log(res.title)
                    } else {
                        console.log(res.title);
                        this.banData = res.data;
                        this.banSelect();
                    }
                }
            })
        }
        banSelect() {
            let str = "";
            for (let i of this.banData) {
                str += `<a href=""><img src="./images/index/${i.img}" alt=""></a>`
            }

            this.ban.innerHTML = str;

            this.banner_img = this.ban.children;
            this.banner_init();
        }
        banner_init() {
            for (let i = 1; i < this.banner_img.length; i++) {
                this.banner_img[i].style.left = "100%"
            }
        }
        banner_right() {
            let i;
            if (this.bannerPrev === this.banner_img.length - 1) {
                i = 0;
            } else {
                i = this.bannerPrev + 1;
            }
            this.banner_img[i].style.left = "100%"

            this.banner_move(i, 1)
        }
        banner_left() {
            let i;
            if (this.bannerPrev === 0) {
                i = this.banner_img.length - 1
            } else {
                i = this.bannerPrev - 1;
            }
            this.banner_img[i].style.left = "-100%";

            this.banner_move(i, -1)
        }
        banner_move(i, n) {
            move(this.banner_img[this.bannerPrev], {
                left: n * -parseInt(getStyle(this.banner_img[0], "width"))
            })
            move(this.banner_img[i], {
                left: 0
            })
            this.banMain.style.background = this.banData[i].color;
            this.bannerPrev = i;
        }
        bannerTime() {
            this.t = setInterval(() => {
                this.banner_right();
            }, 2000)
        }
        stopInterval() {
            clearInterval(this.t);
        }


        // 限时购
        xsg() {
            ajax({
                url: this.url,
                data: {
                    type: "xsg"
                },
                success: res => {
                    if (res.code) {
                        console.log(res.title)
                    } else {
                        console.log(res.title)
                        this.xsgSelect(res.data);
                    }
                }
            })
        }
        xsgSelect(data) {
            let str = "";
            for (let i of data) {
                str += `<li><a href="./detail_page.html?id=${i.ID}"><div><img src="./images/detail/${i.imgM}m${0}.jpg" alt=""></div><h3>${i.name}</h3><div class="cont_spec">${i.specification}</div><div class="cont_pri">${i.price}</div></a></li>`
            }
            this.oXsg.innerHTML = str;
            this.oProLi = Array.from(this.oXsg.children);
        }

        // 在线问诊
        zxwz() {
            ajax({
                url: this.url,
                data: {
                    type: "zxwz"
                },
                success: res => {
                    if (res.code) {
                        console.log(res.title)
                    } else {
                        console.log(res.title)
                        this.zxwzData = res.data;
                        this.zxwzSelect();

                    }
                }
            })
        }
        zxwzSelect() {
            let str = "";
            const index = this.zxwzData.findIndex(value => this.zxwzType === value.wide)
            for (let i of this.zxwzData[index].data) {
                str += `<li><a href=""><div class="zc_img"><img src="${i.img}" alt=""></div><div class="zc_name"><span>${i.name}</span><span>${i.post}</span></div><div class="zc_site"><span>${i.workplace}</span><span>${i.type}</span></div><div class="zc_garde"><span>评分<b>${i.grade}</b></span><span>接诊量<b>${i.workload}</b></span></div><p>${i.introduce}</p><div class="zc_price clearfix"><div class="zp_left"><div class="zp_left_1">视频问诊</div><div class="zp_left_2">${i.vPrice}</div></div><div class="zp_left"><div class="zp_left_1">图文问诊</div><div class="zp_left_2">${i.iPrice}</div></div></div><div class="zc_bottom">去问诊</div></a></li>`
            }
            this.oZxwzUl.innerHTML = str;
        }
        zxwzNav(value, index) {
            this.oZxwzNav[this.zxwzPrev].className = ""
            value.className = "nav_change";
            this.zxwzPrev = index;
            this.zxwzType = value.getAttribute("zxwz")
            this.zxwzSelect();
        }
        product() {
            ajax({
                url: this.url,
                data: {
                    type: "product"
                },
                success: res => {
                    if (res.code) {
                        console.log(res.title);
                    } else {
                        console.log(res.title);
                        this.productData = res.data;
                    }
                }
            })
            ajax({
                url: this.url,
                data: {
                    type: "brand"
                },
                success: res => {
                    if (res.code) {
                        console.log(res.title);
                    } else {
                        console.log(res.title);
                        this.brandData = res.data;
                        this.proPrepare()
                    }
                }
            })
        }
        proPrepare() {
            this.oProDiv.forEach((value, index) => {
                // 显示产品信息
                let val = value.children[1].children[1].children[0];
                let idx = this.productData[index].data.findIndex(value => value.wide === this.f[index])

                this.proSelect(val, idx, this.productData[index].data);

                // 显示品牌信息
                let val1 = value.children[1].children[0].children[1];
                let idx1 = this.brandData.findIndex(value => value.title === val1.getAttribute("my_name"))

                this.brandSelect(val1, idx1)


            })
        }
        proSelect(value, index, data) {
            let str = "";
            for (let i of data[index].data) {
                str += `<li> <a href=""><div class="pr_img"><img src="${i.img}" alt=""></div><h3>${i.name}</h3><div class="cont_spec">${i.specification}</div><div class="cont_pri">${i.price}</div></a></li>`
            }
            value.innerHTML = str;

        }
        productChange(target) {
            switch (target.parentNode.parentNode.getAttribute("my_name")) {
                case "1f":
                    this.getPro(0, target);
                    this.titleChange(0, target)
                    break;
                case "2f":
                    this.getPro(1, target);
                    this.titleChange(1, target);
                    break;
                case "3f":
                    this.getPro(2, target);
                    this.titleChange(2, target);
                    break;
                case "4f":
                    this.getPro(3, target);
                    this.titleChange(3, target);
                    break;
                case "5f":
                    this.getPro(4, target);
                    this.titleChange(4, target);
                    break;
            }

        }
        getPro(index, target) {
            let idx = this.productData[index].data.findIndex(value => value.wide === target.getAttribute("my_name"))
            this.proSelect(this.oProDiv[index].children[1].children[1].children[0], idx, this.productData[index].data)

        }
        brandSelect(value, index) {
            let str = "";
            for (let i of this.brandData[index].data) {
                str += `<li><a href=""><img src="./images/index/${i}" alt=""></a></li>`
            }
            value.innerHTML = str;
        }
        titleChange(index, target) {
            this.oProDiv[index].children[0].children[1].children[this.productPrev[index]].className = "";
            target.parentNode.className = "pn_change"
            this.productPrev[index] = this.productData[index].data.findIndex(value => value.wide === target.getAttribute("my_name"));
        }
        more() {
            ajax({
                url: this.url,
                data: {
                    type: "more"
                },
                success: res => {
                    if (res.code) {
                        console.log(res.title);
                    } else {
                        console.log(res.title);
                        this.moreSelect(res.data);
                    }
                }
            })
        }
        moreSelect(data) {
            let str = "";
            for (let i of data) {
                str += ` <li><a href="">
                <img src="${i.img}" alt="">
                <h3>${i.name}</h3>
                <div class="cm_spec">${i.specification}</div>
                <div class="cm_pri">${i.price}</div>
            </a></li>`
            }
            this.oMoreUl.innerHTML = str;
        }

    }
    new Pharmacy();
})();