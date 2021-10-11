function jsonp(url, success, data) {

    url += "?";
    for (let i in data) {
        url += `${i}=${data[i]}&`
    }
    let script = document.createElement('script');
    script.src = url.slice(0, url.length - 1);

    document.body.appendChild(script);

    window[data[data.fieldName]] = res => {
        success(res);
    }
    script.remove()
}