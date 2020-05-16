<template>
  <div class="scrollable">
    <v-container>
      <!--Filtering-->
      <v-card
        minHeight="5em"
      >Displaying {{posts.length}}/{{dataRaw.length}} Servers across {{versions.length}} Neos build{{versions.length>1?'s':''}}.</v-card>
      <v-card minHeight="2em">
        <div class="host">HOST</div>
        <div class="version">VERSION</div>
        <div class="playercount">Users</div>
      </v-card>
      <!--Data-->
      <v-skeleton-loader v-if="loading" height="94" type="table-heading"></v-skeleton-loader>
      <v-expansion-panels>
        <v-expansion-panel v-for="item in posts" :key="item.sessionId">
          <v-expansion-panel-header class="header" :color="item.verified?'':''">
            <h3>
              <v-tooltip top open-delay="500">
                <template v-slot:activator="{ on }">
                  <v-icon
                    v-if="item.headlessHost"
                    v-on="on"
                    :color="item.headlessCORE?'primary':''"
                  >mdi-server</v-icon>
                </template>
                <span>{{item.headlessCORE?'PolyLogiX':''}} Headless Client</span>
              </v-tooltip>
              <v-tooltip top open-delay="500">
                <template v-slot:activator="{ on }">
                  <v-icon v-if="item.steamProtocol" v-on="on">mdi-steam</v-icon>
                </template>
                <span>Steam Protocol Enabled</span>
              </v-tooltip>
              <v-tooltip top open-delay="500">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" v-if="item.mobileFriendly">mdi-cellphone-iphone</v-icon>
                </template>
                <span>Mobile Friendly</span>
              </v-tooltip>
              <v-tooltip top open-delay="500">
                <template v-slot:activator="{ on }">
                  <v-icon
                    v-on="on"
                    v-if="item.plugins"
                    :color="item.pluginMatchStatus"
                  >mdi-toy-brick-plus</v-icon>
                </template>
                <span>Plugins Enabled</span>
              </v-tooltip>
              <v-tooltip top open-delay="500">
                <template v-slot:activator="{ on }">
                  <v-icon
                    v-on="on"
                    v-if="item.warning&&!item.headlessHost"
                    :color="item.warningSeverity"
                  >mdi-account-arrow-right-outline</v-icon>
                </template>
                <span>{{item.hostUsername}} went Elsewhere {{timeSince(new Date(item.awaySince))}} ago</span>
              </v-tooltip>

              <span>{{item.name}}</span>
              <v-tooltip top open-delay="500">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" color="success" v-if="item.verified">mdi-check-decagram</v-icon>
                </template>
                <span>Official Server</span>
              </v-tooltip>
            </h3>
            <p class="host">{{item.hostUsername}}</p>
            <p class="version">{{item.neosVersion}}</p>
            {{item.headlessHost?item.sessionUsers.length - 1+'/'+String(parseInt(item.maxUsers) - 1):item.sessionUsers.length+'/'+item.maxUsers}}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-img
              :src="item.thumbnail?item.thumbnail:'https://via.placeholder.com/1024x512.webp?text=Image+Rendering...'"
              class="serverThumbnail"
            ></v-img>

            <v-container class="userList">
              <v-row class="userListItem" no-gutters :key="n.userId" v-for="n of item.sessionUsers">
                <v-card class="pa-2 userListItem" outlined tile>
                  <v-tooltip top open-delay="500">
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on" v-if="n.userID==item.hostUserId" color="yellow">mdi-crown</v-icon>
                    </template>
                    <span>Host</span>
                  </v-tooltip>
                  <v-tooltip top open-delay="500">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        v-if="item.headlessHost&&n.userID==item.hostUserId"
                        v-on="on"
                        :color="item.headlessCORE?'primary':''"
                      >mdi-server</v-icon>
                    </template>
                    <span>{{item.headlessCORE?'PolyLogiX':''}} Headless Client</span>
                  </v-tooltip>
                  {{n.username}}
                </v-card>
              </v-row>
            </v-container>
            <div class="serverDetails">{{item.description}}</div>
            <div class="joinButton">
              <v-btn
                :disabled="item.serverFull"
                color="primary"
                target="_blank"
                :href="'neos:?world=neos-session://' + item.sessionId"
              >{{item.serverFull?'Server Full':'Join Server'}}</v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>
<style>
.serverDetails {
  width: 30em;
  float: left;
  min-height: 5em;
}
.serverThumbnail {
  width: 40em;
  float: left;
}
.userList {
  float: right;
  right: 0;
  width: 20em;
  max-height: 18em;
  min-height: 18em;
  height: 18em;
  padding-bottom: 15px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.userList::-webkit-scrollbar {
  overflow-y: scroll;
  display: block;
  width: 5px;
  height: 5px;
}

/* Track */
.userList::-webkit-scrollbar-track {
  background: #f1f1f1;
  height: 5px;
}

/* Handle */
.userList::-webkit-scrollbar-thumb {
  background: #2196f3;
}

/* Handle on hover */
.userList::-webkit-scrollbar-thumb:hover {
  background: #673ab7;
}

.userListItem {
  width: 19em;
}
.playercount {
  right: 40px;
  position: absolute;
}
.host {
  position: absolute;
  right: 510px;
}
.version {
  position: absolute;
  right: 250px;
}
.joinButton {
  position: absolute;
  bottom: 20px;
  right: 20px;
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
      interval: null,
      versions: [],
      tags: [],
      filter: {},
      sort: {}
    };
  },
  methods: {
    timeSince: function timeSince(date) {
      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        return interval + " years";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + " months";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + " days";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    },
    createData: function createData(event, servers, intervalStore = []) {
      this.loading = false;
      this.dataRaw = servers;
      var filteredData = this.dataRaw.filter(server => {
        return (true||
        //Hide Empty
        (
          server.sessionUsers.length > 1 ||
          (server.sessionUsers.length == 1 &&
            !server.headlessHost &&
            server.activeUsers > -1)
        )
        );
      });
      filteredData.forEach(element => {
        element.headlessCORE = false;
        element.serverFull = element.sessionUsers.length >= element.maxUsers;
        if (element.hostUserId == "U-bombitmanbomb") { //Test
          element.headlessCORE = true;
          element.pluginMatchStatus = "success";
          element.plugins = true;
        }
        element.steamProtocol = element.sessionURLs.some(i => {
          return i.startsWith("neos-steam");
        });
        if (element.awaySince) {
          element.warning = "Away";
        }
        if (element.hostUserId == "U-FrooxLess") element.verified = true;
        if (!this.versions.includes(element.neosVersion)) {
          this.versions.push(element.neosVersion);
        }
      });
      this.posts = filteredData.reverse();
      console.log(intervalStore);

      if (intervalStore.length > 1) {
        for (let item of intervalStore) {
          if (item != this.interval) clearInterval(item);
        }
      }
    }
  },

  // Fetches posts when the component is created.
  created() {
    electron.ipcRenderer.on(
      "server-list-update-async",
      (event, servers, internalStore) => {
        this.createData(event, servers, internalStore);
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