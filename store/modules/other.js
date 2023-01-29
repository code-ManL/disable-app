
export default {
    namespaced: true,
    state: {
		tag: '',
		hobby: ''
	},
    mutations: {
		SetTag(state, data) {
			state.tag = data
		},
		SetHobby(state, data) {
			state.hobby = data
		},
	},
    actions: {
		
    }
}
