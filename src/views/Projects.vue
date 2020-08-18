<template>
  <div>
    <div v-show="true" class="home">
      <div class="sidebar-wrap">
        <ProjectsSideBar />
      </div>
      <router-view />
    </div>
    <div v-show="true">
      <div class="logincontanor">
        <div class="control">
          <h1>Sign In</h1>
        </div>
        <input v-model="username" name="username" placeholder="Username" type="text" />
        <input v-model="password" name="password" placeholder="Password" type="password" />
        <button v-on:click="loginuser">
          <div class="text">Log In</div>
        </button>
      </div>
    </div>
  </div>
</template>
<style>
.sidebar-wrap {
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
