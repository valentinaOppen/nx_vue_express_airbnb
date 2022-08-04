import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import isAuthenticatedGuard from '../modules/auth/router/auth-guard.guard';
import authRouter from '../modules/auth/router/index';
import { useAuthStore } from '../modules/auth/store/auth.store';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),    
    beforeEnter: [ isAuthenticatedGuard ]
  },
  {
    path: '/about',
    name: 'About',    
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/auth',
    ...authRouter
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page 
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
      authStore.returnUrl = to.fullPath;
      return '/login';
  }
});

export default router;
