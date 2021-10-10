;
(function () {
    "use strict"

    class List {
        constructor() {
            this.oPub = Array.from(document.querySelectorAll('.pub'));
            this.oBox = Array.from(document.querySelectorAll('.cont_box_bottom'));

            this.oProduct = document.querySelector('.pro_content ul');
            this.oPageUl = document.querySelector('.page ul')

            this.url = "http://localhost:3000/api";
            this.SYM = {
                hide: Symbol(),
                show: Symbol()
            }
            this.prev = this.SYM.show;
            this.CONT = 8;
            this.index = 1;
            this.prev = 1;
            this.FLAG = 5;
            this.init();
            this.addEvent();
        }
        init() {
            this.sitems();
            this.listPro();
        }
        addEvent() {
            const that = this;
            this.oBox.forEach((value, index) => {
                value.onclick = function () {
                    that.showStatus(value)
                }
            })

            this.oPageUl.onclick = function (eve) {
                let e = eve || window.event;
                let target = e.target || e.srcElement;
                if (target.getAttribute('my_class') === "opt") {
                    that.oPageLiClick(target.innerHTML);
                } else if (target.getAttribute('my_class') === "left") {
                    that.oPageLeft()
                } else {
                    that.oPageRight()
                }
            }
        }
        // 页码初始化
        pageInit() {
            this.num = Math.ceil(this.listData.length / this.CONT);
            let str = ` <li class="pag_left" my_class="left">&laquo;</li>`;
            for (let i = 1; i <= this.num && i < 6; i++) {
                str += `<li class="page_li" my_class="opt">${i}</li>`
            }
            if (this.num > 5) {
                str += `<li my_class="omit_right">...</li>`
            }
            str += `<li class="pag_right" my_class="right">&raquo;</li>`
            this.oPageUl.innerHTML = str;
            this.pageLi = Array.from(document.querySelectorAll('.page .page_li'))
            this.pageStyle();
        }
        pageStyle() {
            this.oPageUl.children[this.index].id = "page_style"
        }
        pageNone() {
            this.oPageUl.children[this.index].id = "";
        }
        // 页码点击事件
        oPageLiClick(index) {
            this.pageNone();
            this.index = index;
            this.listSelect()
            this.pageStyle()
        }
        // 页码左移
        oPageLeft() {
            // if (this.prev > 1) {}
            if (this.index > 1) {
                this.pageNone()
                this.index--;
                this.listSelect();
                this.pageStyle()
            }
        }
        // 页码右移
        oPageRight() {
            if (this.prev === this.FLAG && this.num > this.FLAG) {
                console.log(this.prev)
                this.pageChange();
            } else {
                this.prev++;
            }
            if (this.index < this.num) {
                this.pageNone()
                this.index++;
                this.listSelect();
                this.pageStyle()
            }
        }
        pageChange() {
            this.pageLi.forEach(value => {
                value.innerHTML = value.innerHTML;
            })
        }
        showStatus(value) {
            if (this.prev === this.SYM.show) {
                this.unfold(value);
                this.listShow(value)
                this.prev = this.SYM.hide;
            } else {
                this.packUp(value);
                this.listHide(value);
                this.prev = this.SYM.show;
            }
        }
        listShow(value) {
            console.log(value.previousElementSibling)
            value.previousElementSibling.style.height = "320px"
        }
        listHide(value) {
            value.previousElementSibling.style.height = "72px"
        }
        unfold(value) {
            value.innerHTML = "收起<i></i>";
            value.children[0].style.backgroundPosition = "-291px -27px";
        }
        packUp(value) {
            value.innerHTML = "展开<i></i>";
            value.children[0].style.backgroundPosition = "-123px 0";
        }

        listPro() {
            ajax({
                url: this.url,
                data: {
                    type: "listPro"
                },
                success: res => {
                    if (res.code) {
                        console.log(res.title);
                    } else {
                        console.log(res.title);
                        this.listData = res.data;
                        this.listSelect();
                        this.pageInit()
                    }
                }
            })
        }
        listSelect() {
            let str = "";
            for (let i = (this.index - 1) * this.CONT; i < this.index * this.CONT && i < this.listData.length; i++) {
                str += `<li><a href="" class="pro_box"><img src="${this.listData[i].img}" alt="" class="pro_img"><div class="pro_price">${this.listData[i].price}</div><a href="" class="pro_a">${this.listData[i].name}</a><p>规格: ${this.listData[i].spec}</p><p>剂型: ${this.listData[i].type}</p><p>批准文号: <img src="${this.listData[i].icon}" alt=""></p><div class="pro_f">生产厂家:${this.listData[i].firm}</div><div class="pro_b"><span>共<i>1116</i>个商家有售</span><a href="">查看详情</a></div></a></li>`
            }

            this.oProduct.innerHTML = str;
        }
        sitems() {
            ajax({
                url: this.url,
                data: {
                    type: 'sitems'
                },
                success: res => {
                    if (res.code) {
                        console.log(res.title);
                    } else {
                        console.log(res.title);
                        this.sitemSelect(res.data)
                    }
                }
            })
        }
        sitemSelect(data) {
            console.log(data);
            this.oPub.forEach((value, index) => {
                let str = "";
                for (let i of data[index].data) {
                    str += `<a href="">${i}</a>`
                }
                value.innerHTML = str;
            })
        }
    }

    new List();
})();