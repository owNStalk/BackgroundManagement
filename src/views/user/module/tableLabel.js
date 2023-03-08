import {reactive} from "vue";

//表头数据
const tableLabel = reactive([
        {
                mark: "name",
                label: "姓名",
        },
        {
                mark: "age",
                label: "年龄",
        },
        {
                mark: "sexLabel",
                label: "性别",
        },
        {
                mark: "birth",
                label: "出生日期",
                width: 200,
        },
        {
                mark: "address",
                label: "地址",
                width: 520,
        },
])

export default tableLabel