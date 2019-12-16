import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import { firestorePlugin } from 'vuefire';
import App from './App.vue';
import router from './router';
import './../node_modules/bulma/css/bulma.css';
import store from '@/store';

firebase.initializeApp(require('./firebaseConfig.json'));

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(firestorePlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
