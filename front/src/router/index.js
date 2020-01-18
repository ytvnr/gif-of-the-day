import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/teams',
    name: 'teams',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Teams.vue')
  },
  {
    path: '/gifs',
    name: 'gifs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Gifs.vue')
  }
];

const router = new VueRouter({
  routes
});

// router.beforeEach((to, from, next) => {
//   //Instead of     const currentUser = firebase.auth.currentUser;  do
//   const currentUser = firebase.auth().currentUser;

//   const requireAuth = to.matched.some(record => record.meta.requireAuth);

//   if (requireAuth && !currentUser) {
//     next({ name: 'Login' });
//   } else if (!requireAuth && currentUser) {
//     next({ name: 'Tasks' });
//   } else {
//     next();
//   }
// });

export default router;
