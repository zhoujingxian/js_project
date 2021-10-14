;
(function () {
    "use strict"

    class Personal {
        constructor() {
            this.oUserName = document.querySelector('.user_name');
            this.oUserPhone = document.querySelector('.user_phone');
            this.oMenuLi = Array.from(document.querySelectorAll('.r_left li'));
            this.oBox = Array.from(document.querySelectorAll('.r_right ul'));
            this.rHeader = document.querySelector('.r_header');
            this.rCont = document.querySelector('.r_cont');
            this.oPwSave = document.getElementById('pw_save');
            this.oldPw = document.getElementById("old_pw");
            this.newPw = document.getElementById("new_pw");
            this.againPw = document.getElementById("again_pw")
            this.oAllPw = Array.from(document.querySelectorAll(".pw_prev"));
            this.oHistory = document.getElementById('history');

            this.prev = 0;
            this.url = "http://localhost:3000/api"
            this.init();
            this.addEvent();
        }
        init() {
            this.headHeight();
            this.userInit();
            this.historyInit();
        }
        historyInit() {
            const historyData = localStorage.getItem("history");
            ajax({
                url: this.url,
                data: {
                    type: "history",
                    idData: historyData ? historyData : []
                },
                success: res => {
                    if (res.code) {
                        console.log(res.title)
                    } else {
                        console.log(res.title);
                        this.historySelect(res.data);
                    }
                }
            })
        }
        historySelect(data) {
            let str = "<h3>我的足迹</h3>";
            for (let i of data) {
                str += `<li>
                <a href="">
                    <img src="./images/detail/${i.imgM}m1.jpg" alt="">
                    <div class="price">￥${i.price}</div>
                    <div class="name">${i.brand}&nbsp;${i.name}</div>
                </a>
            </li>`
            }
            this.oHistory.innerHTML = str;

        }
        headHeight() {
            this.rHeader.style.height = this.rCont.offsetHeight + "px"
        }
        addEvent() {
            const that = this;
            this.oMenuLi.forEach((value, index) => {
                value.onclick = function () {
                    that.liChange(value, index);
                }
            })
            this.newPw.oninput = function () {
                that.pwInput();
            }
            this.againPw.oninput = function () {
                that.agaInput();
            }
            this.oPwSave.onclick = function () {
                that.pwSave()
            }

        }
        pwSave() {
            const s = this.oAllPw.every(value => value.getAttribute('my_sign') === "true");
            if (s) {
                ajax({
                    url: this.url,
                    data: {
                        type: "changePassword",
                        username: JSON.parse(localStorage.getItem("user")).username,
                        password: this.oldPw.value,
                        newPassword: this.newPw.value
                    },
                    success: res => {
                        if (res.code) {
                            console.log(res.title);
                            this.losePassword();
                        } else {
                            console.log(res.title);
                            this.successPassword();
                        }
                    }
                })
            } else {
                alert("请正确输入新密码!");
            }
        }
        successPassword() {
            let goods = JSON.parse(localStorage.getItem('user'));
            goods.prev = false;
            localStorage.setItem("user", JSON.stringify(goods));
            localStorage.removeItem("cart");
            document.querySelector('.exit').click();
            location.href = "./login.html";
        }
        losePassword() {
            this.oldPw.value = "";
        }
        pwInput() {
            const a = /\d/.test(this.newPw.value) ? 1 : 0;
            const b = /[a-z]/i.test(this.newPw.value) ? 1 : 0;
            const c = /[^a-z\d]/.test(this.newPw.value) ? 1 : 0;
            if (this.newPw.value) {
                if (/.{6,20}/.test(this.newPw.value)) {
                    switch (a + b + c) {
                        case 1:
                            this.newPw.nextElementSibling.innerHTML = "弱";
                            break;
                        case 2:
                            this.newPw.nextElementSibling.innerHTML = "中";
                            break;
                        case 3:
                            this.newPw.nextElementSibling.innerHTML = "强";
                            break;
                    }
                    this.sign(this.newPw)
                } else {
                    this.mistake(this.newPw, "请输入您的新密码，6-20位数字和字符组合");
                    this.notSign(this.newPw)
                }

            } else {
                this.mistake(this.newPw, "请输入密码！")

            }
        }
        agaInput() {
            if (this.againPw.value) {
                this.pwCompare();
            }
        }
        mistake(value, type) {
            value.nextElementSibling.innerHTML = `<i></i>${type}`;
            value.nextElementSibling.children[0].style.backgroundPosition = "-280px -120px"
        }
        pwCompare() {
            if (this.newPw.value === this.againPw.value) {
                this.correct(this.againPw);
                this.sign(this.againPw)
            } else {
                this.mistake(this.againPw, "与密码不符合");
                this.notSign(this.againPw)
            }
        }
        correct(value) {
            value.nextElementSibling.innerHTML = `<i></i>`;
            value.nextElementSibling.children[0].style.backgroundPosition = "-297px -120px";
        }
        sign(value) {
            value.setAttribute("my_sign", "true");
        }
        notSign(value) {
            value.setAttribute("my_sign", "false");
        }
        userInit() {
            const userData = JSON.parse(localStorage.getItem("user"));
            this.oUserName.innerHTML = userData.username;
            this.oUserPhone.value = userData.phoneNumber;
        }

        liChange(value, index) {
            if (this.prev != index) {
                value.className = "left_style";
                this.oBox[index].style.display = "block";
                this.oMenuLi[this.prev].className = "";
                this.oBox[this.prev].style.display = "none"
                this.prev = index;
                this.headHeight();
            }
        }

    }
    new Personal();
})();