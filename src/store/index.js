import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    launchable:false,
    running:false,
    downloads:new Array()
  },
  mutations: {
    addDownload(state){
      console.log("STATE")
      state.downloads.push("Example")
    }
  
  },
  modules: {
  }
})
