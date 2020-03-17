import Vue from 'vue';
import Vuex from 'vuex';
import { firestorePlugin } from 'vuefire';
import App from './App.vue';
import router from './router';
import store from '@/store';
import vuetify from './plugins/vuetify';
import firebase from './firebase/init';
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false;

Vue.use(Vuelidate);
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
