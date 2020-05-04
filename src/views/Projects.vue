<template>
  <div class="home">
    <div class="sidebar-wrap">
      <ProjectsSideBar />
    </div>
    <router-view />
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
  }
};
</script>
