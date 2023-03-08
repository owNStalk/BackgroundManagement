import Mock from 'mockjs'

export default {
        getMenu: config => {
                const { username, password } = JSON.parse(config.body)
                // 先判断用户是否存在
                // 判断账号和密码是否对应
                if (username === 'admin' && password === 'admin') {
                        return {
                                code: 200,
                                data: {
                                        menuItem: [
                                                {
                                                        path: '/home',
                                                        name: 'home',
                                                        label: '首页',
                                                        icon: 'HomeFilled',
                                                        url: 'home/Home'
                                                },
                                                {
                                                        path: '/user',
                                                        name: 'user',
                                                        label: '用户管理',
                                                        icon: 'UserFilled',
                                                        url: 'user/User'
                                                },
                                                {
                                                        path: '/item',
                                                        name: 'item',
                                                        label: '物品管理',
                                                        icon: 'shop',
                                                        url: 'item/Item'
                                                },
                                                {
                                                        path: '/other',
                                                        label: '其他',
                                                        icon: 'LocationFilled',
                                                        children: [
                                                                {
                                                                        path: '/page1',
                                                                        name: 'page1',
                                                                        label: '页面1',
                                                                        icon: 'setting',
                                                                        url: 'other/page1'
                                                                },
                                                                {
                                                                        path: '/page2',
                                                                        name: 'page2',
                                                                        label: '页面2',
                                                                        icon: 'setting',
                                                                        url: 'other/page2'
                                                                }
                                                        ],
                                                },
                                        ],
                                        //随机生成令牌码
                                        token: Mock.Random.guid(),
                                        message: '获取成功'
                                }
                        }
                } else if (username === 'testUser' && password === 'testUser') {
                        return {
                                code: 200,
                                data: {
                                        menuItem: [
                                                {
                                                        path: '/home',
                                                        name: 'home',
                                                        label: '首页',
                                                        icon: 'HomeFilled',
                                                        url: 'home/Home'
                                                },
                                                {
                                                        path: '/item',
                                                        name: 'item',
                                                        label: '物品管理',
                                                        icon: 'shop',
                                                        url: 'item/Item'
                                                },
                                        ],
                                        token: Mock.Random.guid(),
                                        message: '获取成功'
                                }
                        }
                } else {
                        return {
                                code: -999,
                                data: {
                                        message: '密码错误'
                                }
                        }
                }
        }
}
