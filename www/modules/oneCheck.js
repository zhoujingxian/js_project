/**
 * 单个商品的选中状态控制全选的选中状态
 */
define(() => {
    return function (TAG) {
        let {
            oAllCheck,
            oOneCheck
        } = TAG;
        if (oOneCheck.some(value => value.checked === false)) {
            oAllCheck.forEach(value => {
                value.checked = false;
            })
        } else {
            oAllCheck.forEach(value => {
                value.checked = true;
            })
        }
    }
})