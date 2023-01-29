import { http } from '@/common/service/service.js'

let url="/api/personinfo"
let url2="/api/square"
const apiService = {
	
	// 获取主页个人基本信息
	getBaseData(params) {
		return http.post(`${url}/user/getBaseData`, null, params)
	},	
	
	// 获取一个用户所有信息
	getAllData(params) {
		return http.post(`${url}/user/getAllData`,null, params)
	},
    
    //每日签到
    signIn(params) {
    	return http.put(`${url}/user/signIn`, null, params)
    },  
	
	//修改头像
	changeUserImage(params) {
		return http.post(`${url}/user/updateHeadPicPath`, null, params)
	},
	
	//修改昵称
	changeNickName(params) {
		return http.post(`${url}/user/updateNickName`, null, params)
	},
	
	/**************************************
		特权模块
	*************************************/
	
	// 获取套餐信息
	getVipPackageList(params) {
		return http.get(`${url}/vipPackage/list`,  params)
	},
	
	// 获取权限信息
	getVipPermissionList(params) {
		return http.post(`${url}/vipPermission/userId`, null,  params)
	},
    
    // 购买VIP
    openVip(params) {
    	return http.post(`${url}/user/openVip`, null,  params)
    },
    
    // 续费
    renewalVip(params) {
    	return http.post(`${url}/user/renewalVip`, null,  params)
    },
    
   
    
    /**************************************
    	关注模块
    *************************************/
    
    // 获取关注者列表
    searchFan(params) {
    	return http.post(`${url}/fan/searchFan`, null, params)
    },
    
    // 取消关注
    cancelAttention(params) {
    	return http.post(`${url}/fan/cancelAttention`, null, params)
    },
    
    // 关注指定用户
    addAttention(params) {
    	return http.post(`${url}/fan/addAttention`, null, params)
    },
    
    // 获取粉丝列表
    searchAttention(params) {
    	return http.post(`${url}/fan/searchAttention`, null, params)
    },
	
	/**************************************
		修改资料
	*************************************/
	
	
	
	// 获取基本信息
	getPersonBasicInfo(params) {
		return http.get(`${url}/personBasicInfo/personId`, params)
	},
	
	// 获取详细信息
	getPersonDetailInfo(params) {
		return http.get(`${url}/personDetailInfo/personId`, params)
	},
	
	// 获取择偶信息
	getRequirements(params) {
		return http.get(`${url}/requirements/personId`, params)
	},
	
	// 修改基本信息
	changePersonBasicInfo(params) {
		return http.put(`${url}/personBasicInfo/update`, params, null, {
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		})
	},
	
	// 修改详细信息
	changePersonDetailInfo(params) {
		return http.put(`${url}/personDetailInfo/update`, params, null, {
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		})
	},
	
	// 修改择偶信息
	changeRequirements(params) {
		return http.put(`${url}/requirements/update`, params, null, {
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
			}
		})
	},
	
	/**************************************
		相册
	*************************************/
	
	// 根据图片id查找图片信息
	searchPictureById(params) {
		return http.post(`${url}/pictureAlbum/id`, null, params)
	},
	
	// 根据用户id查找相册
	searchAlbumListByUserId(params) {
		return http.post(`${url}/pictureAlbum/userId`, null, params)
	},
	
	// 新增照片
	addPicture(params) {
		return http.post(`${url}/pictureAlbum/insertInfo`, params, null, {
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
			}
		})
	},
	
	// 删除照片
	deletePicture(params) {
		return http.delete(`${url}/pictureAlbum/delete`, null, params)
	},
	
	// 更新图片
	changePicture(params) {
		return http.put(`${url}/pictureAlbum/update`, params, null, {
			header: {
				"Content-Type": "application/x-www-form-urlencoded",
			}
		})
	},
	
	// 获取我的动态列表
	getMyDiary(params) {
		return http.get(`${url2}/mine/getMyDiary`, params)
	},
	
	
	//获取喜欢
	getLikeUsers(params) {
		return http.get(`${url2}/mine/getLikeUsers`, params)
	},
	
	//获取不喜欢人
	getDisLikeUsers(params) {
		return http.get(`${url2}/mine/getDisLikeUsers`, params)
	},
	
}

export default apiService;
