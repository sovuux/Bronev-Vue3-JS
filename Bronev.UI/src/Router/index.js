import { createRouter, createWebHistory } from "vue-router";

import RoutesPage from "@/components/UIComponents/Views/RoutesPage.vue";
import DriversPage from "@/components/UIComponents/Views/DriversPage.vue";
import SalesPage from "@/components/UIComponents/Views/SalesPage.vue";
import ReportPage from "@/components/UIComponents/Views/ReportPage.vue";
import LoginPage from "@/components/UIComponents/Views/LoginPage.vue";
import PeoplePage from "@/components/UIComponents/Views/PeoplePage.vue";
import CitiesPage from "@/components/UIComponents/Views/CitiesPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "Login",
            path: '/',
            component: LoginPage
        },
        {
            name: "Home",
            path: '/home',
            component: SalesPage
        },
        {
            name: "Routes",
            path: '/routes',
            component: RoutesPage
        },
        {
            name: "Drivers",
            path: '/drivers',
            component: DriversPage
        },
        {
            name: "Reports",
            path: '/report',
            component: ReportPage
        },
        {
            name: "People",
            path: '/people',
            component: PeoplePage
        },
        {
            name: "Cities",
            path: '/cities',
            component: CitiesPage
        }
    ]
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");

    if (!token) {
        if (to.name !== "Login") {
            next({ name: "Login" });
        }
        else {
            next();
        }
    }
    else {
        if (to.name === "Login") {
            next('/home');
        }
        else {
            next();
        }
    }
});
export default router