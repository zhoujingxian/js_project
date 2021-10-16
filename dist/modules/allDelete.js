/**
 * 删除选中商品
 */
define(["ap", "ac"], (allPrice, allCount) => {
    return function (TAG) {
        const {
            oOneCheck,
            oAllCheck
        } = TAG;
        oOneCheck.forEach(value => {
            if (value.checked) {
                const idx = TAG.goods.findIndex(val => val.ID === value.parentNode.parentNode.getAttribute("my_id"));
                TAG.goods.splice(idx, 1);
                value.parentNode.parentNode.remove();
            }
            if (TAG.goods) {
                oAllCheck.forEach(value => {
                    value.checked = false;
                })
            }
        })
        allPrice(TAG);
        allCount(TAG);
        localStorage.setItem("cart", JSON.stringify(TAG.goods))


    }
})