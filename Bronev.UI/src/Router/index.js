import { createRouter, createWebHistory } from "vue-router";

import RoutesPage from "@/components/UIComponents/Views/RoutesPage.vue";
import DriversPage from "@/components/UIComponents/Views/DriversPage.vue";
import SalesPage from "@/components/UIComponents/Views/SalesPage.vue";
import ReportPage from "@/components/UIComponents/Views/ReportPage.vue";
import LoginPage from "@/components/UIComponents/Views/LoginPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: LoginPage
        },
        {
            path: '/home',
            component: SalesPage
        },
        {
            path: '/routes',
            component: RoutesPage
        },
        {
            path: '/drivers',
            component: DriversPage
        },
        {
            path: '/report',
            component: ReportPage
        }
    ]
})
export default router