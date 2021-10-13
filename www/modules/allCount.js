/**
 * 商品数量总和
 */
define(() => {
    return function () {
        const oInput = document.querySelectorAll(".ipt");
        const oAllcount = document.querySelector(".sh_count")
        let sum = 0;
        oInput.forEach(value => {
            sum += parseInt(value.value)
        })
        oAllcount.innerHTML = `(${sum})`
    }
})