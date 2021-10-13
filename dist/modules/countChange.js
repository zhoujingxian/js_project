define(["ap", "ac"], (allPrice, allCount) => {
    return function (TAG) {
        let {
            target,
            num,
        } = TAG
        const unit = Number(target.parentNode.parentNode.previousElementSibling.children[0].innerHTML.slice(1));

        target.parentNode.parentNode.nextElementSibling.children[0].innerHTML = `￥${(unit*num).toFixed(2)}`;
        allPrice();
        allCount();
    }
})