import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import About from '../views/About.vue';
import Logout from '../views/Logout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { requireAuth: true },
    component: Home
  },
  {
    path: '/logout',
    name: 'logout',
    meta: { requireAuth: true },
    component: Logout
  },
  {
    path: '/login',
    name: 'login',
    meta: { requireAuth: false },
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    meta: { requireAuth: false },
    component: About
  },
  {
    path: '/teams',
    name: 'teams',
    meta: { requireAuth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Teams.vue')
  },
  {
    path: '/gifs',
    name: 'gifs',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "about" */ '../views/Gifs.vue')
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = store.getters.user;

  const requireAuth = to.matched.some(record => record.meta.requireAuth);

  if (requireAuth && !currentUser) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
