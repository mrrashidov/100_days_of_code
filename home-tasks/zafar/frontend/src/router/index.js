import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import('../pages/home.vue'),
    },
    {
        path: "/auth/login",
        name: "login",
        component: () => import('../pages/auth/login.vue'),
    },
    {
        path: "/auth/signup",
        name: "signup",
        component: () => import('../pages/auth/signup.vue'),
    },
    {
        path: "/:catchAll(.*)",
        component: () => import('../pages/not-found.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
