//接收新增用户信息
import {reactive} from "vue";

const getUserMsg = reactive({
        name: '',
        age: '',
        sex: '',
        birth: '',
        address: ''
})

export default getUserMsg