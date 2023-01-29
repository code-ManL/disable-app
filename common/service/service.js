import Request from '@/common/luch-request/index.js'
import {
	ACCESS_TOKEN
} from '@/common/util/constants.js'
import configService from './config.service.js'
import tip from '@/common/util/tip.js';
import Vue from 'vue'
let apiUrl = configService.apiUrl;

const getTokenStorage = () => {
	let token = '';
	try {
		token = (uni.getStorageSync(ACCESS_TOKEN) ? uni.getStorageSync(ACCESS_TOKEN) : "")
	} catch (e) {}
	return token
}

const http = new Request();
http.setConfig((config) => {
	/* 设置全局配置 */
	config.baseUrl = apiUrl /* 根域名不同 */
	config.header = {
		...config.header,
		'Authorization': getTokenStorage()
	}
	return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
// 有默认，非必写

http.validateStatus = (statusCode) => {
	return statusCode === 200
}

http.interceptor.request((config, cancel) => {
	/* 请求之前拦截器 */
	config.header = {
		...config.header,
		'Authorization': getTokenStorage()
	}
	/*
	if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
	  cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
	}
	*/
	return config
})

// 必须使用异步函数，注意
http.interceptor.response(async (response) => {
	/* 请求之后拦截器 */
	// if (response.statusCode !== 200) { // 服务端返回的状态码不等于0，则reject()

	//     tip.error("服务器错误");
	// 	return Promise.reject(response);
	// }
	let data = response.data;
	if(data.resultCode!=200){
        
        if(data.code==401){
            uni.clearStorageSync();
            uni.reLaunch({
                url:"/pages/login/login"
            })
        }else{
            tip.error(data.message);
            return Promise.reject(response);
        }

	}
	return response
}, (response) => {
	// 请求错误做点什么
	// if (response) {
	//     let data = response.data;
	//     const token = (getTokenStorage()=="Bearer "?"":getTokenStorage())
	//     switch (data.code) {
	//         case 403:
	//             tip.error('拒绝访问');
	//             break
	//         case 44444:
	//             if (!token || data.message == "坏的凭证或令牌过期") {
	//                 let timeout = setTimeout(tip.alert('登录已过期'), 1000);
	//                 store.dispatch('Logout').then(() => {
	//                     clearTimeout(timeout)
	//                     window.location.reload()
	//                 })
	//             }
	//             break
	//         case 40406:
	//           tip.error(data.message);
	//           break
	//         default:
	//             break
	//     }
	// }
	return response
})

export {
	http
}
