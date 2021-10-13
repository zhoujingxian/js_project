define(() => {
    return function (TAG) {
        const {
            oAllCheck,
            oneCheck,
            checkValue
        } = TAG;
        if (checkValue.checked) {
            oAllCheck.forEach(value => {
                value.checked = true
            })
            oneCheck.forEach(value => {
                value.checked = true;
            })
        } else {
            oAllCheck.forEach(value => {
                value.checked = false;
            })
            oneCheck.forEach(value => {
                value.checked = false;
            })
        }

    }
})