import * as echarts from 'echarts';
const initEcharts = (node, options) => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById(node));
    // 绘制图表
    myChart.setOption(options);

    return myChart
}
initEcharts.echarts = echarts

export default initEcharts