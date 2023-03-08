import Mock from 'mockjs'

function param2Obj(url) {
        const search = url.split('?')[1]
        if (!search) {
                return {}
        }
        return JSON.parse(
                '{"' +
                decodeURIComponent(search)
                        .replace(/"/g, '\\"')
                        .replace(/&/g, '","')
                        .replace(/=/g, '":"') +
                '"}'
        )
}

//随机生成200条用户数据
let List = []
const count = 200
for (let i = 0; i < count; i++) {
        List.push(
                Mock.mock({
                        id: Mock.Random.guid(),//随机全局统一标识符
                        name: Mock.Random.cname(),//随机中文姓名
                        address: Mock.mock('@county(true)'),//生成地区名
                        'age|18-60': 1,
                        birth: Mock.Random.date(),//随机日期
                        sex: Mock.Random.integer(0,1)//随机返回0/1
                })
        )
}

export default {
        //获取用户信息列表
        getUserList: config => {
                /*name用来接收前台传来的数据
                * page用来接收前端返回的值进行不同信息的展示
                * limit每页所展示的信息数*/
                const { name, page = 1, limit = 20 } = param2Obj(config.url)
                const mockList = List.filter(user => {
                        if (name && user.name.indexOf(name) === -1 && user.address.indexOf(name) === -1) return false
                        return true
                })
                const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
                return {
                        code: 200,
                        data: {
                                list: pageList,
                                count: mockList.length,
                        }
                }
        },
        
        //创建用户信息
        createUser: config => {
                const { name, address, age, birth, sex } = JSON.parse(config.body)
                List.unshift({
                        id: Mock.Random.guid(),
                        //es6简写,同name:name
                        name,
                        address,
                        age,
                        birth,
                        sex
                })
                return {
                        code: 200,
                        data: {
                                message: '添加成功'
                        }
                }
        },
        
        //删除用户信息
        deleteUser: config => {
                const { id } = param2Obj(config.url)
                if (!id) {
                        return {
                                code: -999,
                                message: '参数不正确'
                        }
                } else {
                        List = List.filter(u => u.id !== id)
                        return {
                                code: 200,
                                message: '删除成功'
                        }
                }
        },
        
        //批量删除用户信息
        batchremove: config => {
                let { ids } = param2Obj(config.url)
                ids = ids.split(',')
                List = List.filter(u => !ids.includes(u.id))
                return {
                        code: 200,
                        data: {
                                message: '批量删除成功'
                        }
                }
        },
        
        //更新用户信息,根据数据当中的id属性值锁定更新
        updateUser: config => {
                const { id, name, address, age, birth, sex } = JSON.parse(config.body)
                const sex_num = parseInt(sex)
                List.some(u => {
                        if (u.id === id) {
                                u.name = name
                                u.address = address
                                u.age = age
                                u.birth = birth
                                u.sex = sex_num
                                return true
                        }
                })
                return {
                        code: 200,
                        data: {
                                message: '编辑成功'
                        }
                }
        }
}