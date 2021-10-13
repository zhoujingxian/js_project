define(() => {
    return function (TAG) {
        let {
            goodsData,
            goods,
            oGoods
        } = TAG
        let str = "";
        goods.forEach(value => {
            let idx = goodsData.findIndex(val => val.ID === value.id);
            str += ` <tr my_id="${value.id}">
            <td class="w1"><input type="checkbox"></td>
            <td class="w2">
                <img src="./images/detail/${goodsData[idx].imgM}s0.jpg" alt="">
            </td>
            <td class="w3">
                <p><a href=""><a href=""><i class="cf"></i><em>${goodsData[idx].brand}&nbsp;${goodsData[idx].name}(${goodsData[idx].type})</em></a></a></p>
                <p>规格：${goodsData[idx].specification}</p>
                <p>厂家：${goodsData[idx].firm}</p>
            </td>
            <td class="w4">
                <span>￥${goodsData[idx].price}</span>
            </td>
            <td class="w5">
                <div>
                    <button class="count_sub"></button>
                    <input type="text" class="ipt" value="${value.count}">
                    <button class="count_add"></button>
                </div>
            </td>
            <td class="w6">
                <span class="subtotal">￥${(parseInt(value.count)*goodsData[idx].price).toFixed(2)}</span>
            </td>
            <td class="w7">
                <input type="button" value="删除" class="delete">
            </td>
        </tr>`
        })

        oGoods.innerHTML = str;

    }
})