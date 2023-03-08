import {createStore} from 'vuex'
import Cookie from 'js-cookie'

export default createStore({
        //状态配置项
        state: {
                //状态默认值
                collapseState: 'true',
                //用来保存当前菜单项名称
                currentOptions: null,
                //保存tag对象数据
                tagGroup: [
                        {
                                path: '/',
                                name: 'home',
                                label: '首页',
                                icon: 'homeFilled'
                        }
                ],
                //接收Login组件返回的菜单数据
                menuItem: [],
                token: ''
        },
        //状态控制项
        mutations: {
                //状态所需控制方法
                changeCollapseState( state, payload ) {
                        //取反赋值
                        state.collapseState = !state.collapseState
                },
                menuSelect( state, val ) {
                        //根据接收到对象中name属性值进行判断
                        // val.name === 'home' ? ( state.currentOptions = null ) : ( state.currentOptions = val );
                        //如果接收到对象中name属性值相同
                        if (val.name === 'home') {
                                //让currentOptions为空
                                state.currentOptions = null;
                        } else {
                                //currentOptions为当前接收到的值
                                state.currentOptions = val;
                                //根据当前所接收到的name属性来寻找值相同的tag对象,并使用变量接收返回的结果
                                let result = state.tagGroup.findIndex(item => item.name === val.name);
                                //进行判断如果没有则将val所接收到的tag对象推进去,否则无操作
                                result === -1 ? state.tagGroup.push(val) : ''
                        }
                },
                //控制Tag关闭
                closeTag( state, val ) {
                        //根据当前所接收到的name属性来寻找值相同的tag对象,并使用变量接收返回的结果
                        let tagRes = this.state.tagGroup.findIndex(item => item.name === val.name);
                        //如果值相同,则进行移除
                        state.tagGroup.splice( tagRes, 1 );
                },
                //菜单项获取
                getMenuItem( state, val ) {
                        //将接收到的菜单数据传递到menu
                        state.menuItem = val
                        //处理持久化,将获取到的菜单项以字符串的形式存储在本地
                        localStorage.setItem('menuItem',JSON.stringify(val))
                },
                //利用本地存储的数据实现持久化
                liveMenu(state,router) {
                        //当获取不到本地存储的菜单项数据时取反为真
                        if (!localStorage.getItem('menuItem')){
                                //直接返回当前结果
                                return
                        }
                        //使用常量接收本地获取的菜单项数据
                        const localMenuItem = JSON.parse(localStorage.getItem('menuItem'))
                        //将本地存储的菜单项传递到menuItem
                        state.menuItem = localMenuItem
                        
                        //使用常量接收返回的菜单项的路由
                        const menuRouter = []
                        //使用循环将传入的菜单项所包含的url属性值进行模板字符串拼接成对应的组件路径
                        localMenuItem.forEach(item => {
                                //如果有子菜单项
                                if (item.children) {
                                        //使用map将子菜单项的url提取为新的数组
                                        item.children = item.children.map(item => {
                                                //将菜单项中的url对应的组件名使用模板字符串整合为路径
                                                let viewPath = `../views/${item.url}.vue`
                                                //根据返回的组件路径进行导入
                                                item.component = () => import(viewPath)
                                                //将菜单项返回
                                                return item
                                        })
                                        //推送菜单项数据到menuRouter
                                        menuRouter.push(...item.children)
                                } else {
                                        //没有子菜单项直接进行模板字符串整合导入
                                        let viewPath = `../views/${item.url}.vue`
                                        item.component = () => import(viewPath)
                                        menuRouter.push(item)
                                }
                        })
                        //将接收到的菜单项进行遍历
                        menuRouter.forEach(item => {
                                //将菜单项所提供的路由传递到根路由
                                router.addRoute('Home',item)
                        })
                },
                //清除菜单项
                clearMenuItem(state) {
                        //置空menuItem
                        state.menuItem = []
                        //移除本地存储的菜单项
                        localStorage.removeItem('menuItem')
                },
                //设置token
                setToken(state,val) {
                        //将获取到的guid注入到token
                        state.token = val
                        //通过js-cookie设置token
                        Cookie.set('token',val)
                },
                //清除token
                clearToken(state) {
                        state.token = ''
                        Cookie.remove('token')
                },
                //获取token
                getToken(state) {
                        state.token = state.token || Cookie.get('token')
                }
        }
})