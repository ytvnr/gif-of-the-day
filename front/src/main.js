import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { firestorePlugin } from 'vuefire';
import './../node_modules/bulma/css/bulma.css';
import UserService from "./services/user.service";

Vue.config.productionTip = false;

Vue.use(firestorePlugin);

Vue.prototype.$userService = new UserService();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
