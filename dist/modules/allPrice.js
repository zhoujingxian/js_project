/**
 * 商品价格总和
 */
define(() => {
    return function (TAG) {
        const {
            oOneCheck,
            oPrice
        } = TAG;
        let sum = 0.00;
        oOneCheck.forEach(value => {
            if (value.checked) {
                sum += Number(value.parentNode.parentNode.children[5].children[0].innerHTML.slice(1));
            }
        })

        oPrice.innerHTML = `￥${sum.toFixed(2)}`;
    }
})