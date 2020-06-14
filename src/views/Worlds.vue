<template>
  <div class="scrollable">
    <v-container>
      <!--Filtering-->
      <v-card
        class="pa-md-4 mx-lg-auto"
        minHeight="5em"
      >Displaying {{posts.length}}/{{dataRaw.length}} worlds.</v-card>
      <v-card minHeight="2em">
        <div class="host">Creator</div>
        <div class="version">Visits</div>
        <div class="playercount"></div>
      </v-card>
      <!--Data-->
      <v-skeleton-loader v-if="loading" height="94" type="table-heading"></v-skeleton-loader>
      <v-expansion-panels>
        <v-expansion-panel v-for="item in posts" :key="item.id">
          <v-expansion-panel-header class="header" :color="item.verified?'':''">
            <h3>
              <span>{{item.name}}</span>
              <v-tooltip top open-delay="500">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" color="success" v-if="item.featured">mdi-check-decagram</v-icon>
                </template>
                <span>Official Server</span>
              </v-tooltip>
            </h3>
            <p class="host">{{item.ownerName}}</p>
            <p class="version">{{item.visits}}</p>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
           <v-img
              :src="item.thumbnail?item.thumbnail:'https://via.placeholder.com/1024x512.webp?text=Image+Rendering...'"
              class="serverThumbnail"
            ></v-img>
            <div class="serverDetails">{{item.description}}</div>
            <div class="joinButton">
              <v-btn
                color="primary"
                target="_blank"
                :href="'neos:?world=neosrec:///' + item.ownerId + '/' + item.id"
              >{{'Join World'}}</v-btn>
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
  width: 25px;
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
  border-radius: 10px;
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
      console.log(servers)
      var filteredData = this.dataRaw
      filteredData.forEach(element => {
        let str = element.thumbnailUri
                    var hash = str.substring(
                        str.lastIndexOf("/") + 1,
                        str.lastIndexOf("."))
                        element.thumbnail = `https://cloudxstorage.blob.core.windows.net/assets/${hash}`
        element.featured = element?.submissions && element.submissions[0].featured
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
      "world-list-update-async",
      (event, servers, internalStore) => {
        this.createData(event, servers, internalStore);
      }
    );
    electron.ipcRenderer.send("fetch-world-list-async", null, {"RecordType":"world"});
    this.interval = setInterval(() => {
      electron.ipcRenderer.send("fetch-world-list-async", this.interval,{"RecordType":"world"});
      console.log("THIS", this.interval);
    }, 15000);
  }
};
</script>