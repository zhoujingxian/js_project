window.onload = function () {
    "use strict"

    class Common {
        constructor() {
            this.oSearch = document.querySelector('.search');
            this.oSearchUl = document.querySelector(".search_box");
            this.oText = document.querySelector('#text');
            this.searchUrl = "https://suggest.taobao.com/sug";
            this.addEvent();
        }
        addEvent() {
            const that = this;
            //显示选项
            this.oText.oninput = function () {
                that.textInput();
            }
            this.oText.onfocus = function () {
                that.textInput();
            }

            //鼠标移入等效果显示
            this.oSearchUl.onmouseover = function (eve) {
                let e = eve || window.event;
                let target = e.target || e.srcElement;
                that.mOver(target);
            }
            // 鼠标移出效果
            this.oSearchUl.onmouseleave = function () {
                that.mLeave();
            }
            // 选项点击选中
            this.oSearchUl.onclick = function (eve) {
                let e = eve || window.event;
                let target = e.target || e.srcElement;
                that.mClick(target);
                that.oSearchUl.innerHTML = ""
            }

            document.onclick = function () {
                that.hidden();
                that.oulclose()
            }
            this.oSearch.onclick = function (eve) {
                let e = eve || window.event;
                that.display(e);
            }

        }
        kDown(code) {
            switch (code) {
                case 38:
                    this.keyUp();
                    this.keyShow()
                    this.func();
                    this.keyPrev = this.nkey;
                    break;
                case 40:
                    this.keyDown()
                    this.keyShow()
                    this.func();
                    this.keyPrev = this.nkey;
                    break;
                case 13:
                    this.oulclose();
            }
        }
        keyUp() {
            if (isNaN(this.nkey)) {
                this.nkey = this.oSearch.children.length - 1
            } else if (this.nkey === 0) {
                this.nkey = this.oSearchUl.children.length - 1
            } else {
                this.nkey--;
            }
        }
        keyDown() {
            if (isNaN(this.nkey)) {
                this.nkey = 0
            } else if (this.nkey === this.oSearchUl.children.length - 1) {
                this.nkey = 0;
            } else {

                this.nkey++;
            }
        }
        keyShow() {
            this.oSearchUl.children[this.nkey].className = "search_hover";
            if (!isNaN(this.keyPrev))
                this.oSearchUl.children[this.keyPrev].className = "";
        }
        // 将li中的内容插入到显示区域
        func() {
            this.oText.value = this.oSearchUl.children[this.nkey].innerHTML;
        }
        oulclose() {
            this.oSearchUl.style.display = "none";
            document.onkeydown = null;
        }
        display(e) {
            e.stopPropagation()
            this.oSearchUl.style.display = "block"
        }
        hidden() {
            this.oSearchUl.style.display = "none";
            this.nkey = undefined;
        }
        // 选项点击选中
        mClick(target) {
            if (target.nodeName === "LI") {
                this.oText.value = target.innerHTML;

            }
        }
        // 鼠标移出效果
        mLeave() {
            this.oldTar.className = "";

        }
        // 鼠标移入效果
        mOver(target) {
            if (target.nodeName === "LI") {
                this.oldTar.className = "";
                this.oldTar = target;
                target.className = "search_hover";
            }
        }
        textInput() {
            jsonp(this.searchUrl, (res) => {
                this.success(res)
            }, {
                code: "utf-8",
                q: this.oText.value,
                callback: "jsonp603",
                fieldName: "callback"
            })
        }
        success(res) {
            let str = "";
            for (let i in res.result) {
                str += `<li>${res.result[i][0]}</li>`
            }

            this.oSearchUl.innerHTML = str;
            this.oldTar = this.oSearchUl.children[0];
            document.onkeydown = (eve) => {
                var e = eve || window.event;
                var code = e.keyCode || e.which;
                this.kDown(code);
            }
        }
    }
    class Menu {
        constructor() {
            this.oMenu = document.querySelector('.nav .menu');
            this.oMenu2 = document.querySelector(".nav .menu2")
            this.oMenuLi = Array.from(document.querySelectorAll(".nav .menu2>li"));
            this.oMerUl = Array.from(document.querySelectorAll('.menu3 .menu_mer'))

            this.url = "http://localhost:3000/api";

            this.init()
            this.addEvent();
        }
        init() {
            this.merchant();
        }
        addEvent() {
            const that = this;
            this.oMenu.onmouseenter = function () {
                that.menuShow();
            }
            this.oMenu.onmouseleave = function () {
                that.menuHide();
            }
            // 三级菜单的显示和隐藏
            this.oMenuLi.forEach((value, index) => {
                value.onmouseenter = function () {
                    that.menuLiEnt(value, index)
                }
                value.onmouseleave = function () {
                    that.menuLiLea(value, index)
                }
            })
            // 二级菜单的背景颜色
            this.oMenu2.onmouseenter = function () {
                that.menuEnt();
            }
            this.oMenu2.onmouseleave = function () {
                that.menuLea();
            }
        }
        menuShow() {
            this.oMenu2.style.display = "block"
        }
        menuHide() {
            this.oMenu2.style.display = "none"

        }
        menu
        // 菜单栏推荐商家
        merchant() {
            ajax({
                url: this.url,
                data: {
                    type: 'merchant'
                },
                success: res => {
                    if (res.code) {
                        console.log(res.title)
                    } else {
                        console.log(res.title);
                        this.merSelect(res.data)
                    }
                }
            })
        }

        // 三级菜单的显示和隐藏
        menuLiEnt(value, index) {
            value.style.background = "#f4f4f4";
            value.style.borderRight = "none";
            value.children[3].style.display = "block";
            this.menuPrev = index;
        }
        menuLiLea() {
            this.oMenuLi[this.menuPrev].style.background = "none";
            this.oMenuLi[this.menuPrev].children[3].style.display = "none";

        }
        // 二级菜单的背景颜色
        menuEnt() {
            this.oMenu2.style.background = "#fff";
        }
        menuLea() {
            this.oMenu2.style.background = "rgba(255, 255, 255, .9)";
        }
        // 菜单栏推荐商家
        merSelect(data) {
            this.oMerUl.forEach((value, index) => {
                let idx = data.findIndex(val => val.title === value.getAttribute("my_name"));
                let str = "";
                for (let i of data[idx].data) {
                    str += `<li><a href="">${i}</a></li>`
                }
                value.innerHTML = str;
            })

        }
    }
    new Common();
    new Menu()
}