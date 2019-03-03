import Vue from 'vue';

import VueRouter from 'vue-router';
import Dashboard from '../view/dashboard/index.vue';
import ArticleList from '../view/list.vue';
import Admin from '../../../component/layout/admin/index.vue'

Vue.use(VueRouter);

export default function createRouter() {
  return new VueRouter({
    mode: 'history',
    routes: [{
        path: '/admin',
        name:'/admin',
        component: Admin,
        children: [{
            path: 'deal',
            name:'deal',
            component: () => import('../view/goodsDeal/index.vue')
          },
          {
            path: 'input',
            name:'input',
            component: () => import('../view/goodsInput/index.vue')
          },
          {
            path: 'statistics',
            name:'statistics',
            component: () => import('../view/goodsStatistics/index.vue')
          },
          {
            path: 'earning',
            name:'earning',
            component: () => import('../view/goodsEarning/index.vue')
          },
          {
            path: 'expend',
            name:'expend',
            component: () => import('../view/goodsExpend/index.vue')
          },
          {
            path: 'personal',
            name:'personal',
            component: () => import('../view/personal/index.vue')

          }
        ]
      },
      {
        path: '/login',
        name:'login',
        component: () => import('../view/login/index.vue')
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
        path: '*',
        component: () => import('../view/notfound.vue')
      }
    ]
  });
}