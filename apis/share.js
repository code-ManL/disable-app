import {
	http
} from '@/common/service/service.js'

let url="/api/square"

const apiService = {

	// 发送动态
	postPerson(data, params) {
		return http.post(`${url}/social/active/publishActive`, data, params)
	},
	
	// 投诉
	insertReport(params) {
		return http.post(`${url}/report/insertReport`, null, params)
	},
}

export default apiService;
