<template>
  <div class="scrollable">
    <v-container>
    <v-card minHeight="5em">
      Filtering goes Here
    </v-card>
      <v-skeleton-loader
            v-if="loading"
            height="94"
            type="table-heading"
          >
          </v-skeleton-loader>
      <div v-for="item in posts" :key="item.sessionId">
        <v-lazy transition="scale-transition">
        <v-card minHeight="15em" >
          <div class="alignRight">
            <img :src="item.thumbnail" height="250em" />
          </div>
          <div class="header">
            <h3 class="header mr-3">{{item.name}}</h3>
            {{item.sessionUsers.length}}/{{item.maxUsers}}
          </div>
          <div class="userList">
            <div v-for="user in item.sessionUsers" :key="user.username">{{user.username}}</div>
          </div>
          <div class="joinButton">
            <v-btn
              color="primary"
              target="_blank"
              :href="'neos:?world=neos-session://' + item.sessionId"
            >Join Server</v-btn>
          </div>
        </v-card>
        </v-lazy>
      </div>
    </v-container>
  </div>
</template>
<style>
.userList {
  position: absolute;
  right: 510px;
  top: 0;
}
.joinButton {
  bottom: 0px;
  left: 0px;
}
.header {
  top: 0;
  left: 0;
}
.alignRight {
  right: 0;
  float: right;
  position: absolute;
}
.scrollable {
  overflow-y: scroll;
  max-height: calc(100vh - 64px);
}
.scrollable::-webkit-scrollbar {
  overflow-y: scroll;
  display: block;
  width: 35px;
  height: 5px;
}

/* Track */
.scrollable::-webkit-scrollbar-track {
  background: #f1f1f1;
  height: 5px;
}

/* Handle */
.scrollable::-webkit-scrollbar-thumb {
  background: #2196f3;
}

/* Handle on hover */
.scrollable::-webkit-scrollbar-thumb:hover {
  background: #673ab7;
}
</style>
<script>
import electron from "electron";

export default {
  data() {
    return {
      dataRaw : [],
      posts: [],
      errors: [],
      loading: true,
      interval:null
    };
  },
  // Fetches posts when the component is created.
  created() {
    electron.ipcRenderer.on('server-list-update-async', (event, servers, intervalStore)=>{
      this.loading = false
      this.dataRaw = servers
      this.posts = this.dataRaw.filter((server)=>{return (server.sessionUsers.length>1) || (server.sessionUsers.length==1&&!server.headlessHost) && server.activeUsers > 0})
      console.log(intervalStore)
      
    if (intervalStore.length>1){
      for (let item of intervalStore){
        if (item != this.interval)
          clearInterval(item)
      }
    }
    })
    electron.ipcRenderer.send('fetch-server-list-async')
    this.interval = setInterval(()=>{
      electron.ipcRenderer.send('fetch-server-list-async', this.interval)
      console.log("THIS",this.interval)
    }, 15000)
  }
};
</script>