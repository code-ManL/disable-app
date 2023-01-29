import Vue from 'vue'
import Vuex from 'vuex'

import common from "./modules/common";
import user from "./modules/user";
import webSocket from "./modules/webSocket";
import other from "./modules/other";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  
  },
  mutations: {
  },
  modules:{
    common,
    user,
	webSocket,
	other
  },
  getters:{

  }
})
