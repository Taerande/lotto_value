import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import(/* webpackChunkName: "423123" */ '@/components/Home.vue');


Vue.use(VueRouter);
const routes = [
    {
        path:'/',
        name:'Home2',
        component: Home,
    },
]


const router = new VueRouter({
    mode: 'history',
    routes,
  });

export default router;