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
            this.oBtn = Array.from(document.querySelectorAll(''))

            this.emailReg = /^[a-z\d]([\da-z][-_\.]?)+@([a-z\d][-\.]?)+$/i;
            this.phoneReg = /^1[3-9]\d{9}$/;
            this.init();
            this.addEvent();
        }
        addEvent() {
            const that = this;
            this.oSubmit.onclick = function () {
                that.judge()

            }
        }
        judge() {
            if (this.oXy.checked) {
                this.userJudge()
            } else {
                alert("请阅读并勾选阅读协议");
            }

        }
        userJudge() {
            const uName = this.oUsername.value;
            const passWord = this.oPassword.value;
            if (uName || passWord) {
                if (this.emailReg.test(uName) || this.phoneReg.test(uName)) {
                    this.oTitle.style.display = "none"
                    this.set()
                } else {
                    this.oTitle.children[1].innerHTML = "用户名或密码错误";
                    this.oTitle.style.display = "block"
                }
            } else {
                this.oTitle.children[1].innerHTML = "请输入完整用户登录信息";
                this.oTitle.style.display = "block"
            }
        }
        set() {
            if (this.oCheck.checked) {
                console.log(JSON.stringify({
                    username: this.oUsername.value,
                    password: this.oPassword.value
                }))
                setCookie("user", JSON.stringify({
                    username: this.oUsername.value,
                    password: this.oPassword.value
                }), {
                    expires: '',
                    path: ''
                })
            }
        }
        init() {
            this.cook = document.cookie.includes("user") ? JSON.parse(getCookie("user")) : {
                username: '',
                password: ''
            };
            this.textShow();
        }

        textShow() {
            this.oCheck.checked = "checked";
            this.oXy.checked = "checked";
            this.oUsername.value = this.cook.username;
            this.oPassword.value = this.cook.password;
        }

    }
    new Login();
})();