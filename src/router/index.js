import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/login/Login')
const Index = () => import('../views/index/Index')
const Warning = () => import('../views/index/warning/Warning')
const courseManage = () => import('../views/index/courseManage/courseManage')
const teacher = () => import('../views/index/test/teacher')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/index',
    name: 'Index',
    redirect: '/index/courseManage',
    component: Index,
    children: [
      { path: 'courseManage', name: 'courseManage', component: courseManage },
      { path: 'warning', name: 'Warning', component: Warning },
    ],
  },
  // {
  //   path: '/warning/:id',
  //   component: Index
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // base: '/Student-Personas/',
  routes,
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

//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/teacher',
    component: teacher,
    name: '权限测试',
    meta: { role: ['teacher'] }, //页面需要的权限
  },
]
