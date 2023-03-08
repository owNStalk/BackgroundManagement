/*
* 不同模式配置
* 企业级项目分为3个模式
* 开发、测试、生产
* */
/*常量接收当前运行模式值
* import.meta.env.MODE无返回值则使用生产模式的模式接口
* 否则根据返回的模式值来选择*/
const env = import.meta.env.MODE || 'production'

//不同模式接口配置
const envConfig = {
        development: {
                //企业项目所用,此处仅作演示.根据不同模式接口path也会有所不同
                baseApi: '/dataApi',
                //该项目所用.我们仅在Fast Mock配置了一个api,因此3个mockApi的path相同.当然也可以自己额外创建
                mockApi: 'https://www.fastmock.site/mock/a1ee0ebe9ddc59304c3824dc1dd86dad/dataApi/'
        },
        test: {
                baseApi: '//test.com/dataApi',
                mockApi: 'https://www.fastmock.site/mock/a1ee0ebe9ddc59304c3824dc1dd86dad/dataApi/'
        },
        production: {
                baseApi: '//production.com/dataApi',
                mockApi: 'https://www.fastmock.site/mock/a1ee0ebe9ddc59304c3824dc1dd86dad/dataApi/'
        }
}

export default {
        env,
        //配置接口的总控
        mock: false,
        //使用展开语法,根据env接收到的模式值取对应模式的接口对象
        ...envConfig[env]
}