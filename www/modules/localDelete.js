define(["cr", "ap"], (cartRander, allPrice) => {
    return function (TAG) {
        let {
            target,
            oGoods,
            goodsData
        } = TAG;
        const idx = TAG.goods.findIndex(value => value.id === target.parentNode.parentNode.getAttribute("my_id"));
        TAG.goods.splice(idx, 1);
        localStorage.setItem("cart", JSON.stringify(TAG.goods));
        cartRander(TAG);
        allPrice()
    }

})