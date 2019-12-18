import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import { firestorePlugin } from 'vuefire';
import App from './App.vue';
import router from './router';
import './../node_modules/bulma/css/bulma.css';
import store from '@/store';

firebase.initializeApp(require('./firebaseConfig.json'));
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(firestorePlugin);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch('autoLoginAction', user);
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
