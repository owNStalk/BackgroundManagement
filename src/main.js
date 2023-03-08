import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/router"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store/indexState.js'
import './api/mock.js'
import api from './api/api.js'
import 'element-plus/theme-chalk/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import ElementPlus from 'element-plus'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
}
app.config.globalProperties.$api = api
store.commit('liveMenu',router);
function checkRouter(path) {
        //获取当前路由的数量
        let currentRouter = router.getRoutes().filter(route => route.path === path).length
        //如果数量符合
        return !!currentRouter;
}
router.beforeEach((to, from, next) => {
        store.commit('getToken')
        //取到token
        const token = store.state.token;
        //如果没有token,并且要去的页面不为login
        if (!token && to.name !== 'login'){
                //那么直接回到login
                next({name: 'login'})
        } else if(!checkRouter(to.path)){
                //如果path对不上直接跳转到home
                next({name: 'home'})
        }else {
                next()
        }
})
app.use(router).use(store).use(ElementPlus,{
        locale: zhCn
})
app.mount('#app')
