import Vue from 'vue'
import Vuex from 'vuex'
import { /**createPersistedState, **/createSharedMutations } from "vuex-electron"
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
  actions: {
    addDownload(context){
      context.commit('addDownload')
    }
  },
  modules: {
  },
  plugins: [
    //createPersistedState(),
    createSharedMutations()
  ]
})
