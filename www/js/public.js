/**
 * 范围随机数
 * @param {number} min 
 * @param {number} max 
 * @returns number
 */
function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
/**
 * 随机颜色
 * @returns rgb
 */
function backcolor() {
    return `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`
}
/**
 * 获取样式的兼容封装
 * @param {object} element 获取样式的元素
 * @param {string} attr 获取的样式
 * @returns string
 */
function getStyle(element, attr) {
    return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element)[attr]
}


/**
 * 阻止事件冒泡的兼容封装
 * @param {object} event DOM事件
 */
function stopBubble(event) {
    return event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
}


/**
 * 监听式绑定事件的兼容处理
 * @param {object} element 事件对象
 * @param {string} type 事件类型
 * @param {function} cb 事件执行函数
 */
function addEvent(element, type, cb) {

    if (element.attachEvent) {
        element.attachEvent("on" + type, cb)
    } else {
        element.addEventListener(type, cb);
    }
}
/**
 * 监听式删除事件的兼容处理
 * @param {object} element 事件对象
 * @param {string} type 事件类型
 * @param {function} cb 事件执行函数
 */
function removeEvent(element, type, cb) {
    if (element.detachEvent) {
        element.detachEvent("on" + type, cb)
    } else {
        element.removeEventListener(type, cb)
    }
}
/**
 * 阻止默认点击事件的执行
 * @param {object} element 事件对象
 */
function stopDefault(element) {
    if (element.preventDefault) {
        element.preventDefault()
    } else {
        element.returnValue = false;
    }
}