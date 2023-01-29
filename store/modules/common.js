
export default {
    namespaced: true,
    state: {
		baseInfo: {},//基础系统信息
		moreInfo: {},//详细信息（基础，详细，择偶）
		albumInfo: [],//相册
	},
    mutations: {
		// 存储用户基础信息
		setBaseInfo(state, data) {
			// JSON.stringify(localStorage.setItem('baseInfo', data))
			state.baseInfo = data
		},
		// 存储用户具体信息
		setMoreInfo(state, data) {
			// JSON.stringify(localStorage.setItem('moreInfo', data))
			state.moreInfo = data
		},
		// 存储用户相册信息
		setAlbumInfo(state, data) {
			// JSON.stringify(localStorage.setItem('albumInfo', data))
			state.albumInfo = data
		}
	},
    actions: {
		
    }
}
