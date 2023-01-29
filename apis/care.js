import {
	http
} from '@/common/service/service.js'

let url="/api/square"
const apiService = {

	//获取
	getCarefor(params) {
		return http.get(`${url}/social/getFollowsDiaryList`, params)
	},
	
	getTotal(){
		return http.get(`${url}/social/getFollowPages`)
	}

}

export default apiService;
