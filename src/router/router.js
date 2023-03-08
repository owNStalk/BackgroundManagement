import { createRouter, createWebHashHistory } from 'vue-router'

const routes=[
        {
                path: '/',
                component: ()=>import ('../views/MainView.vue'),
                name: 'Home',
                redirect: '/home',
                /*children: [
                        {
                                path: '/home',
                                name: 'home',
                                component: ()=>import('../views/home/Home.vue'),
                        },
                        {
                                path: '/user',
                                name: 'user',
                                component: ()=>import('../views/user/User.vue'),
                        },
                        {
                                path: '/item',
                                name: 'item',
                                component: ()=>import('../views/item/Item.vue'),
                        },
                        {
                                path: '/page1',
                                name: 'page1',
                                component: ()=>import('../views/other/Page1.vue'),
                        },
                        {
                                path: '/page2',
                                name: 'page2',
                                component: ()=>import('../views/other/Page2.vue'),
                        },
                ]*/
                //置空,用来接收传递过来的路由
                children: []
        },
        {
                path: '/login',
                name: 'login',
                component: () => import('../views/login/Login.vue'),
        }
]

const router = createRouter({
        history: createWebHashHistory(),
        routes
})

export default router