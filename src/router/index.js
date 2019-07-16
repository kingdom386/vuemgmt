import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/index'

Vue.use(Router)

export const constantRoutes = [
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
        component: () => import ('@/views/count/checkSubCount'),
        name: '子账户信息查询',
        meta: {
          title: '子账户信息查询',
          roles: ['admin']
        }
      }, {
        path: 'customesign',
        component: () => import ('@/views/count/checkCustome'),
        name: '客户签约信息查询',
        meta: {
          title: '客户签约信息查询',
          roles: ['admin']
        }
      }, {
        path: 'bindmoney',
        component: () => import ('@/views/count/checkbBindMoney'),
        name: '子账户绑定出入金结果查询',
        meta: {
          title: '子账户绑定出入金结果查询',
          roles: ['admin']
        }
      }, {
        path: '/bussiness',
        component: () => import ('@/views/count/checkBusiness'),
        name: '商户信息查询',
        meta: {
          title: '商户信息查询',
          roles: ['admin']
        }
      }
    ]
  }, {
    path: '/pay',
    component: Layout,
    redirect: '/pay/index',
    alwaysShow: true,
    name: '资金支付类',
    meta: {
      title: '资金支付类',
      icon: 'el-icon-s-finance'
    },
    children: [
      {
        path: '/index',
        component: () => import ('@/views/pay/checkBatchPay'),
        name: '批量支付结果查询',
        meta: {
          title: '批量支付结果查询',
          roles: ['admin']
        }
      }, {
        path: '/settled',
        component: () => import ('@/views/pay/checkInterestSettled'),
        name: '批量结息结果查询',
        meta: {
          title: '批量结息结果查询',
          roles: ['admin']
        }
      }
    ]
  }, {
    path: "/money",
    component: Layout,
    redirect: '/money/index',
    alwaysShow: true,
    name: '出入金类',
    meta: {
      title: '出入金类',
      icon: 'el-icon-s-data'
    },
    children: [
      {
        path: 'index',
        component: () => import ('@/views/golden/checkGolden'),
        name: '商户本行出金审核结果查询',
        meta: {
          title: '商户本行出金审核结果查询',
          roles: ['admin']
        }
      }, {
        path: 'auth',
        component: () => import ('@/views/golden/checkAuthor'),
        name: '客户授权协议查询',
        meta: {
          title: '客户授权协议查询',
          roles: ['admin']
        }
      }, {
        path: '/elcrz',
        component: () => import ('@/views/golden/checkElcRz'),
        name: '991转账入金电子账户查询',
        meta: {
          title: '991转账入金电子账户查询',
          roles: ['admin']
        }
      }, {
        path: '/elcrzdr',
        component: () => import ('@/views/golden/checkElcRzDs'),
        name: '991转账入金待入账信息查询',
        meta: {
          title: '991转账入金待入账信息查询',
          roles: ['admin']
        }
      }
    ]
  }, {
    path: "/other",
    component: Layout,
    redirect: '/other/index',
    alwaysShow: true,
    name: '其他功能类',
    meta: {
      title: '其他功能类',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'countbalance',
        component: () => import ('@/views/others/checkcountbalance'),
        name: '账户余额查询',
        meta: {
          title: '账户余额查询',
          roles: ['admin']
        }
      }, {
        path: 'balancedetail',
        component: () => import ('@/views/others/checksubcountdetail'),
        name: '子账户交易明细查询',
        meta: {
          title: '子账户交易明细查询',
          roles: ['admin']
        }
      }, {
        path: 'paystate',
        component: () => import ('@/views/others/checkpaystate'),
        name: '支付单状态查询',
        meta: {
          title: '支付单状态查询',
          roles: ['admin']
        }
      }, {
        path: 'accrual',
        component: () => import ('@/views/others/checkcountinterest'),
        name: '账户计息查询',
        meta: {
          title: '账户计息查询',
          roles: ['admin']
        }
      }, {
        path: 'tradingflow',
        component: () => import ('@/views/others/checkcountflowing'),
        name: '子账户交易流水查询',
        meta: {
          title: '子账户交易流水查询',
          roles: ['admin']
        }
      }, {
        path: 'tradingdetail',
        component: () => import ('@/views/others/checktradingdetail'),
        name: '子账户交易明细查询',
        meta: {
          title: '子账户交易明细查询',
          roles: ['admin']
        }
      }, {
        path: 'daytrading',
        component: () => import ('@/views/others/checkdaytrade'),
        name: '存管户当日交易明细查询',
        meta: {
          title: '存管户当日交易明细查询',
          roles: ['admin']
        }
      }, {
        path: 'historytrading',
        component: () => import ('@/views/others/checkhistorytrade'),
        name: '存管户历史交易明细查询',
        meta: {
          title: '存管户历史交易明细查询',
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
