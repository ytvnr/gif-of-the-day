import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import About from '../views/About.vue';
import Logout from '../views/Logout.vue';
import firebase from '@/firebase/init';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        meta: { requireAuth: true },
        component: Home,
    },
    {
        path: '/logout',
        name: 'logout',
        meta: { requireAuth: true },
        component: Logout,
    },
    {
        path: '/login',
        name: 'login',
        meta: { requireAuth: false },
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        meta: { requireAuth: false },
        component: Register,
    },
    {
        path: '/about',
        name: 'about',
        meta: { requireAuth: false },
        component: About,
    },
    {
        path: '/teams',
        name: 'teams',
        meta: { requireAuth: true },
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/Teams.vue'),
    },
    {
        path: '/gifs',
        name: 'gifs',
        meta: { requireAuth: true },
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/Gifs.vue'),
    },
    {
        path: '/schedule',
        name: 'schedule',
        meta: { requireAuth: true },
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/Schedule.vue'),
    },
];

const router = new VueRouter({
    routes,
});

let isFirstTransition = true;

router.beforeEach(async (to, from, next) => {
    const lastRouteName = localStorage.getItem('lastToPath');

    const shouldRedirect = Boolean(
        to.name === 'home' && lastRouteName && isFirstTransition
    );

    if (shouldRedirect) next({ name: lastRouteName });

    const requireAuth = to.matched.some((record) => record.meta.requireAuth);
    if (requireAuth && !(await firebase.getCurrentUser())) {
        next('login');
    } else {
        next();
    }

    isFirstTransition = false;
});

router.afterEach((to) => {
    window.localStorage.setItem('lastToPath', to.name);
});

export default router;
