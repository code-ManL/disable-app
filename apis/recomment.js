import {
	http
} from '@/common/service/service.js'

let url="/api/square"
const apiService = {

	//获取图片秀推荐列表
	getRecomment(params) {
		return http.get(`${url}/recomment/SearchPictureShowByAdvise`, params)
	},

	//获取推荐的视频秀
	getUserVedio(params) {
		return http.get(`${url}/recomment/SearchVideoShowByAdvise`, params)
	},


	//收藏图片以及视频
	collect(params) {
		return http.post(`${url}/recomment/collect`, null, params)
	},


	//喜欢用户
	loveUser(params) {
		return http.post(`${url}/recomment/likeUser`, null, params)
	},

	//不喜欢用户
	dislikeUser(params) {
		return http.post(`${url}/recomment/dislikeUser`, null, params)
	},

	//取消不喜欢用户
	cancelDislikeUser(params) {
		return http.delete(`${url}/recomment/cancel-dislikeUser`, params)
	},

	//关注用户
	concernUser(params) {
		return http.post(`${url}/mine/concernUser`, null, params)
	},

	//取消关注
	cancelConcernUser(params) {
		return http.delete(`${url}/mine/cancelConcernUser`,null, params)
	},
}

export default apiService;
