
export default {
    namespaced: true,
    state: {
		messageList:[]
	},
    mutations: {
	},
    actions: {
	
		//存储新数据消息提醒数量
		NewMessageNum({commit,state}, data) {
			let userShow=false;
			state.messageList.forEach((item)=>{
				//判断是否存在 数据
				if(item.userid==data.senduserid&&data.msgstatus==0){
					item.num++;
					userShow=true
				}
			})
			if(!userShow){
				state.messageList.push({
					userid:data.senduserid,
					num:1
				})
			}
		}
		
    }
}
