import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/login/Login')
const Index = () => import('../views/index/Index')
const Warning = () => import('../views/index/warning/Warning')
const courseManage = () => import('../views/index/courseManage/courseManage')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    redirect: '/index/courseManage',
    component: Index,
    children: [
      { path: 'courseManage', component: courseManage },
      { path: 'warning', component: Warning }
    ]
  }
  // {
  //   path: '/warning/:id',
  //   component: Index
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//全局路由守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     return next()
//   }
//   const store = window.sessionStorage.getItem('storeData')
//   if (!store) {
//     return next('/login')
//   }
//   next()
// })

export default router
