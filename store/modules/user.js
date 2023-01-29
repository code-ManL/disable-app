import my from "@/apis/my"

export default {
    namespaced: true,
    state: {
        baseData:{},//个人统计信息
		detailData: {},//个人详细信息（基础信息，详细信息，择偶信息）
        loginUser:{
            loginName: "123456",
            nickName: "",
            userId:"1"
        }
    },
    mutations: {
        SETLOGINUSER(state, data) {
            state.loginUser = data;
        }
    },
    actions: {
        //更新用户个人统计信息
        UpdateUserBaseData({commit}, data) {
            return new Promise((resolve, reject) => {
                my.getBaseData(data).then(response => {
					commit.state.baseData= response.data;
                 }).catch(error => {
                })
            })
        },
		//更新用户个人详细信息
		UpdateUserAllData({commit}, data) {
		    return new Promise((resolve, reject) => {
		        my.getAllData(data).then(response => {
					commit.state.detailData= response.data;
		         }).catch(error => {
		        })
		    })
		},
    }
}
