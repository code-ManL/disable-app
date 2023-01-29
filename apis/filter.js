import {
	http
} from '@/common/service/service.js'

let url="/api/square"

const apiService = {

	// 发送动态
	getFilters(params) {
		return http.get(`${url}/social/active/publishActive`, null, params)
	},

}

export default apiService;
