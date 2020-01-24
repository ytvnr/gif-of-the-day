import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import { firestorePlugin } from 'vuefire';
import App from './App.vue';
import router from './router';
import store from '@/store';
import vuetify from './plugins/vuetify';

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
  vuetify,
  render: h => h(App)
}).$mount('#app');
