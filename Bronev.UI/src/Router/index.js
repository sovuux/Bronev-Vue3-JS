import { createRouter, createWebHistory } from "vue-router";

import RoutesPage from "@/Views/RoutesPage.vue";
import DriversPage from "@/Views/DriversPage.vue";
import SalesPage from "@/Views/SalesPage.vue";
import ReportPage from "@/Views/ReportPage.vue";
import LoginPage from "@/Views/LoginPage.vue";
import PeoplePage from "@/Views/PeoplePage.vue";
import CitiesPage from "@/Views/CitiesPage.vue";

const routes = [
    {
        name: "Login",
        path: '/login',
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
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/home'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");

    if (!token && to.name !== "Login") {
        next({ name: "Login" });
    } else if (token && to.name === "Login") {
        next({ name: "Home" });
    } else {
        next();
    }
});

const checkTokenPeriodically = () => {
    let previousToken = localStorage.getItem("token");

    setInterval(() => {
        const currentToken = localStorage.getItem("token");
        if (!currentToken && previousToken) {
            router.push({ name: "Login" });
        }
        previousToken = currentToken;
    }, 10000);
};


window.addEventListener('storage', (event) => {
    if (event.key === "token" && !event.newValue) {
        router.push({ name: "Login" });
    }
});

checkTokenPeriodically();

export default router;
