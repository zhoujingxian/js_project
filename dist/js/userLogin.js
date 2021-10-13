 window.onload = function () {
     // 登录信息显示
     class UserLogin {
         constructor() {
             this.oRegister = document.querySelector('.register');
             this.oOwn = document.querySelector('.own');
             this.oL = document.querySelector('.login_left');
             this.oR = document.querySelector('.regi_right');
             this.oName = document.querySelector('.reg_name');
             this.oExit = document.querySelector('.exit');
             this.oEm = document.querySelector('.sh_count')

             this.init();
             this.addEvent()
         }
         init() {
             this.loginInit();

         }
         cartInit() {
             let sum = 0;
             if (localStorage.getItem('cart')) {
                 const goods = JSON.parse(localStorage.getItem("cart"));
                 goods.forEach(value => {
                     sum += parseInt(value.count)
                 });
             }

             this.oEm.innerHTML = `(${sum})`

         }
         loginInit() {
             if (localStorage.getItem('isLogin') === "OK") {
                 this.oRegister.style.display = "none";
                 this.oOwn.style.display = "inline-block";
                 this.oName.innerHTML = JSON.parse(localStorage.getItem("user")).username;
                 this.cartInit();
             } else {
                 this.oRegister.style.display = "inline-block";
                 this.oOwn.style.display = "none";
             }
         }
         addEvent() {
             const that = this;
             this.oExit.onclick = function () {
                 that.exitClick()
             }
         }
         exitClick() {
             localStorage.setItem("isLogin", "false");

         }

     }

     new UserLogin();
 }