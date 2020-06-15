
<template>
  <div class="home-streaming">
    <div v-show= "hostedbyself" class="streaming-container">
      <div class="Source">
          <div v-show= "hostedbyself" class="streaming-container" style="background-color: rgb(200, 200, 200);">
            <p>You are hosting this your self so your ip will be public and you need to have port 8000 Open</p>
          </div>
        <div class="streaming-title">
          <h2>Source</h2>
        </div>
        <div class="streaming-top-bar">
          <button @click="Source = 'Neos'; " @mouseover="neosbutton= true" @mouseleave="neosbutton= false"  v-bind:class= "[Source == 'Neos' ? buttonset :streamingtopbarbutton]"><img style="position: relative; right:10px"  v-bind:src="[neosbutton ? 'https://cdn.discordapp.com/icons/402159838827905024/a_8139162900c446123e41cb8b02b30ffe.gif?size=128' : 'https://cdn.discordapp.com/icons/402159838827905024/a_8139162900c446123e41cb8b02b30ffe.png?size=128']"  width="18" height="18">Neos</button>
          <button @click="Source = 'Screens'" :class= "[Source == 'Screens' ? buttonset :streamingtopbarbutton]"> <v-icon>{{ mdimonitor }}</v-icon>Screens</button>
          <button @click="Source = 'Applications'" v-bind:class= "[Source == 'Applications' ? buttonset : streamingtopbarbutton]"> <v-icon>{{mdiapps}}</v-icon>Application</button>
        </div>
        <div class="streaming-screens-holder">
         <div v-show="Source == 'Neos'" class="NeosStream">
           <h1 v-show="!$store.running">Neos is not found to be running</h1>
          </div>
          <div v-show="Source == 'Screens'" class="Screens">
            Screens
          </div>
          <div v-show="Source == 'Applications'" class="Applications">
            Applications
          </div>
        </div>
        <div class="Source-control">
          <button>
            <span
              style="  height: 10px; width: 10px; background-color: red; border-radius: 50%; display: inline-block;"
            ></span> Start Stream
          </button>
        </div>
      </div>
      <div class="Camera">
        <div class="streaming-title">
          <h2>Camera</h2>
        </div>
        <div class="streaming-top-bar"></div>
        <div class="streaming-screens-holder"></div>
        <div class="Camera-control">
          <button>
            <span
              style="  height: 10px; width: 10px; background-color: red; border-radius: 50%; display: inline-block;"
            ></span> Start Camera
          </button>
        </div>
      </div>
    </div>
 <div v-show= "!hostedbyself" class="streaming-container">
<p>You are not in a session with streaming enabled</p>
<button :onclick="hostedbyself=true">SelfHost</button>

 </div>
  <div v-show= "!hostedbyself" class="streaming-container">
  </div>
  </div>
</template>

<style>
.Source {
  padding: 10px;
}
.Camera {
  padding: 10px;
}
.Camera-control {
  padding: 10px;
}
.Source-control {
  padding: 10px;
}
.streaming-title h2 {
  color: rgba(75, 75, 75);
}

.streaming-top-bar {
  position: relative;
  left: calc(50% - 170px);
}
/* Clear floats (clearfix hack) */
.streaming-top-bar:after {
  content: "";
  clear: both;
  display: table;
}

.streaming-top-bar-button {
  background-color: #2196f3; /* Green background */
  border: 1px solid #1792f7; /* Green border */
  color: white; /* White text */
  padding: 10px 24px; /* Some padding */
  cursor: pointer; /* Pointer/hand icon */
  float: left; /* Float the buttons side by side */
}

/* Add a background color on hover */
.streaming-top-bar-button:hover {
  background-color: rgb(23, 140, 233);
}



.button-set {
  background-color: #78b9ee; /* Green background */
  border: 1px solid #1792f7; /* Green border */
  color: white; /* White text */
  padding: 10px 24px; /* Some padding */
  cursor: pointer; /* Pointer/hand icon */
  float: left; /* Float the buttons side by side */
}
/* Add a background color on hover */
.button-set:hover {
  background-color: rgb(104, 171, 226);
}


.home-streaming {
  padding: 5px;
  width: 50%;
  margin: auto;
}
.streaming-container {
  margin-top: 15px;
  width: 100%;
  background-color: rgb(240, 240, 240);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 2px 5px #888888;
  overflow: hidden;
}
</style>
   <script>
//   import electron from 'electron'
//  import path from 'path'
//  import url from 'url'
//  import child_process from 'child_process'
//  import os from 'os'

//   const spawn = child_process.spawn
//  const exec = child_process.exec

export default {
  name: "home-streaming",
  components: {},
  data() {
    return {
      hostedbyself: false,
      neosbutton: false,
      mdiapps: "mdi-apps",
      mdimonitor: "mdi-monitor",
      buttonset: "button-set",
      streamingtopbarbutton: "streaming-top-bar-button",
      Source: "Neos"
    };
  },
  methods: {}
};
</script>
