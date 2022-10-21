
/**hex -> rgba
 * @param {Object} hex
 * @param {Object} opacity
 */
export function hexToRgba(hex, opacity) {
    return 'rgba(' + parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5)) + ','
        + parseInt('0x' + hex.slice(5, 7)) + ',' + opacity + ')';
}

/**
 * 获取URL中某个参数的值 */
export function getQueryString(queryName) {
    var query = decodeURI(window.location.hash.substring(1));
    console.log(query)
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        // console.log(pair)
        if (pair[0].indexOf(queryName) >= 0) { return pair[1]; }
    }
    return null;
}