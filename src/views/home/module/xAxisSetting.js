//带x轴统计表的设置参数
import {reactive} from "vue";

let xAxisSetting = reactive({
        textsStyle: {
                color: '#82AAFF',
        },
        grid: {
                left: '15%',
                bottom: '15%'
        },
        tooltip: {
                trigger: 'axis',
        },
        xAxis: {
                type: 'category',
                data: [],
                axisLine: {
                        lineStyle: {
                                color: '#666',
                        },
                },
                axisLabel: {
                        interval: 0,
                        color: '#82AAFF',
                },
        },
        yAxis: [
                {
                        type: 'value',
                        axisLine: {
                                lineStyle: {
                                        color: '#82AAFF',
                                },
                        },
                },
        ],
        color: ['#fd9902','#00aeff','#EB7369','#3DA276','#ED5913','#910ec5'],
        series: [],
        legend: {
                top: '5%',
                left: 'center'
        },
});

export default xAxisSetting