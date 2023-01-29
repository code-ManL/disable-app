import {
	http
} from '@/common/service/service.js'

let url="/api/square"
const apiService = {

	// 搜索动态
	getList(params) {
		return http.get(`${url}/recomment/searchDiaryShowByKeywords`, params)
	},
    
    //搜索用户
    getSeachUser(params) {
    	return http.get(`${url}/recomment/searchPictureShowByKeywords`, params)
    },

}

export default apiService;
