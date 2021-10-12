;
(function () {
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
            this.url = "http://localhost:3000/api"
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
        }
        verSub() {
            ajax({
                url: this.url,
                data: {
                    type: "login",
                    username: this.oUsername.value,
                    password: this.oPassword.value
                },
                success: res => {
                    if (res.code) {
                        this.userJudge(res.title)
                    } else {
                        this.successLogin(res.data)
                    }
                }
            })
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
                this.oPassword = document.getElementById('password')
            }
        }
        successLogin(data) {
            this.oTitle.style.display = "none";
            localStorage.setItem("isLogin", "OK");
            data.prev = this.oCheck.checked ? true : false;
            localStorage.setItem("user", JSON.stringify(data));
            location.href = "../index.html";
        }
        judge() {
            if (this.oXy.checked) {
                this.verSub()
            } else {
                alert("请阅读并勾选阅读协议");
            }

        }
        userJudge(title) {
            this.oTitle.children[1].innerHTML = title;
            this.oTitle.style.display = "block";

        }
        init() {
            if (localStorage.getItem("user")) {
                this.storage = JSON.parse(localStorage.getItem("user"))
                this.oUsername.value = this.storage.username;
                if (JSON.parse(localStorage.getItem("user")).prev) {
                    this.textShow()
                }
            }
        }

        textShow() {


            this.oPassword.value = this.storage.password;
            this.oCheck.checked = "checked";
            this.oXy.checked = "checked";
        }

    }
    new Login();
})();