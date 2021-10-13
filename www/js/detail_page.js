;
(function () {
    "use strict"

    class Magnifying {
        constructor() {
            this.mDiv = document.querySelector('.zoomPad');
            this.mImg = document.querySelector('.zoomPad img');
            this.mBox = document.querySelector('.zoomPad div');
            this.lDiv = document.querySelector('.big');
            this.lImg = document.querySelector('.big img');

            this.pLeft = document.querySelector('.pic_left');
            this.pRight = document.querySelector('.pic_right');
            this.sBox = document.querySelector('.pic_img');

            this.oText = document.querySelectorAll('.para li dd')
            this.oH2 = document.querySelector('.main_center h3 span')
            this.oPrice = document.querySelector('.price')
            this.buyAdd = document.querySelector('.buy_add');

            this.oSub = document.querySelector('.sub');
            this.oAdd = document.querySelector('.add');
            this.oCount = document.getElementById('count')
            this.prev = 0;
            this.id = location.search.split("=")[1];
            this.url = "http://localhost:3000/api";
            this.addEvent();
            this.init();
        }
        init() {
            ajax({
                url: this.url,
                data: {
                    type: "detail",
                    id: this.id
                },
                success: res => {
                    if (res.code) {
                        console.log(res.title);
                    } else {
                        console.log(res.title);
                        this.proData = res.data;
                        this.proSelect();
                    }
                }
            })


            this.setTime();
        }


        addEvent() {
            const that = this;
            this.mDiv.onmouseenter = function () {
                that.enter();
            }
            this.mDiv.onmouseleave = function () {
                that.leave();
            }

            this.mDiv.onmousemove = function (element) {
                var element = element || window.event;
                const coord = {
                    x: element.offsetX,
                    y: element.offsetY
                }
                that.move(coord);
            }

            this.pLeft.onmousedown = function () {
                that.btnLeft();
            }
            this.pRight.onmousedown = function () {
                that.btnRight();
            }

            this.buyAdd.onclick = function () {
                that.buyAddClick();
            }
            this.oAdd.onclick = function () {
                that.countChange(1);
            }
            this.oSub.onclick = function () {
                that.countChange(-1);
            }
        }
        countChange(index) {
            if (parseInt(this.oCount.value) + index > -1)
                this.oCount.value = parseInt(this.oCount.value) + index;
        }
        buyAddClick() {
            if (this.oCount.value !== "0") {
                let goods = JSON.parse(localStorage.getItem("cart"));
                if (localStorage.getItem('cart')) {
                    const idx = goods.findIndex(value => value.id === this.id)
                    if (idx === -1) {
                        goods.push(this.setIn())
                    } else {
                        goods[idx].count = (parseInt(goods[idx].count) + parseInt(this.oCount.value)).toString()
                    }
                    localStorage.setItem('cart', JSON.stringify(goods))

                } else {
                    localStorage.setItem('cart', JSON.stringify([this.setIn()]))
                }
                this.oCount.value = 0;
                let s = 0;
                goods.forEach(value => {
                    s += parseInt(value.count)
                })
                this.oEm.innerHTML = `(${s})`
            }
        }
        setTime() {
            setTimeout(() => {
                this.oEm = document.querySelector('.sh_count')
            }, 10);
        }
        setIn() {
            return {
                id: this.id,
                count: this.oCount.value
            }

        }
        proSelect() {
            this.sImgRender();
            this.textRender();
        }
        // 商品文本渲染
        textRender() {
            this.oText[0].innerHTML = this.proData.name;
            this.oText[1].innerHTML = this.proData.brand;
            this.oText[2].innerHTML = this.proData.specification;
            this.oText[3].innerHTML = this.proData.type;
            this.oText[4].innerHTML = this.proData.firm;
            this.oH2.innerHTML = this.proData.brand + "&nbsp;" + this.proData.name;
            this.oPrice.innerHTML = "￥" + this.proData.price;
        }
        // 小图渲染
        sImgRender() {
            let str = '';
            for (let i = 0; i < 5; i++) {
                str += `<li><img src="./images/detail/${this.proData.imgM}s${i}.jpg"></li>`
            }
            this.sBox.innerHTML = str;
            this.sImg = Array.from(document.querySelectorAll('.pic_img li img'));
            this.sImgClick();
            this.imgInit();

        }
        // 图片初始化
        imgInit() {
            this.sImg[this.prev].parentNode.style.borderColor = "#e50000";
            this.mImg.src = `images/detail/${this.proData.imgM}m${this.prev}.jpg`;
            this.lImg.src = `images/detail/${this.proData.imgM}m${this.prev}.jpg`;
        }
        // 小图片点击事件
        sImgClick() {
            this.sImg.forEach((value, index) => {
                value.onclick = () => {
                    this.cut(value, index);
                }
            })
        }
        // 当前图片左移
        btnLeft() {
            if (this.prev !== 0) {
                this.sImg[this.prev].parentNode.style.borderColor = "#e5e5e5"
                this.sImg[--this.prev].parentNode.style.borderColor = "#e16070"
                this.cut(this.sImg[this.prev], this.prev)
            }
        }
        // 当前图片右移
        btnRight() {
            if (this.prev !== this.sImg.length - 1) {
                this.sImg[this.prev].parentNode.style.borderColor = "#e5e5e5"
                this.sImg[++this.prev].parentNode.style.borderColor = "#e16070"
                this.cut(this.sImg[this.prev], this.prev)
            }

        }
        // 切换大图
        cut(value, index) {
            this.mImg.src = `images/detail/${this.proData.imgM}m${index}.jpg`;
            this.lImg.src = `images/detail/${this.proData.imgM}m${index}.jpg`;
            this.sImg[this.prev].parentNode.style.borderColor = "#e5e5e5"
            value.parentNode.style.borderColor = "#e16070";
            this.prev = index;
        }
        // 放大镜效果
        move(coord) {
            let msLeft = coord.x - this.msWidth / 2;
            let msTop = coord.y - this.msHeight / 2;

            if (msLeft < 0) msLeft = 0;
            if (msTop < 0) msTop = 0;
            if (msLeft > this.mdWidth - this.msWidth) msLeft = this.mdWidth - this.msWidth;
            if (msTop > this.mdHeight - this.msHeight) msTop = this.mdHeight - this.msHeight;

            this.mBox.style.left = msLeft + 'px';
            this.mBox.style.top = msTop + 'px';

            const ratio = {
                rleft: parseFloat(msLeft / this.mdWidth),
                rtop: parseFloat(msTop / this.mdHeight)
            }
            this.bigmove(ratio);
        }
        // 最大图的移动
        bigmove(ratio) {
            this.lImg.style.left = -ratio.rleft * this.liWidth + 'px';
            this.lImg.style.top = -ratio.rtop * this.liHeight + 'px';
        }
        enter() {
            this.lDiv.style.display = "block";
            this.boxInit()
            this.mBox.style.display = "block";


        }
        leave() {
            this.mBox.style.display = "none";
            this.lDiv.style.display = "none";

        }
        boxInit() {
            this.assignment();
            this.mBox.style.width = this.msWidth + 'px';
            this.mBox.style.height = this.msHeight + 'px';
        }
        assignment() {
            this.mdWidth = this.mDiv.offsetWidth;
            this.mdHeight = this.mDiv.offsetHeight;
            this.liWidth = this.lImg.offsetWidth;
            this.liHeight = this.lImg.offsetHeight;

            this.msWidth = this.mdWidth * parseFloat(this.lDiv.offsetWidth / this.liWidth);
            this.msHeight = this.mdHeight * parseFloat(this.lDiv.offsetHeight / this.liHeight);
        }
    }
    new Magnifying();
})();