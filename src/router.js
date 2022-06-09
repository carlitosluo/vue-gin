import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';

// eslint-disable-next-line import/no-self-import
import router from '@/router';

import userRoutes from './router/module/user';
import Home from './views/Home.vue';


Vue.use(Router);
// 获取原型对象上的push函数
const originalPush = Router.prototype.push;
// 修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    ...userRoutes,
  ],
});
router.beforeEach((to, from, next) => {
  if (to.meta.auth) { // 判断是否需要登录
    if (store.state.userModule.token) {
      next();
    } else {
      // 跳转登录
      router.push({ name: 'login' });
    }
  } else {
    next();
  }
});
