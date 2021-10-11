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
            this.sImg = Array.from(document.querySelectorAll('.pic_img li img'));
            this.pLeft = document.querySelector('.pic_left');
            this.pRight = document.querySelector('.pic_right');

            this.prev = 0;
            this.addEvent();
            this.init();
        }
        init() {
            // ajax({

            // })
            this.sImg[this.prev].parentNode.style.borderColor = "#e50000"
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
            this.sImg.forEach((value, index) => {
                value.onclick = () => {
                    this.cut(value, index);
                }
            })
            this.pLeft.onmousedown = function () {
                that.btnLeft();
            }
            this.pRight.onmousedown = function () {
                that.btnRight();
            }
        }
        btnLeft() {
            if (this.prev !== 0) {
                this.sImg[this.prev].parentNode.style.borderColor = "#e5e5e5"
                this.sImg[--this.prev].parentNode.style.borderColor = "#e16070"
                this.cut(this.sImg[this.prev], this.prev)
            }
        }
        btnRight() {
            if (this.prev !== this.sImg.length - 1) {
                this.sImg[this.prev].parentNode.style.borderColor = "#e5e5e5"
                this.sImg[++this.prev].parentNode.style.borderColor = "#e16070"
                this.cut(this.sImg[this.prev], this.prev)
            }

        }
        cut(value, index) {
            this.mImg.src = `images/detail/dglm${index}.jpg`;
            this.lImg.src = `images/detail/dgll${index}.jpg`;
            this.sImg[this.prev].parentNode.style.borderColor = "#e5e5e5"
            value.parentNode.style.borderColor = "#e16070";
            this.prev = index;
        }
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