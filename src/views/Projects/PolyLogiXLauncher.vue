<template>
  <div class="home-index">
   <v-btn @click="addDownload">Download Update</v-btn>
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
