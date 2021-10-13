require.config({
    baseUrl: "./",
    paths: {
        jq: "./libs/jQuery",
        gg: "./modules/getGoods",
        cr: "./modules/cartRander",
        op: "./modules/onePrice",
        oc: "./modules/oneCount",
        od: "./modules/oneDelete",
        ap: "./modules/allPrice",
        ac: "./modules/allCount",
        aCheck: "./modules/allCheck",
        oCheck: "./modules/oneCheck",
        aDel: "./modules/allDelete",
        uL: "./modules/userLogin"
    }
});

require(['jq', 'gg', 'cr', "op", "oc", "od", "ap", "ac", "aCheck", "oCheck", "aDel", "uL"], function (_, getGoods, cartRander, onePrice, oneCount, oneDelete, allPrice, allCount, allCheck, oneCheck, allDelete, userLogin) {
    const url = "http://localhost:3000/api";
    // 
    let TAG = {};
    TAG.oGoods = document.querySelector('.goods');
    TAG.oAllDel = document.getElementById("allDel");
    TAG.oPrice = document.querySelector('.price');
    setTimeout(() => {
        TAG.oAllCheck = Array.from(document.querySelectorAll(".all_check"));
        TAG.oOneCheck = Array.from(document.querySelectorAll('.one_check'))
        TAG.oInput = Array.from(document.querySelectorAll(".ipt"));

        TAG.oAllCheck.forEach(value => {
            value.onclick = function () {
                TAG.checkValue = value
                allCheck(TAG);
                allPrice(TAG);

            }
        })
        TAG.oOneCheck.forEach(value => {
            value.onclick = function () {
                TAG.oneValue = value;
                oneCheck(TAG);
                allPrice(TAG);
            }
        })
        TAG.oAllDel.onclick = function () {
            allDelete(TAG);
        }
        TAG.oInput.forEach(value => {
            value.oninput = function () {
                value.value = value.value.replace(/[^\d]/g, "")
                TAG.target = value;
                TAG.num = value.value;
                const idx = TAG.goods.findIndex(val => val.id === value.parentNode.parentNode.parentNode.getAttribute("my_id"))
                TAG.goods[idx].count = value.value;
                localStorage.setItem("cart", JSON.stringify(TAG.goods));
                onePrice(TAG);
                allCount();
            }
            value.onblur = function () {
                TAG.target = value;
                if (!parseInt(value.value)) {
                    value.value = "1";
                    TAG.num = "1";
                    const idx = TAG.goods.findIndex(val => val.id === value.parentNode.parentNode.parentNode.getAttribute("my_id"))
                    TAG.goods[idx].count = value.value;
                    localStorage.setItem("cart", JSON.stringify(TAG.goods));
                    onePrice(TAG);
                    allCount();
                }
            }
        })
    }, 100);


    TAG.goods = JSON.parse(localStorage.getItem('cart'));

    getGoods(url, res => {
        TAG.goodsData = res.data;
        cartRander(TAG);

    });
    setTimeout(() => {
        allPrice(TAG)
        allCount()
    }, 150);

    TAG.oGoods.onclick = function (event) {
        const e = event || window.event;
        const target = e.target || e.srcElement;
        if (target.className === "count_sub") {
            if (target.nextElementSibling.value > 1)
                target.nextElementSibling.value = (parseInt(target.nextElementSibling.value) - 1).toString();
            TAG.target = target;
            TAG.num = target.nextElementSibling.value;
            onePrice(TAG)
            oneCount(TAG)
        } else if (target.className === "count_add") {
            target.previousElementSibling.value = parseInt(target.previousElementSibling.value) + 1;

            TAG.target = target;
            TAG.num = target.previousElementSibling.value;
            onePrice(TAG);
            oneCount(TAG)
        } else if (target.className === "delete") {
            TAG.target = target;

            oneDelete(TAG);
        }
    }

    userLogin()




})