;
(function () {
    "use strict"

    class Form {
        constructor() {
            this.oName = document.getElementById("username");
            this.oPw = document.getElementById("password");
            this.oAgain = document.getElementById('again');
            this.oPhone = document.getElementById('phone');
            this.oSub = document.getElementById('submit');
            this.oBox = Array.from(document.querySelectorAll('.main_cont form>div input'))

            this.url = "http://localhost:3000/api";
            this.addEvent();
        }
        init() {
            this.oName.value = "";
            this.oPw.value = "";
            this.oAgain.value = "";
            this.oPhone.value = "";
        }
        addEvent() {
            const that = this;
            this.oName.oninput = function () {
                that.nameInput();
            }
            this.oPw.oninput = function () {
                that.pwInput();
            }
            this.oAgain.oninput = function () {
                that.agaInput();
            }
            this.oPhone.oninput = function () {
                that.phoneInput();
            }
            this.oSub.onclick = function () {
                that.subClick();
            }
        }
        subClick() {
            const s = this.oBox.every(value => value.getAttribute('my_sign') === "true")
            if (s) {
                ajax({
                    url: this.url,
                    data: {
                        type: "register",
                        username: this.oName.value,
                        password: this.oPw.value,
                        phoneNumber: this.oPhone.value,
                        prev: false
                    },
                    success: res => {
                        if (res.code) {
                            this.init()
                            localStorage.setItem("user", JSON.stringify(res.data.user));
                            location.href = '../login.html';
                        } else {
                            alert(res.title);
                            this.oName.value = "";
                        }
                    }

                })
            } else {
                alert("注册信息有误")
            }
        }
        phoneInput() {
            if (this.oPhone.value)
                if (/^1[3-9]\d{9}$/.test(this.oPhone.value)) {
                    this.correct(this.oPhone);
                    this.sign(this.oPhone)
                } else {
                    this.mistake(this.oPhone, "请输入手机号码！");
                    this.notSign(this.oPhone)
                }
        }
        nameInput() {
            if (this.oName.value)
                if (/^[\w]{2,18}$/.test(this.oName.value)) {
                    this.correct(this.oName);
                    this.sign(this.oName)
                } else {
                    this.mistake(this.oName, "请输入你的用户名，2-18个字符，只能字母、数字、下划线");
                    this.notSign(this.oName)
                }

        }
        correct(value) {
            value.nextElementSibling.innerHTML = `<i></i>`;
            value.nextElementSibling.children[0].style.backgroundPosition = "-297px -120px";
        }
        mistake(value, type) {
            value.nextElementSibling.innerHTML = `<i></i>${type}`;
            value.nextElementSibling.children[0].style.backgroundPosition = "-280px -120px"
        }
        pwInput() {
            const a = /\d/.test(this.oPw.value) ? 1 : 0;
            const b = /[a-z]/i.test(this.oPw.value) ? 1 : 0;
            const c = /[^a-z\d]/.test(this.oPw.value) ? 1 : 0;
            if (this.oPw.value) {
                if (/.{6,20}/.test(this.oPw.value)) {
                    switch (a + b + c) {
                        case 1:
                            this.oPw.nextElementSibling.innerHTML = "弱";
                            break;
                        case 2:
                            this.oPw.nextElementSibling.innerHTML = "中";
                            break;
                        case 3:
                            this.oPw.nextElementSibling.innerHTML = "强";
                            break;
                    }
                    this.sign(this.oPw)
                } else {
                    this.mistake(this.oPw, "请输入您的登录密码，6-20位数字和字符组合")
                    this.notSign(this.oPw)
                }

            } else {
                this.mistake(this.oPw, "请输入密码！")

            }
        }
        agaInput() {
            if (this.oAgain.value) {
                this.pwCompare();
            }
        }
        pwCompare() {
            if (this.oPw.value === this.oAgain.value) {
                this.correct(this.oAgain);
                this.sign(this.oAgain)
            } else {
                this.mistake(this.oAgain, "与密码不符合");
                this.notSign(this.oAgain)

            }
        }
        sign(value) {
            value.setAttribute("my_sign", "true");
        }
        notSign(value) {
            value.setAttribute("my_sign", "false");
        }
    }
    new Form()
})();