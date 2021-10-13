define(() => {
    return function () {
        const oSubtotal = document.querySelectorAll(".subtotal");
        oPrice = document.querySelector('.price');
        let sum = 0.00;
        oSubtotal.forEach(value => {
            sum += Number(value.innerHTML.slice(1))
        });
        oPrice.innerHTML = `￥${sum.toFixed(2)}`;
    }
})