//饼状图配置
import {reactive} from "vue";

let pieSetting = reactive({
        tooltip: {
                trigger: 'item',
        },
        color: ['#b9b9b9','#6d93e7','#8b55f7','orange','orangered'],
        series: [],
        legend: {
                top: '5%',
                left: 'center'
        },
});

const [itemStyle, label, emphasis] = [
        {
                borderWidth: 3,
                borderColor: '#fff',
                borderRadius: 5
        },
        {
                show: false,
                position: 'center'
        },
        {
                label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                }
        }
        ]

export {pieSetting,itemStyle, label, emphasis}