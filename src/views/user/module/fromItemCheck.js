//校验规则
//中文名验证callback
const chineseName = (rule, value, callback) => {
        if (!value) {
                callback(new Error('请输入中文名'))
        } else {
                const reg = /^[\u4e00-\u9fa5]+$/
                if (value.length < 100 && reg.test(value)) {
                        callback()
                } else {
                        return callback(new Error('请输入正确的中文名'))
                }
        }
}
const generalCheck = {required: true, message: '该项必填!', trigger: "blur"}
const nameCheck = [generalCheck,{
        validator: chineseName,
        min: 2,
        max: 5,
        message: "请输入正确的名字",
        trigger: "blur",
}];
const ageCheck = [generalCheck,{ type: 'number', message: '内容须为数字!' }];

export {generalCheck, nameCheck, ageCheck}