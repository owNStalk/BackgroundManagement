import Mock from 'mockjs'
import homeData from './mockData/homeData.js'
import userData from './mockData/userData.js'
import validation from './mockData/validation.js'

//配置拦截请求所返回的path以及数据
Mock.mock('/home/getData', homeData.getHomeData);

//配置拦截User组件数据请求并返回对应数据
Mock.mock(/user\/getUserData/,'get', userData.getUserList);

//配置拦截创建用户请求的数据到userData
Mock.mock(/user\/createUser/,'post', userData.createUser);

//配置拦截编辑用户请求的数据到userData
Mock.mock(/user\/updateUser/,'post', userData.updateUser);

//配置拦截删除单用户数据请求的数据到userData
Mock.mock(/user\/deleteUser/,'get', userData.deleteUser);

//配置拦截登录获取菜单请求到validation
Mock.mock(/validation\/getMenu/,'post', validation.getMenu);