define(() => {
    return function () {
        const oInput = document.querySelectorAll(".ipt");
        const oAllcount = document.querySelector(".sh_count")
        let sum = 0.00;
        oInput.forEach(value => {
            sum += parseInt(value.value)
        })
        oAllcount.innerHTML = `(${sum})`
    }
})