import Dashboard from '../views/admin/Dashboard.vue';
import Organizations from '../views/admin/Organizations.vue';
import Teams from '../views/admin/Teams.vue';

const adminRoutes = [
    {
        path: '',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: 'organisations',
        name: 'organisations',
        component: Organizations,
    },
    {
        path: 'teams',
        name: 'teams',
        component: Teams,
    },
    {
        path: 'users',
        name: 'users',
        component: Dashboard,
    },
];

export default adminRoutes;
