'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
const res = await uniCloud.getPhoneNumber({
        appid: '__UNI__C481A71', // 替换成自己开通一键登录的应用的DCloud appid，使用callFunction方式调用时可以不传（会自动取当前客户端的appid），如果使用云函数URL化的方式访问必须传此参数
        provider: 'univerify',
        apiKey: '8b1679e352d8971e9eb21cab6bb81880', // 在开发者中心开通服务并获取apiKey
        apiSecret: 'c263ead59f910c43f8eedbf899640a2d', 
		access_token: event.access_token,
		openid: event.openid
	});
	console.log(res,"res"); // res里的数据格式	{ code: 0, success: true, phoneNumber: '186*****078' }
	return {
		code: 0,
		data: res,
		message: '获取手机号成功'
	}
};
