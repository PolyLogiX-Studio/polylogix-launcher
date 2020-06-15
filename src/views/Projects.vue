<template>
<div>
  <div v-show="$store.User != null" class="home">
    <div class="sidebar-wrap">
      <ProjectsSideBar />
    </div>
    <router-view />
  </div>
  <div v-show="$store.User == null" >
  <div class="logincontanor">
<form autocomplete='off' class='form'>
  <div class='control'>
    <h1>
      Sign In
    </h1>
  </div>
  <div class='control block-cube block-input'>
    <input name='username' placeholder='Username' type='text'>
    <div class='bg-top'>
      <div class='bg-inner'></div>
    </div>
    <div class='bg-right'>
      <div class='bg-inner'></div>
    </div>
    <div class='bg'>
      <div class='bg-inner'></div>
    </div>
  </div>
  <div class='control block-cube block-input'>
    <input name='password' placeholder='Password' type='password'>
    <div class='bg-top'>
      <div class='bg-inner'></div>
    </div>
    <div class='bg-right'>
      <div class='bg-inner'></div>
    </div>
    <div class='bg'>
      <div class='bg-inner'></div>
    </div>
  </div>
  <button class='btn block-cube block-cube-hover' type='button'>
    <div class='bg-top'>
      <div class='bg-inner'></div>
    </div>
    <div class='bg-right'>
      <div class='bg-inner'></div>
    </div>
    <div class='bg'>
      <div class='bg-inner'></div>
    </div>
    <div class='text'>
      Log In
    </div>
  </button>
  <div class='credits'>
    <a href='https://codepen.io/marko-zub/' target='_blank'>
      My other codepens
    </a>
  </div>
</form>

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

export default {
  name: "Projects",
  components: {
    ProjectsSideBar
  },
  mounted(){
      
  }
};

</script>
