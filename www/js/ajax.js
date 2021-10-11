function ajax(obj = {}) {
    let {
        method = 'get', url, success, error, data = {}
    } = obj;

    let str = "";
    for (let i in data) {
        str += `${i}=${data[i]}&`;
    }
    if (method === 'get') {
        url += '?' + str.slice(0, str.length - 1);
    }

    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.responseType = "json";
    if (method === 'get')
        xhr.send();
    else {
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(str.slice(0, str.length - 1))
    }

    xhr.onload = function () {
        if (xhr.status === 200) {
            success(xhr.response);
        } else {
            error(xhr.status)
        }

    }
}