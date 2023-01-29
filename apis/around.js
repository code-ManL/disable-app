import {
	http
} from '@/common/service/service.js'

let url = "/api/square"
const apiService = {

	//获取
	getRecomment(params) {
		return http.get(`${url}/social/active/getNearActiveList`, params)
	},
	
	//删除动态
	deleteDiary(params) {
		return http.delete(`${url}/social/active/deleteDiary`,null,params)
	},

	addLike(params) {
		return http.post(`${url}/recomment/likeDiary`, null, params)
	},
	addLikeReply(params) {
		return http.post(`${url}/recomment/likeReply`, null, params)
	},
	getTotal() {
		return http.get(`${url}/social/getNearTotal`)
	},

	insertReport(params) {
		return http.post(`${url}/report/insertReport`, null, params)
	},
	
	
	//发布评论
	publishComment(params) {
		return http.post(`${url}/social/active/publishComment`, null, params)
	},

	//回复评论
	publishCommentReply(params) {
		return http.post(`${url}/social/active/publishCommentReply`, null, params)
	},


}

export default apiService;
