import axios from 'axios'
import config from '../api/config/mode.js'
import { ElMessage } from 'element-plus'

//创建axios实例对象
const service = axios.create({
        baseURL: config.baseApi
})

//设置请求前所执行的任务
service.interceptors.request.use((req) => {
        //使用JWT认证时可自定义header
        return req
})

//设置请求后所执行的任务
service.interceptors.response.use((res) => {
        //使用解构赋值接收形参返回对象数据中的属性值
        const { code, data } = res.data
        //使用常量设置请求错误信息
        const NETWORK_ERROR = '数据请求异常!请稍后重试.'
        //状态码200请求成功时,将数据返回.也可根据具体情况来处理返回码
        if ( code === 200 ){
                return data
        } else{
                //请求错误时提示
                ElMessage.error( NETWORK_ERROR )
                return Promise.reject( NETWORK_ERROR )
        }
})

//封装的核心函数,使用形参接收传入的配置对象
function request( options ) {
        //传入的对象中method没有有请求的方法时默认用get
        options.method = options.method || 'get'
        //处理method请求方法值为小写进行判断
        if ( options.method.toLowerCase() === 'get' ){
                //将属性data值赋给params
                options.params = options.data
        }
        //使用变量接收mode.js的mock值
        let isMock = config.mock
        //接收到的对象中的mock属性不是undefined时
        if ( typeof options.mock !== 'undefined'){
                /*将isMock的值传入到所接收的对象中的mock
                * 既可以操作总api的开/关,也可以操作单个api的开/关*/
                isMock = options.mock
        }
        //当模式为生产时
        if ( config.env === 'production' ) {
                //直接使用baseApi
                service.defaults.baseURL = config.baseApi
        } else {
                //否则根据isMock接收到的值来决定
                service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
        }
        //将接收到的配置对象返回到service实例
        return service( options )
}

export default request