<template>
  <div class="home">
    <div class="sidebar-wrap">
      <SettingSideBar />
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
import SettingSideBar from "@/components/SettingSideBar.vue";
export default {
  name: "Settings",
  components: {
    SettingSideBar
  }
};
</script>
