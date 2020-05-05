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
          <v-tab to="/"><v-icon>mdi-code-braces</v-icon>Projects</v-tab>
          <v-tab to="/Servers"><v-icon>mdi-server</v-icon>Server Browser</v-tab>
          <v-tab to="/Thing"><v-icon>mdi-toy-brick-plus</v-icon>Plugins</v-tab>
          <v-tab to="/Account"><v-icon>mdi-account</v-icon>My Account</v-tab>
          <v-tab to="/Neos"><v-icon>mdi-microsoft-azure</v-icon>Neos</v-tab>
          <v-tab to="/Settings"><v-icon>mdi-tune-vertical</v-icon>Settings</v-tab>
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
.home-index {
  background-image: url("./assets/Gunlight.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
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
  components : {},
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
  }
}
</script>
