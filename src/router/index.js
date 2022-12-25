import Vue from "vue";
import VueRouter from "vue-router";

const Home = () => import(/* webpackChunkName: "lotto_value" */ '@/components/Home.vue');
const Lotto = () => import(/* webpackChunkName: "lotto_value" */ '@/components/Lotteries/Lotto.vue');
const LottoResult = () => import(/* webpackChunkName: "lotto_value" */ '@/components/Lotteries/LottoResult.vue');
const PensionResult = () => import(/* webpackChunkName: "lotto_value" */ '@/components/Lotteries/PensionResult.vue');
const Pension  = () => import(/* webpackChunkName: "lotto_value" */ '@/components/Lotteries/Pension.vue');
const Test  = () => import(/* webpackChunkName: "lotto_value" */ '@/components/Test.vue');
const NotFound  = () => import(/* webpackChunkName: "lotto_value" */ '@/components/NotFound.vue');


Vue.use(VueRouter);
const routes = [
    {
        path:'/',
        name:'Home',
        component: Home,
    },
    {
        path:'/test',
        name:'Test',
        component: Test,
    },
    {
        path:'/lotto',
        name:'Lotto',
        component: Lotto,
    },
    {
        path:'/lotto-result',
        name:'LottoResult',
        component: LottoResult,
    },
    {
        path:'/pension',
        name:'Pension',
        component: Pension,
    },
    {
        path:'/pension-result',
        name:'PensionResult',
        component: PensionResult,
    },
    {
        path:'*',
        name:'404',
        component: NotFound,
    },
]
const router = new VueRouter({
    mode: 'history',
    routes,
  });

export default router;