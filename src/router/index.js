import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import authService from 'src/services/authService'

export default route(function (/* { store, ssrContext } */) {
    const createHistory = process.env.SERVER
        ? createMemoryHistory
        : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

    const Router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,
        history: createHistory(process.env.VUE_ROUTER_BASE)
    })

    Router.beforeEach(async (to, from, next) => {
        const auth = authService()

        if (to.matched.some(record => record.meta.requiresAuth)) {
            if (!auth.isAuthenticated.value) {
                next({ name: 'login' })
            } else {
                const tokenValid = await auth.verifyToken()
                if (!tokenValid) {
                    next({ name: 'login' })
                } else {
                    next()
                }
            }
        } else {
            next()
        }
    })

    return Router
})
