;
(function () {
    "use strict"

    if (localStorage.getItem('isLogin') !== "OK") {
        location.href = "../login.html"
    }
})();