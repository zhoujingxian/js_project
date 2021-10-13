/**
 * 删除单个商品
 */
define(["ap", "oCheck"], (allPrice, oneCheck) => {
    return function (TAG) {
        let {
            target
        } = TAG;
        const idx = TAG.goods.findIndex(value => value.id === target.parentNode.parentNode.getAttribute("my_id"));
        TAG.goods.splice(idx, 1);
        localStorage.setItem("cart", JSON.stringify(TAG.goods));
        target.parentNode.parentNode.remove();
        TAG.oOneCheck = Array.from(document.querySelectorAll('.one_check'));
        allPrice(TAG);
        oneCheck(TAG);
    }

})