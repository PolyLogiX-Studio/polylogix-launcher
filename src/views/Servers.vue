<template>
  <div class="servers">
    <div class="sidebar-wrap"></div>
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

export default {
  name: "Servers",
  components: {}
};
</script>
