import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from '@/firebase/init';
import store from '@/store';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import About from '../views/About.vue';
import Faq from '../views/Faq.vue';
import Logout from '../views/Logout.vue';
import adminRoutes from './admin';
import Admin from '../views/Admin.vue';


Vue.use(VueRouter);

const routes = [
    {
        path: '/admin',
        name: 'admin',
        meta: {
            requireAuth: true,
            requireAdmin: true,
            requireOrganization: false,
            requireTeam: false,
        },
        component: Admin,
        children: [...adminRoutes],
    },
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
];

const router = new VueRouter({
    routes,
});

router.beforeEach(async (to, from, next) => {
    const requireAuth = to.matched.some((record) => record.meta.requireAuth);
    const requireTeam = to.matched.some((record) => record.meta.requireTeam);
    const requireAdmin = to.matched.some((record) => record.meta.requireAdmin);

    if (requireAdmin) {
        if (
            store.state &&
            store.state.role &&
            store.state.role.includes('admin')
        ) {
            next();
        } else {
            next('/');
        }
    }

    // When accessing a page that need an organization and no user, then login
    if (requireAuth && !(await firebase.getCurrentUser())) {
        next('login');
    } else {
        if (requireTeam && !store.state.assignedTeamId) {
            next('/');
        } else {
            next();
        }
    }
});

export default router;
