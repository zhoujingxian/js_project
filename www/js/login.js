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
            this.oBtn.forEach((value, index) => {
                value.onclick = function () {
                    that.idx = index;
                    that.state(value, index);
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
        judge() {
            if (this.oXy.checked) {
                this.userJudge()
            } else {
                alert("请阅读并勾选阅读协议");
            }

        }
        userJudge() {
            let uName = this.oUsername.value;
            let passWord = this.oPassword.value;
            if (uName && passWord) {
                if (this.emailReg.test(uName) || this.phoneReg.test(uName)) {
                    this.oTitle.style.display = "none";
                    if (!this.idx)
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
            if (document.cookie.includes("user")) {
                this.cook = JSON.parse(getCookie("user"));
                this.oCheck.checked = "checked";
                this.oXy.checked = "checked";
            } else {
                this.cook = {
                    userNmae: '',
                    password: ''
                };
                this.oXy.checked = "";
            }
            this.cook = document.cookie.includes("user") ? JSON.parse(getCookie("user")) : {
                username: '',
                password: ''
            };
            this.textShow();
        }

        textShow() {
            this.oUsername.value = this.cook.username;
            this.oPassword.value = this.cook.password;
        }

    }
    new Login();
})();