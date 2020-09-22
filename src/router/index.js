import Vue from 'vue';
import VueRouter from 'vue-router';
import modules from '@/modules';
import baseRoutes from './base';

const modulesRoutes = Object.values(modules).reduce((agg, module) => agg.concat(module.routes), []);

const routes = [...baseRoutes, ...modulesRoutes];

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
