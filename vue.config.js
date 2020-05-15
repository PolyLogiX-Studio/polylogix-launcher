module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions:{
    electronBuilder: {
      builderOptions: {
        win: {
          icon: './src/assets/icon.ico',
          "publish": [
            {
              "provider": "github",
              "owner": "PolyLogiX-Studio",
             "repo": "polylogix-launcher"
            }
          ]
        }
      }
    },
  }
}
