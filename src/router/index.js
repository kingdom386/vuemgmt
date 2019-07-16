import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/index'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import ('@/views/login/index'),
    hidden: true
  }, {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import ('@/views/main/index'),
        name: '首页',
        meta: {
          title: '首页',
          icon: 'el-icon-s-promotion',
          affix: true
        }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/rights',
    component: Layout,
    redirect: '/rights/index',
    alwaysShow: true,
    name: '账户类',
    meta: {
      title: '账户类',
      icon: 'el-icon-s-claim'
    },
    children: [
      {
        path: 'index',
        component: () => import ('@/views/main/index'),
        name: '子账户信息查询',
        meta: {
          title: '子账户信息查询',
          roles: ['admin']
        }
      }
    ]
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
