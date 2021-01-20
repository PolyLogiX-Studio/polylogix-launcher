<template>
  <div class="home-index">
   SETTINGS
  </div>
</template>
<style>
</style>
<script>
// @ is an alias to /src

export default {
  name: "Home-Index",
  components: {},
  methods:{
    addDownload:function(){
      console.log("STATE")
      this.$store.dispatch('addDownload')
    }
  }
};
</script>
