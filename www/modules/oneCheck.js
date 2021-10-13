define(() => {
    return function (TAG) {
        let {
            oneValue,
            oAllCheck,
            oneCheck
        } = TAG;
        if (oneCheck.some(value => value.checked === false)) {
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