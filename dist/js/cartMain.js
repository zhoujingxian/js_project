require.config({
    baseUrl: "./",
    paths: {
        jq: "./libs/jQuery",
        gg: "./modules/getGoods",
        cr: "./modules/cartRander",
        cc: "./modules/countChange",
        lc: "./modules/localChange",
        ld: "./modules/localDelete",
        ap: "./modules/allPrice",
        ac: "./modules/allCount",
        aCheck: "./modules/allCheck",
        oCheck: "./modules/oneCheck"
    }
});

require(['jq', 'gg', 'cr', "cc", "lc", "ld", "ap", "ac", "aCheck", "oCheck"], function (_, getGoods, cartRander, countChange, localChange, localDelete, allPrice, allCount, allCheck, oneCheck) {
    const url = "http://localhost:3000/api";
    // 
    let TAG = {};
    TAG.oGoods = document.querySelector('.goods');

    setTimeout(() => {
        TAG.oAllCheck = Array.from(document.querySelectorAll(".all_check"));
        TAG.oneCheck = Array.from(document.querySelectorAll('.one_check'))
        console.log(TAG.oneCheck)

        TAG.oAllCheck.forEach(value => {
            value.onclick = function () {
                TAG.checkValue = value
                allCheck(TAG);
            }
        })
        TAG.oneCheck.forEach(value => {
            value.onclick = function () {
                TAG.oneValue = value;
                oneCheck(TAG);
            }
        })
    }, 100);

    TAG.goods = JSON.parse(localStorage.getItem('cart'));
    getGoods(url, res => {
        TAG.goodsData = res.data;
        cartRander(TAG);

    })
    setTimeout(() => {
        allPrice()
        allCount()
    }, 100);

    TAG.oGoods.onclick = function (event) {
        const e = event || window.event;
        const target = e.target || e.srcElement;
        if (target.className === "count_sub") {
            if (target.nextElementSibling.value > 1)
                target.nextElementSibling.value = (parseInt(target.nextElementSibling.value) - 1).toString();
            TAG.target = target;
            TAG.num = target.nextElementSibling.value;
            countChange(TAG)
            localChange(TAG)
        } else if (target.className === "count_add") {
            target.previousElementSibling.value = parseInt(target.previousElementSibling.value) + 1;

            TAG.target = target;
            TAG.num = target.previousElementSibling.value;
            countChange(TAG);
            localChange(TAG)
        } else if (target.className === "delete") {
            TAG.target = target;
            localDelete(TAG);
        }
    }





})