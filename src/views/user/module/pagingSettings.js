import {reactive} from "vue";

//分页设置
const pagingSettings = reactive({
        //当前页信息条数
        total: 0,
        //初始当前页
        page: 1,
        //用于接收输入框的值
        name: ''
})

export default pagingSettings