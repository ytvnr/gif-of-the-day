import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import About from '../views/About.vue';
import Faq from '../views/Faq.vue';
import Logout from '../views/Logout.vue';
import firebase from '@/firebase/init';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            requireAuth: true,
            requireOrganization: true,
            requireTeam: false,
        },
        component: Home,
    },
    {
        path: '/logout',
        name: 'logout',
        meta: {
            requireAuth: true,
            requireOrganization: false,
            requireTeam: false,
        },
        component: Logout,
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            requireAuth: false,
            requireOrganization: false,
            requireTeam: false,
        },
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            requireAuth: false,
            requireOrganization: false,
            requireTeam: false,
        },
        component: Register,
    },
    {
        path: '/faq',
        name: 'faq',
        meta: {
            requireAuth: false,
            requireOrganization: false,
            requireTeam: false,
        },
        component: Faq,
    },
    {
        path: '/about',
        name: 'about',
        meta: {
            requireAuth: false,
            requireOrganization: false,
            requireTeam: false,
        },
        component: About,
    },
    {
        path: '/teams',
        name: 'teams',
        meta: {
            requireAuth: true,
            requireOrganization: true,
            requireTeam: false,
        },
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/Teams.vue'),
    },
    {
        path: '/gifs',
        name: 'gifs',
        meta: {
            requireAuth: true,
            requireOrganization: true,
            requireTeam: false,
        },
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/Gifs.vue'),
    },
    {
        path: '/schedule',
        name: 'schedule',
        meta: {
            requireAuth: true,
            requireOrganization: true,
            requireTeam: true,
        },
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/Schedule.vue'),
    },
    {
        path: '/not-accepted',
        name: 'not-accepted',
        meta: {
            requireAuth: true,
            requireOrganization: false,
            requireTeam: false,
        },
        component: () =>
            import(
                /* webpackChunkName: "about" */ '../views/ProfileNotAccepted.vue'
            ),
    },
];

const router = new VueRouter({
    routes,
});

let isFirstTransition = true;

router.beforeEach(async (to, from, next) => {
    const lastRouteName = localStorage.getItem('lastToPath');

    const requireAuth = to.matched.some((record) => record.meta.requireAuth);
    const requireOrganization = to.matched.some(
        (record) => record.meta.requireOrganization
    );
    const requireTeam = to.matched.some((record) => record.meta.requireTeam);

    if (requireTeam && !store.state.assignedTeamId) {
        next('/');
    }

    isFirstTransition = false;

    const shouldRedirect = Boolean(
        to.name === 'home' && lastRouteName && isFirstTransition
    );

    // When opening the app, go to last visited page
    if (shouldRedirect) {
        next({ name: lastRouteName });
    }

    // When accessing a page that need an organization and no user, then login
    if (requireAuth && !(await firebase.getCurrentUser())) {
        next('login');
    } else {
        if (requireOrganization && !store.state.organizationId) {
            next('not-accepted');
        } else {
            next();
        }
    }
});

router.afterEach((to) => {
    if (to.name === 'home') {
        window.localStorage.removeItem('lastToPath');
    } else {
        window.localStorage.setItem('lastToPath', to.name);
    }
});

export default router;
