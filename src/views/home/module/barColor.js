import * as echarts from "echarts";

const barColor = [
        {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#ED3E73' },
                        { offset: 1, color: '#F5B366' }
                ])
        },
        {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#478BD6' },
                        { offset: 1, color: '#2DDAD5' }
                ])
        }
]

export default barColor