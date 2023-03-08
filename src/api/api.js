/*
* 管理项目中所有的api
* */
import request from './request.js'

export default {
        //Home组件左侧表格数据
        getTableData(params) {
                return request({
                        url: '/home/getTableData',
                        method: 'get',
                        data: params,
                        mock: true
                })
        },
        
        //Home组件右上数据
        getSoldData() {
                return request({
                        url: '/home/getSoldData',
                        method: 'get',
                        mock: true
                })
        },
        
        //Home组件右下数据
        getChartData() {
                return request({
                        url: '/home/getChartData',
                        method: 'get',
                        mock: true
                })
        },
        
        //User组件表格数据
        getUserData(params) {
                return request({
                        url: '/user/getUserData',
                        method: 'get',
                        mock: false,
                        data: params
                })
        },
        
        //新增用户
        createUser(params) {
                return request({
                        url: '/user/createUser',
                        method: 'post',
                        mock: false,
                        data: params
                })
        },
        
        //更新数据
        updateUser(params) {
                return request({
                        url: '/user/updateUser',
                        method: 'post',
                        mock: false,
                        data: params
                })
        },
        
        //单数据删除
        deleteUser(params) {
                return request({
                        url: '/user/deleteUser',
                        method: 'get',
                        mock: false,
                        data: params
                })
        },
        
        //验证登录,根据不同用户的权限返回菜单内容
        getMenu(params) {
                return request({
                        url: '/validation/getMenu',
                        method: 'post',
                        mock: false,
                        data: params
                })
        }
}