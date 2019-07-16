import router from './router'
import store from './store'
import { title } from './settings'
// import cookie from 'js-cookie'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
let hasRoles = '' // 临时权限可删

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = to.meta.title || title
  // const hasToken = cookie.get('token') // 权限登录控制不可删
  const hasToken = 'oiewuotuetiuosjglsj-kgslgjljgtukh3k5h235kk35ln-poiejndkaiikgngnj_jbqghahjkahkahkfahfkh4jjkhabnbnbzbab-993_ihksdhgkshskhgs'
  if (hasToken) {
    // debugger;
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // const hasRoles = store.getters.userlogin && store.getters.userlogin.length > 0 // 权限登录控制不可删
      if (hasRoles) {
        next()
      } else {
        try {
          // const ary = await store.dispatch('getuserole', hasToken); // 权限登录控制不可删
          // const accessRoutes = await store.dispatch('generateRoutes', [ary, ...[]]) // 权限登录控制不可删
          const accessRoutes = await store.dispatch('generateRoutes', ['admin'])
          hasRoles = 'admin'
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          await store.dispatch('resetToken')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
