require.config({
    baseUrl: "./",
    paths: {
        jq: './libs/jQuery',
        gg: "./modules/getGoods",
        cr: "./modules/cartRander",
        cc: "./modules/countChange"
    }
});

require(['jq', 'gg', 'cr', "cc"], function (_, getGoods, cartRander, countChange) {
    const url = "http://localhost:3000/api";
    // 
    let TAG = {};
    TAG.oGoods = document.querySelector('.goods');

    setTimeout(() => {
        TAG.oSub = document.querySelector(".count_sub");
        TAG.oAdd = document.querySelector('.count_add');
        TAG.oInput = document.querySelectorAll(".ipt");
        TAG.oPrice = document.querySelector('.price');
        TAG.oSubtotal = document.querySelectorAll(".subtotal");
        TAG.oAllcount = document.querySelector(".sh_count")
    }, 10);

    let goods = JSON.parse(localStorage.getItem('cart'));
    let goodsData;
    getGoods(url, res => {
        goodsData = res.data;
        cartRander(res.data, goods, TAG.oGoods);
    })
    setTimeout(() => {
        allPrice()
        allCount()
    }, 12);

    TAG.oGoods.onclick = function (event) {
        const e = event || window.event;
        const target = e.target || e.srcElement;
        if (target.className === "count_sub") {
            if (target.nextElementSibling.value > 1)
                target.nextElementSibling.value = parseInt(target.nextElementSibling.value) - 1;
            countChange(target, target.nextElementSibling.value, allPrice, allCount)
        } else if (target.className === "count_add") {
            target.previousElementSibling.value = parseInt(target.previousElementSibling.value) + 1;
            countChange(target, target.previousElementSibling.value, allPrice, allCount)
        } else if (target.className === "delete") {

        }
    }

    function allPrice() {
        let sum = 0;
        TAG.oSubtotal.forEach(value => {
            sum += Number(value.innerHTML.slice(1))
        });
        TAG.oPrice.innerHTML = `￥${sum.toFixed(2)}`;
    }

    function allCount() {
        let sum = 0;
        TAG.oInput.forEach(value => {
            sum += parseInt(value.value)
        })
        TAG.oAllcount.innerHTML = `(${sum})`
    }




})