define(() => {
    return function () {
        oRegister = document.querySelector('.register');
        oOwn = document.querySelector('.own');
        oL = document.querySelector('.login_left');
        oR = document.querySelector('.regi_right');
        oName = document.querySelector('.reg_name');
        oExit = document.querySelector('.exit');
        oEm = document.querySelector('.sh_count')

        if (localStorage.getItem('isLogin') === "OK") {
            oRegister.style.display = "none";
            oOwn.style.display = "inline-block";
            oName.innerHTML = JSON.parse(localStorage.getItem("user")).username;
            cartInit();
        } else {
            oRegister.style.display = "inline-block";
            oOwn.style.display = "none";
        }

        function cartInit() {
            let sum = 0;
            if (localStorage.getItem('cart')) {
                const goods = JSON.parse(localStorage.getItem("cart"));
                goods.forEach(value => {
                    sum += parseInt(value.count)
                });
            }

            oEm.innerHTML = `(${sum})`

        }

        oExit.onclick = function () {
            localStorage.removeItem("cart");
            localStorage.setItem("isLogin", "false");
        }
    }
})