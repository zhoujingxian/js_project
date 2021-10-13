define(() => {
    return function (TAG) {
        let {
            target,
            num,
            goods
        } = TAG
        const id = target.parentNode.parentNode.parentNode.getAttribute("my_id");
        const idx = goods.findIndex(value => value.id === id);
        goods[idx].count = num;
        localStorage.setItem("cart", JSON.stringify(goods))
        console.log(goods)
    }
})