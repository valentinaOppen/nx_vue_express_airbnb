export default {

  name: 'auth',
  // component: () => import(/* webpackChunkName: "Auth Layout" */ '@/modules/auth/layouts/AuthLayout.vue'),
  component: () => import('../layouts/AuthLayout.vue'),
  children: [
     {
         path: '',
         name: 'login',
        //  component: () => import(/* webpackChunkName: "Login" */ '@/modules/auth/views/Login.vue'),         
        component: () => import('../views/Login.vue')
     },
     {
         path: '/register',
         name: 'register',
        //  component: () => import(/* webpackChunkName: "Register" */ '@/modules/auth/views/Register.vue'),
        component: () => import('../views/Register.vue')

     }
  ]

}