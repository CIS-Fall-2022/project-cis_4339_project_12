import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: () => import('../views/dashboard.vue')
    },
    {
        path: '/intakeform',
        name: 'intakeForm',
        component: () => import('../views/client/clientIntake.vue')
    },
    {
        path: '/findclient',
        name: 'findClient',
        component: () => import('../views/client/clientSearch.vue')
    },
    {
        path: '/updateclient/:id',
        name: 'updateclient',
        props: true,
        component: () => import('../views/client/clientUpdate.vue')
    },
    {
        path: '/eventform',
        name: 'eventform',
        component: () => import('../views/event/eventIntake.vue')
    },
    {
        path: '/findEvents',
        name: 'findEvents',
        component: () => import('../views/event/eventSearch.vue')
    },
    {
        path: '/eventDetails/:id',
        name: 'eventdetails',
        props: true,
        component: () => import('../views/event/eventUpdate.vue')
    }
]
const router = createRouter({
    history: createWebHistory(), routes
})
export default router