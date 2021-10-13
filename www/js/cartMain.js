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
        ac: "./modules/allCount"
    }
});

require(['jq', 'gg', 'cr', "cc", "lc", "ld", "ap", "ac"], function (_, getGoods, cartRander, countChange, localChange, localDelete, allPrice, allCount) {
    const url = "http://localhost:3000/api";
    // 
    let TAG = {};
    TAG.oGoods = document.querySelector('.goods');

    setTimeout(() => {
        // oSub = document.querySelector(".count_sub");
        // oAdd = document.querySelector('.count_add');

    }, 10);

    TAG.goods = JSON.parse(localStorage.getItem('cart'));
    getGoods(url, res => {
        TAG.goodsData = res.data;
        cartRander(TAG);

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

    // function allPrice() {
    //     let sum = 0.00;
    //     TAG.oSubtotal.forEach(value => {
    //         sum += Number(value.innerHTML.slice(1))
    //     });
    //     console.log(sum)
    //     TAG.oPrice.innerHTML = `￥${sum.toFixed(2)}`;
    // }

    // function allCount() {
    //     let sum = 0;
    //     TAG.oInput.forEach(value => {
    //         sum += parseInt(value.value)
    //     })
    //     TAG.oAllcount.innerHTML = `(${sum})`
    // }




})