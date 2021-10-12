define(() => {
    return function (url, success) {
        ajax({
            url: url,
            data: {
                type: "getGoods"
            },
            success: success
        })
    }
})