<template>
  <div>
    <div class="home">
      <div class="sidebar-wrap">
        <ProjectsSideBar />
      </div>
      <router-view />
    </div>
  </div>
</template>
<style>
.sidebar-wrap {
  position:relative;
  float: left;
  opacity: 0.9;
}
</style>
<script>
// @ is an alias to /src
import ProjectsSideBar from "@/components/ProjectsSideBar.vue";
import {ipcRenderer} from "electron"

export default {
  name: "Projects",
  components: {
    ProjectsSideBar
  },
  data() {
        return {
            username: "",
            password: ""
        }
  },
  mounted() {},
  methods:{
      loginuser: function(){
          console.log("log user" + this.username)
      ipcRenderer.send("login",{
        password: this.password,
        username: this.username,
        rememberme: false
      })
      }
  }
};


</script>
