;
(function () {
    "use strict"

    class Personal {
        constructor() {
            this.oUserName = document.querySelector('.user_name');
            this.oUserPhone = document.querySelector('.user_phone');
            this.oMenuLi = Array.from(document.querySelectorAll('.r_left li'));
            this.oBox = Array.from(document.querySelectorAll('.r_right ul'));

            this.prev = 0;
            this.init();
            this.addEvent();
        }
        init() {
            this.userInit();
        }
        userInit() {
            const userData = JSON.parse(localStorage.getItem("user"));
            this.oUserName.innerHTML = userData.username;
            this.oUserPhone.value = userData.phoneNumber;
        }
        addEvent() {
            const that = this;
            this.oMenuLi.forEach((value, index) => {
                value.onclick = function () {
                    that.liChange(value, index);
                }
            })
        }
        liChange(value, index) {
            value.className = "left_style";
            this.oBox[index].style.display = "block";
            this.oMenuLi[this.prev].className = "";
            this.oBox[this.prev].style.display = "none"
            this.prev = index;
        }

    }
    new Personal();
})();