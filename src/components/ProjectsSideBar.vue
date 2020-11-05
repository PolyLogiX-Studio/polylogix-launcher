<template>
  <v-navigation-drawer permanent expand-on-hover clipped width="15em" height="calc(100vh - 64px);" dark>
    <v-list nav>
      <v-list-item v-for="item in items" :key="item.title" :to="item.path" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<style>
.v-navigation-drawer {
  height: calc(100vh - 64px);
  overflow: auto;
}
</style>
<script>
export default {
  name: "ProjectsSideBar",
  data() {
    return {
      items: [
        { title: "PolyLogiX Launcher", icon: "mdi-chart-tree", path: "Index" },
        { title: "HeadlessCORE", icon: "mdi-server", path: "Headless" },
        { title: "Gunlight Online", icon: "mdi-pistol", path: "Gunlight" },
        { title: "NeosDB", icon: "mdi-database-search", path: "NeosDB" },
        { title: "Streaming", icon: "mdi-monitor-screenshot", path: "Streaming" }
      ]
    };
  }
};
</script>
