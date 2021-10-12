function move(ele, data, callback) {
    clearInterval(ele.t);
    const arr = ["scrollTop"]
    ele.t = setInterval(function () {
        let flag = true;
        for (let i in data) {
            const now = arr.includes(i) ? Math.ceil(ele[i]) : parseInt(getStyle(ele, i));
            let speed = (data[i] - now) / 7;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            arr.includes(i) ? ele[i] = now + speed : ele.style[i] = now + speed + 'px';

            if (data[i] !== now + speed)
                flag = false;
        }
        if (flag) {
            clearInterval(ele.t);
            callback && callback();
        }

    }, 30)
}

function getStyle(ele, attr) {
    return getComputedStyle ? getComputedStyle(ele)[attr] : ele.currentStyle[attr];
}