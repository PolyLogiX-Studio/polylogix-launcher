<template>
  <div class="home">
    <div class="sidebar-wrap">
      <MainSideBar />
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
import MainSideBar from "@/components/MainSideBar.vue";

export default {
  name: "Home",
  components: {
    MainSideBar
  }
};
</script>
