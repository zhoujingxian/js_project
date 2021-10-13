/**
 * 改变单个商品价格；同时改变商品价格总和
 */
define(["ap"], (allPrice) => {
    return function (TAG) {
        let {
            target,
            num,
        } = TAG
        const unit = Number(target.parentNode.parentNode.previousElementSibling.children[0].innerHTML.slice(1));

        target.parentNode.parentNode.nextElementSibling.children[0].innerHTML = `￥${(unit*num).toFixed(2)}`;
        allPrice(TAG);
    }
})