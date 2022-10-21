import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import(/* webpackChunkName: "lotto_value" */ '@/components/Home.vue');


Vue.use(VueRouter);
const routes = [
    {
        path:'/',
        name:'Home',
        component: Home,
    },
]


const router = new VueRouter({
    mode: 'history',
    routes,
  });

export default router;