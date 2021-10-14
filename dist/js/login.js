;
(function () {
    "use strict"
    class Login {
        constructor() {
            this.oUsername = document.getElementById('username');
            this.oPassword = document.getElementById('password');
            this.oCheck = document.getElementById('check');
            this.oSubmit = document.getElementById('submit');
            this.oTitle = document.getElementById("title");
            this.oXy = document.getElementById('xy');
            this.oBtn = Array.from(document.querySelectorAll('.login_top span'));
            this.oIn = document.querySelectorAll('.in')

            // this.emailReg = /^[a-z\d]([\da-z][-_\.]?)+@([a-z\d][-\.]?)+$/i;
            // this.phoneReg = /^1[3-9]\d{9}$/;
            this.url = "http://localhost:3000/api";
            this.goods = JSON.parse(localStorage.getItem('user'));
            this.init();
            this.addEvent();
        }
        addEvent() {
            const that = this;
            this.oSubmit.onclick = function () {
                that.judge();
            }
            this.oBtn.forEach((value, index) => {
                value.onclick = function () {
                    that.idx = index;
                    that.state(value, index);
                }
            })
            this.oUsername.oninput = function () {
                that.oPassword.value = "";
            }
            this.oPassword.oninput = function () {
                that.passwordChange()
            }
        }
        passwordChange() {
            this.goods.prev = false;
            localStorage.setItem("user", JSON.stringify(this.goods))

        }

        state(value, index) {
            value.className = "lt_color";
            this.oIn[index].style.display = "block";
            this.oBtn[1 - index].className = "";
            this.oIn[1 - index].style.display = "none";
            this.oTitle.style.display = "none";

            this.setEle(index);

        }
        setEle() {
            if (this.idx) {
                this.oUsername = document.getElementById('phone_number');
                this.oPassword = document.getElementById('auth_code')
            } else {
                this.oUsername = document.getElementById('username');
                this.oPassword = document.getElementById('password');
            }
        }

        judge() {
            if (this.oXy.checked) {
                this.verSub()
            } else {
                alert("请阅读并勾选阅读协议");
            }

        }
        verSub() {
            ajax({
                url: this.url,
                data: {
                    type: "login",
                    username: this.oUsername.value,
                    password: this.oPassword.value,
                    prev: this.goods.prev
                },
                success: res => {
                    console.log(res.code)
                    if (res.code) {
                        this.userJudge(res.code, res.title)
                    } else {
                        this.successLogin(res.data)
                    }
                }
            })
        }
        userJudge(code, title) {
            if (code === 2) {
                this.oPassword.value = "";
            }
            this.oTitle.children[1].innerHTML = title;
            this.oTitle.style.display = "block";
        }
        successLogin(data) {
            this.oTitle.style.display = "none";
            localStorage.setItem("isLogin", "OK");
            data.user.prev = this.oCheck.checked ? true : false;
            localStorage.setItem("user", JSON.stringify(data.user));
            if (data.cart) {
                localStorage.setItem("cart", JSON.stringify(data.cart))
            } else {
                localStorage.setItem("cart", "")
            }
            location.href = "../index.html";
        }
        init() {
            if (localStorage.getItem("user")) {
                this.storage = JSON.parse(localStorage.getItem("user"));
                this.oUsername.value = this.storage.username;
                if (this.storage.prev) {
                    this.textShow()
                }
            }
        }

        textShow() {
            this.oPassword.value = "******";
            this.oCheck.checked = "checked";
            this.oXy.checked = "checked";
        }

    }
    new Login();
})();