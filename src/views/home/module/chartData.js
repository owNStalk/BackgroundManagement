import {reactive} from "vue";

//折线图数据
let lineData = reactive({
        xAxisData: [],
        series: [],
});
//柱状图数据
let barData = reactive({
        xAxisData: [],
        series: [],
});
//饼状图数据
let pieData = reactive({
        series: []
});

export {lineData,barData,pieData}