<template>
  <v-navigation-drawer permanent clipped width="15em" height="100vh" dark>
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
  height: 100vh;
}
</style>
<script>
export default {
  name: "SettingSideBar",
  data() {
    return {
      items: [
        { title: "Account", icon: "mdi-Account", path: "Index" }
      ]
    };
  }
};
</script>
