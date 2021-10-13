/**
 * 全选按钮
 */
define(() => {
    return function (TAG) {
        const {
            oAllCheck,
            oOneCheck,
            checkValue
        } = TAG;
        if (checkValue.checked) {
            oAllCheck.forEach(value => {
                value.checked = true
            })
            oOneCheck.forEach(value => {
                value.checked = true;
            })
        } else {
            oAllCheck.forEach(value => {
                value.checked = false;
            })
            oOneCheck.forEach(value => {
                value.checked = false;
            })
        }

    }
})