/**
 * 工具函数
 */

/**
 * 格式化时间
 */

/**
 * 返回对象中的数据含量
 * @param {对象参数} obj 
 */
export const returnRate = function(obj) {
    let sum = 0,
        finish = 0
    for (let key in obj) {
        sum++
        if (obj[key] != '' && obj[key] != 0 && obj[key] != null) finish++
    }
    return (finish / sum).toFixed(2)
}

/**
 * 返回指定月数的时间长度
 * @param {月数} mouth 
 */
export const returnDuringTime = function(allMouth) {
    let str = ''
    let nowDate = new Date()
    let year = nowDate.getFullYear()
    let month = nowDate.getMonth() + 1
    let day = nowDate.getDay()
    str += year + '-' + month + '-' + day + '~'
    if (allMouth == 12) {
        year++
    } else if (month + allMouth > 12) {
        year++
        month = (month + allMouth) % 12
    }
    str += year + '-' + month + '-' + day
    return str
}

/**
 * 获取日期形如xxxx-xx-xx
 * @param {*} type 
 */
export const getDate = function(type) {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (type === 'start') {
        year = year - 60;
    } else if (type === 'end') {
        year = year + 2;
    }
    month = month > 9 ? month : '0' + month;
    day = day > 9 ? day : '0' + day;
    return `${year}-${month}-${day}`;
}

/**
 * 将时间字符串中的月份提取出来，形如：2022年08月03日 10时16分08秒
 * @param {时间字符串} time 
 */
export const getMonth = function(time) {
    return time.split('月')[0].split('年')[1]
}

/**
 * 将时间字符串中的天提取出来，形如：2022年08月03日 10时16分08秒
 * @param {时间字符串} time 
 */
export const getDay = function(time) {
    return time.split('日')[0].split('月')[1]
}


/**
 * 转化成formdata对象
 * @param {params参数} params 
 */
export const formdataify = function(params) {
    const formData = new FormData();
    Object.keys(params).forEach(key => {
        if (typeof params[key] == "string") {
            formData.append(key, params[key]);
        } else {
            formData.append(key, JSON.stringify(params[key]));
        }
    });
    return formData;
};


