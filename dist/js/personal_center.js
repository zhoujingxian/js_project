;
(function () {
    "use strict"

    class Personal {
        constructor() {
            this.oUserName = document.querySelector('.user_name');
            this.oUserPhone = document.querySelector('.user_phone');
            this.init()
        }
        init() {
            this.userInit();
        }
        userInit() {
            const userData = JSON.parse(localStorage.getItem("user"));
            this.oUserName.innerHTML = userData.username;
            this.oUserPhone.innerHTML = userData.phoneNumber;
        }
    }
    new Personal();
})();