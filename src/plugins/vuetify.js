import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: '#2196f3',
        secondary: '#3f51b5',
        accent: '#673ab7',
        error: '#f44336',
        warning: '#ffc107',
        info: '#00bcd4',
        success: '#8bc34a',
      },
      light: {
        primary: '#2196f3',
        secondary: '#3f51b5',
        accent: '#673ab7',
        error: '#f44336',
        warning: '#ffc107',
        info: '#00bcd4',
        success: '#8bc34a',
      },
    },
  },
});
