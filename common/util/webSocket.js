import Vue from 'vue'
import store from '@/store'

const webSocket = {

	open(userId) {
		//打开时的动作
		uni.onSocketOpen(() => {
			console.log('WebSocket 已连接')
			this.socketStatus = 'connected'
			// uni.showToast({
			// 	title: '实时推送已连接',
			// 	icon: 'none'
			// })
		})
		//断开时的动作
		uni.onSocketClose(() => {
			this.socketStatus = 'closed'
			uni.showToast({
				title: '实时推送已断开连接',
				icon: 'none'
			})
		})
		//报错时的动作
		uni.onSocketError(error => {
			console.error('socket error:', error)
		})
		// 监听服务器推送的消息
		uni.onSocketMessage((message) => {
	       store.dispatch("webSocket/NewMessageNum",JSON.parse(message.data))
			uni.$emit("websocketData",JSON.parse(message.data));
			
		})
		// 打开信道
		uni.connectSocket({
			url: Vue.prototype.webSocketApi + userId
		});
	},

	sendData(data,back) {
		uni.sendSocketMessage({
			data:JSON.stringify(data),
			success(res) {
				console.log('发送成功', res);
				back()
			},
			fail: e => {
				console.log('发送失败', e)
			}
		})
	},

	close() {

	},



}

export default webSocket;
