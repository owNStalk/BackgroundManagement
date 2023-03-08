<template>
        <!--左侧-->
        <el-row :gutter="20" class="row">
                <el-col :span="10" class="leftCol">
                        <!--用户卡片-->
                        <el-card shadow="hover">
                                <div class="cardShell">
                                        <div class="userCard">
                                                <!--此处用户头像处理参考Part-10-->
                                                <img :src="getImageSrc('avatar')" class="avatar"/>
                                                <div class="userInfo">
                                                        <p class="userName">owNStalk</p>
                                                        <p class="userLevel">Super User</p>
                                                </div>
                                        </div>
                                        <div class="loginInfo">
                                                <p class="loginDataItem">上次登录时间:<span class="loginData">2022-09-30</span></p>
                                                <p class="loginDataItem">上次登录地点:<span class="loginData">Halcyon Fold</span></p>
                                        </div>
                                </div>
                        </el-card>
                        <!--数据表-->
                        <el-card shadow="hover" class="tableArea">
                                <div class="tableShell">
                                        <!--绑定目标数据-->
<!--                                        <el-table :data="tableData">
                                                &lt;!&ndash;每列遍历数据生成&ndash;&gt;
                                                <el-table-column
                                                        v-for="(label,index) in tableLabel"
                                                        :key="index"
                                                        :prop="index"
                                                        :label="label"
                                                        width="150px"
                                                >
                                                </el-table-column>
                                        </el-table>-->
                                        <el-calendar v-model="date" />
                                </div>
                        </el-card>
                </el-col>
                <!--右侧-->
                <el-col :span="14" class="rightCol">
                        <!--右上数据显示区-->
                        <div class="soldContentBox">
                                <el-card v-for="item in soldData"
                                         :key="item.itemName" class="infoCard"
                                         :body-style="{ display: 'flex', padding: 0 }">
                                        <component class="icon" :is="item.icon"
                                                   :style="{ background: item.color }">
                                        </component>
                                        <div class="textBox">
                                                <p class="itemName">{{ item.itemName }}</p>
                                                <p class="itemAmount">{{ item.amount }}</p>
                                        </div>
                                </el-card>
                        </div>
                        <!--右中ECharts图表-->
                        <el-card>
                                <!--折线表-->
                                <div class="lineTableContent" ref="lineChart"></div>
                        </el-card>
                        <!--右下ECharts图表-->
                        <div class="twinChartSlot">
                                <!--柱状表-->
                                <el-card class="chartBlock">
                                        <div ref="barChart" style="height: 240px"></div>
                                </el-card>
                                <!--饼状表-->
                                <el-card class="chartBlock">
                                        <div ref="pieChart" style="height: 240px"></div>
                                </el-card>
                        </div>
                </el-col>
        </el-row>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import xAxisSetting from './module/xAxisSetting.js'
import {pieSetting,itemStyle, label, emphasis} from './module/pieSetting.js'
import tableLabel from './module/tableLabel.js'
import {lineData, barData, pieData} from './module/chartData.js'
import barColor from "./module/barColor.js";
import {getImageSrc} from './module/getImageSrc.js'

export default {
        name: "Home",
        setup() {
                //获取当前实例
                const { proxy } = getCurrentInstance();
                //常量接收当前日期
                const date = ref(new Date())
                //将原来的常量更改为变量来接收数据
                let tableData=ref([]);
                //利用异步函数发送请求,获取拦截后返回的数据
                const getTableData = async () => {
                        tableData.value = await proxy.$api.getTableData()
                }
        
                let soldData = ref([])
                const getSoldData = async () => {
                        soldData.value = await proxy.$api.getSoldData()
                }
                
                //ECharts数据渲染部分
                //异步取值
                const getChartData = async () => {
                        //接收返回的总数据对象
                        let result = await proxy.$api.getChartData();
                        //使用解构赋值将不同的统计图数据抽取出来
                        let [lineRes,barRes,pieRes] = [result.lineData,result.barData,result.pieData];
                        //将接收到的日期值传递到折线图的x轴属性上
                        lineData.xAxisData = lineRes.date;
                        //取data数组的第一个对象中的键
                        const keyArray = Object.keys(lineRes.data[0]);
                        //接收每一个系列的数据对象
                        const series = [];
                        //根据接收到的键便利数据,并将每一个物品数据推到series
                        keyArray.forEach((key) => {
                                //推送每个系列数据的展示数据以及样式配置
                                series.push({
                                        name: key,
                                        data: lineRes.data.map((item) => item[key]),
                                        type: 'line',
                                        smooth:true,
                                        symbol: 'none',
                                });
                        });
                        //将接收到的物品数据传到折线图的系列数据
                        lineData.series = series;
                        //将折线图的数据传递到带有x轴的设置参数中
                        xAxisSetting.xAxis.data = lineData.xAxisData;
                        xAxisSetting.series = lineData.series;
                        //折线表渲染
                        let lineChart = echarts.init(proxy.$refs['lineChart']);
                        lineChart.setOption(xAxisSetting);
                        //柱状图渲染
                        barData.xAxisData = barRes.map((item) => item.date);
                        barData.series = [
                                {
                                        name: '新增用户',
                                        data: barRes.map((item) => item.new),
                                        type: 'bar',
                                        itemStyle: barColor[0],
                                },
                                {
                                        name: '活跃用户',
                                        data: barRes.map((item) => item.active),
                                        type: 'bar',
                                        itemStyle: barColor[1],
                                },
                        ];
                        xAxisSetting.xAxis.data = barData.xAxisData;
                        xAxisSetting.series = barData.series;
                        let barChart = echarts.init(proxy.$refs['barChart']);
                        barChart.setOption(xAxisSetting);
                        //饼状图渲染
                        pieData.series = [
                                {
                                        data: pieRes,
                                        type: 'pie',
                                        radius: ['40%', '70%'],
                                        itemStyle,
                                        center: ['50%','60%'],
                                        label,
                                        emphasis,
                                },
                        ];
                        pieSetting.series = pieData.series;
                        let pieChart = echarts.init(proxy.$refs['pieChart']);
                        pieChart.setOption(pieSetting);
                        //处理表宽度为响应式
                        window.onresize = () => {
                                lineChart.resize();
                                barChart.resize();
                                pieChart.resize();
                        }
                }
                
                //挂载后执行
                onMounted( () => {
                        getTableData();
                        getSoldData();
                        getChartData();
                });
                
                return {
                        getImageSrc,
                        tableData,
                        tableLabel,
                        soldData,
                        date
                }
        }
}
</script>

<style scoped>
.row{
        @apply flex-nowrap;
}
/*左侧内容样式*/
.userCard{
        @apply flex items-center pb-5 border-b-2 mb-5;
}
.avatar{
        @apply w-24 rounded-full mr-6;
}
.loginDataItem{
        @apply leading-8 text-gray-500;
}
.loginData{
        @apply ml-6 text-gray-600;
}
.tableArea{
        @apply mt-5 overflow-auto;
}
/*右侧内容样式*/
.rightCol{
        @apply p-0;
}
.soldContentBox{
        @apply flex flex-wrap justify-between;
}
.infoCard{
        width: 32%;
        @apply mb-4;
}
.icon{
        @apply w-20 text-gray-50;
}
.textBox{
        @apply mx-auto flex flex-col justify-center;
}
.itemName{
        @apply font-medium;
}
.itemAmount{
        @apply text-2xl font-extrabold;
}
/*右侧图表样式*/
.twinChartSlot{
        @apply flex justify-between mt-4;
}
.chartBlock{
        width: 49%;
}
.lineTableContent{
        height: 280px;
}
</style>