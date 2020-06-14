<template>
  <v-app>
    <v-app-bar app color="primary" dark >
      <div class="d-flex align-center logo">
        <v-img
          alt="PolyLogiX Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="40"
        />
      </div> 
      <div class="app-bar-content-nograb">
        <v-tabs background-color="primary">
          <v-btn @mouseleave="neosbutton = false" color="warning" height="100%" v-bind:disable="$store.launchable==false" @click="launch" ><img   v-bind:src="[neosbutton ? 'https://cdn.discordapp.com/icons/402159838827905024/a_8139162900c446123e41cb8b02b30ffe.gif?size=128' : 'https://cdn.discordapp.com/icons/402159838827905024/a_8139162900c446123e41cb8b02b30ffe.png?size=128']"  width="20" height="20"> {{$store.launchable?' Neos Is Not Found':$store.running?' Neos Running':' Launch Neos'}}</v-btn>
          <v-tab to="/"><v-icon>mdi-view-grid  </v-icon>Dashboard</v-tab>
          <v-tab to="/Servers"><v-icon>mdi-server</v-icon>Server Browser</v-tab>
          <v-tab to="/Streaming"><v-icon>mdi-monitor-screenshot</v-icon>Streaming</v-tab>
          <v-tab to="/Worlds"><v-icon>mdi-earth</v-icon>Worlds</v-tab>
          <v-tab to="/Settings"><v-icon>mdi-tune-vertical</v-icon>Settings</v-tab>
          <v-tab to="/Downloads"><v-badge :content="downloadCount" left overlap color="info" :value="downloadCount>0"><v-icon>mdi-download</v-icon></v-badge>Downloads</v-tab>
          <v-tab to="/About"><v-icon>mdi-information-outline</v-icon>About</v-tab>
        </v-tabs>
      </div>
      
      <span class="mr-1 app-bar-content-nograb window-btn">
        <v-btn icon @click="minimize">
          <v-icon>mdi-window-minimize</v-icon>
        </v-btn>
        <v-btn icon @click="maximize">
          <v-icon>mdi-window-maximize</v-icon>
        </v-btn>
        <v-btn icon @click="close">
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
      </span>
    </v-app-bar>

    <v-content >
      <router-view />
    </v-content>
  </v-app>
</template>
<style>
.window-btn {
  position: absolute;
  right: 0px;
}
.about-index {
  background-image: url("./assets/Animated_Banner_1.gif");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}

</style>
<script>
import electron from 'electron'
export default {
  name: "app",
  data(){
    return {
      neosbutton: false
    }
  },
  components : {},
  computed:{
    downloadCount: function(){return this.$store.state.downloads.length}
  },
  methods:{
    "minimize":function(){
      electron.ipcRenderer.send("windowCommand","minimize")
    },
    "maximize":function(){
      electron.ipcRenderer.send("windowCommand","maximize")
    },
    "close":function(){
      electron.ipcRenderer.send("windowCommand","exit")
    },
    "launch":function(){
      this.neosbutton= true;
      electron.ipcRenderer.send("LAUNCH-NEOS")
    }
  }
}
</script>
