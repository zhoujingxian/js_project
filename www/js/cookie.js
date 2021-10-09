/**
 * 新增cookie
 * @param {string} name cookie的存储名称
 * @param {string} value cookie的值
 * @param {object} opt cookie的有效期和路径
 */
function setCookie(name, value, opt) {
    let e = "",
        p = "";
    if (opt.expires) {
        let d = new Date();
        d.setDate(d.getDate() + opt.expires);
        e = ";expires=" + d;
    }
    if (opt.path) {
        p = ";path=" + opt.path;
    }
    document.cookie = `${name}=${value}${e}${p}`;
}
/**
 * 
 * @param {string} name cookie的存储名称
 * @returns cookie的值
 */
function getCookie(name) {
    return document.cookie.includes(name) ? document.cookie.split(`${name}=`)[1].split("; ")[0] : null;
}