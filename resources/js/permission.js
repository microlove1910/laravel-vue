import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

var getPermissionCount = 0;

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)
    // determine whether the user has logged in
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({path: '/'})
            NProgress.done()
        } else {
            if ((store.getters.addRoutes === undefined || store.getters.addRoutes.length === 0) && getPermissionCount < 2) {
                try {
                    const {roles, permissions} = await store.dispatch('user/getInfo')
                    getPermissionCount++

                    const accessRoutes = await store.dispatch('permission/generateRoutes', {roles, permissions})

                    router.addRoutes(accessRoutes)
                    if (store.getters.user == null) {
                        if (whiteList.indexOf(to.path) !== -1) {
                            next()
                        } else {
                            next(`/login?redirect=${to.path}`)
                            NProgress.done()
                        }
                    } else {
                        next({...to, replace: true})
                    }
                } catch (error) {
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            } else {
                // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
                if (store.getters.permission_route_paths.indexOf(to.path) !== -1) {
                    next()
                } else {
                    next({path: '/401', replace: true, query: {noGoBack: true}})
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
    // finish progress bar
    NProgress.done()
})
