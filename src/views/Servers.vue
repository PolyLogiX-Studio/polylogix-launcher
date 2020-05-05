<template>
  <div class="scrollable">
    <v-container>
      <v-card minHeight="5em">

        Displaying {{posts.length}}/{{dataRaw.length}} Servers.
      </v-card>
      <v-skeleton-loader v-if="loading" height="94" type="table-heading"></v-skeleton-loader>
      <v-expansion-panels>
        <v-expansion-panel v-for="item in posts" :key="item.sessionId">
          <v-expansion-panel-header class="header">
            <h3>
             
              <v-icon v-if="item.headlessHost" :color="item.headlessCORE?'primary':''">mdi-server</v-icon>
              <v-icon v-if="item.mobileFriendly">mdi-cellphone-iphone</v-icon>
              <v-icon v-if="item.plugins" :color="item.pluginMatchStatus">mdi-toy-brick-plus</v-icon>
              <v-icon v-if="item.warning" :color="item.warningSeverity">mdi-account-arrow-right-outline</v-icon>
              {{item.name}}
               <v-icon color="success" v-if="item.verified">mdi-check-decagram</v-icon>
            </h3>
            <p class="host">{{item.hostUsername}}</p>
            {{item.sessionUsers.length}}/{{item.maxUsers}}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-img :src="item.thumbnail"></v-img>
            <div class="joinButton">
              <v-btn
                color="primary"
                target="_blank"
                :href="'neos:?world=neos-session://' + item.sessionId"
              >Join Server</v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>
<style>
.userList {
  position: absolute;
  right: 510px;
  top: 0;
}
.host {
  position: absolute;
  right: 510px;
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
      dataRaw: [],
      posts: [],
      errors: [],
      loading: true,
      interval: null
    };
  },
  // Fetches posts when the component is created.
  created() {
    electron.ipcRenderer.on(
      "server-list-update-async",
      (event, servers, intervalStore) => {
        this.loading = false;
        this.dataRaw = servers;
        let filteredData = this.dataRaw.filter(server => {
          return (
            server.sessionUsers.length > 1 ||
            (server.sessionUsers.length == 1 &&
              !server.headlessHost &&
              server.activeUsers > 0)
          );
        });
        filteredData.forEach(element => {
          element.headlessCORE = false
          if (element.awaySince){
            element.warning = "Away"
          }
          if (element.hostUserId=="U-FrooxLess")
            element.verified = true
        });
        this.posts = filteredData
        console.log(intervalStore);

        if (intervalStore.length > 1) {
          for (let item of intervalStore) {
            if (item != this.interval) clearInterval(item);
          }
        }
      }
    );
    electron.ipcRenderer.send("fetch-server-list-async");
    this.interval = setInterval(() => {
      electron.ipcRenderer.send("fetch-server-list-async", this.interval);
      console.log("THIS", this.interval);
    }, 15000);
  }
};
</script>