
<template>
  <div class="home-streaming">
    <div class="streaming-container">
      <div class="Source">
        <div class="streaming-title">
          <h2>Source</h2>
        </div>
        <div class="streaming-top-bar">
          <button @click="Source = 'Neos'; " @mouseover="neosbutton= true" @mouseleave="neosbutton= false"  v-bind:class= "[Source == 'Neos' ? neosbuttonset :neosstreamingtopbarbutton]"><img v-bind:src="[neosbutton ? 'https://cdn.discordapp.com/icons/402159838827905024/a_8139162900c446123e41cb8b02b30ffe.gif?size=128' : 'https://cdn.discordapp.com/icons/402159838827905024/a_8139162900c446123e41cb8b02b30ffe.png?size=128']"  width="20" height="20">Neos</button>
          <button @click="Source = 'Screens'" v-bind:class= "[Source == 'Screens' ? buttonset :streamingtopbarbutton]"> <v-icon>{{ mdimonitor }}</v-icon>Screens</button>
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

.neosstreaming-top-bar-button {
  background-color: #d4f321; /* Green background */
  border: 1px solid #f7f317; /* Green border */
  color: white; /* White text */
  padding: 10px 24px; /* Some padding */
  cursor: pointer; /* Pointer/hand icon */
  float: left; /* Float the buttons side by side */
}

/* Add a background color on hover */
.neosstreaming-top-bar-button:hover {
  background-color: rgb(233, 230, 23);
}



.neosbutton-set {
  background-color: #ecee78; /* Green background */
  border: 1px solid #f3f717; /* Green border */
  color: white; /* White text */
  padding: 10px 24px; /* Some padding */
  cursor: pointer; /* Pointer/hand icon */
  float: left; /* Float the buttons side by side */
}
/* Add a background color on hover */
.neosbutton-set:hover {
  background-color: rgb(226, 218, 104);
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
      neosbutton: false,
      mdiapps: "mdi-apps",
      mdimonitor: "mdi-monitor",
      neosbuttonset: "neosbutton-set",
      neosstreamingtopbarbutton: "neosstreaming-top-bar-button",
      buttonset: "button-set",
      streamingtopbarbutton: "streaming-top-bar-button",
      Source: "Neos"
    };
  },
  methods: {}
};
</script>
