import Vue from 'vue'
import Vuex from 'vuex'
import {ipcRenderer} from "electron"

Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    launchable: false,
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
export default Store
ipcRenderer.send("lauchable")
ipcRenderer.on("lauchable",(event , result)=>{
  if(result){
    console.log("neos is found")
  } else {
    console.log("neos is not found")
  }
  Store.launchable = result
})

ipcRenderer.on("running",(event , result)=>{
  Store.running = result
})

