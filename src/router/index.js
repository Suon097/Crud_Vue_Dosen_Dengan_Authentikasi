import { createWebHistory, createRouter } from "vue-router";
import Index from "@/pages/Index.vue";
import Create from "@/pages/Create.vue";
import Edit from "@/pages/Edit.vue";





const routes = [
    //{
      //  path: "/",
        //name: "post.index",
        //component: Index,
    //},
    //{
       // path: "/create",
        //name: "post.create",
        //component: Create,
    //},
    //{
      //  path: "/edit/:id",
        //name: "post.edit",
        //component: Edit,
    //}

    {
        path: '/',
        name: 'login',
        component: () => import( /* webpackChunkName: "login" */ '@/pages/Auth/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import( /* webpackChunkName: "register" */ '@/pages/Auth/Register.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import( /* webpackChunkName: "dashboard" */ '@/pages/Dashboard/Index.vue')
    },
     {
        path: "/dosen",
        name: "post.index",
        component: Index,
    },
    {
        path: "/create",
        name: "post.create",
        component: Create,
    },
    {
        path: "/edit/:id",
        name: "post.edit",
        component: Edit,
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;