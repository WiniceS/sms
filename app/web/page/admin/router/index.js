import Vue from 'vue';

import VueRouter from 'vue-router';
import Dashboard from '../view/dashboard/index.vue';
import ArticleList from '../view/list.vue';

Vue.use(VueRouter);

export default function createRouter() {
  return new VueRouter({
    mode: 'history',
    base: '/admin/',
    routes: [{
        path: '/',
        component: Dashboard
      },
      {
        path: '/article/list',
        component: ArticleList
      },
      {
        path: '/article/add',
        component: () => import('../view/write/index.vue')
      },
      {
        path: '/article/detail/:id',
        component: () => import('../view/detail.vue')
      },
      {
        path: '/deal',
        component: () => import('../view/goodsDeal/index.vue')
      },
      {
        path: '/input',
        component: () => import('../view/goodsInput/index.vue')
      },
      {
        path: '/statistics',
        component: () => import('../view/goodsStatistics/index.vue')
      },
      {
        path: '/earning',
        component: () => import('../view/goodsEarning/index.vue')
      },
      {
        path: '/expend',
        component: () => import('../view/goodsExpend/index.vue')
      },
      {
        path: '/personal',
        component: () => import('../view/personal/index.vue')
      },
      {
        path: '*',
        component: () => import('../view/notfound.vue')
      }
    ]
  });
}