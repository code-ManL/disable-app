import { http } from '@/common/service/service.js'
import configService from '@/common/service/config.service.js';
let url="/api/personinfo"
const apiService = {
	
    login(params) {
    	return http.post(`${url}/user/join`,params,null,{
			header:{
				 'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
    },
}

export default apiService;
