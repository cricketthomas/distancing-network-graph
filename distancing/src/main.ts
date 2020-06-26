import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueCompositionApi from '@vue/composition-api';

import './registerServiceWorker';


//import { Dialog } from 'buefy'
import buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(buefy)


// set the theme
localStorage.setItem('lightMode', 'false');
document.body.setAttribute("data-theme", "dark");

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
