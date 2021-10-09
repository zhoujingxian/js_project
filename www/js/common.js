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
    new Common();
}