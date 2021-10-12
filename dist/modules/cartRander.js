define(() => {
    return function (data, goods, target) {
        console.log(data)
        let str = "";
        goods.forEach(value => {
            let idx = data.findIndex(val => val.ID === value.id);
            str += ` <tr my_id="${value.id}">
            <td class="w1"><input type="checkbox"></td>
            <td class="w2">
                <img src="./images/detail/${data[idx].imgM}s0.jpg" alt="">
            </td>
            <td class="w3">
                <p><a href=""><a href=""><i class="cf"></i><em>${data[idx].brand}&nbsp;${data[idx].name}(${data[idx].type})</em></a></a></p>
                <p>规格：${data[idx].specification}</p>
                <p>厂家：${data[idx].firm}</p>
            </td>
            <td class="w4">
                <span>￥${data[idx].price}</span>
            </td>
            <td class="w5">
                <div>
                    <button class="count_sub"></button>
                    <input type="text" class="ipt" value="${value.count}">
                    <button class="count_add"></button>
                </div>
            </td>
            <td class="w6">
                <span class="subtotal">￥${parseInt(value.count)*data[idx].price}</span>
            </td>
            <td class="w7">
                <input type="button" value="删除" class="delete">
            </td>
        </tr>`
        })

        target.innerHTML = str;

    }
})