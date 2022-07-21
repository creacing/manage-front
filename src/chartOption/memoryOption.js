const initMemoryOption = ({ initEcharts }) => {
    const memoryOption = {
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
        title: {
            text: "内存使用情况",
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                label: {
                    backgroundColor: "#6a7985",
                },
            },
        },
        legend: {
            data: ["内存总量", "剩余内存"],
        },
        toolbox: {
            feature: {
                saveAsImage: {},
            },
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: [{
            type: "category",
            boundaryGap: false,
            data: [],
        }, ],
        yAxis: [{
            type: "value",
        }, ],
        series: [{
                name: "内存总量",
                type: "line",
                stack: "Total",
                smooth: true,
                lineStyle: {
                    width: 0,
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new initEcharts.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: "rgb(128, 255, 165)",
                        },
                        {
                            offset: 1,
                            color: "rgb(1, 191, 236)",
                        },
                    ]),
                },
                emphasis: {
                    focus: "series",
                },
                data: [0],
            },
            {
                name: "剩余内存",
                type: "line",
                stack: "Total",
                smooth: true,
                lineStyle: {
                    width: 0,
                },
                showSymbol: false,
                areaStyle: {
                    opacity: 0.8,
                    color: new initEcharts.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: "rgb(0, 221, 255)",
                        },
                        {
                            offset: 1,
                            color: "rgb(77, 119, 255)",
                        },
                    ]),
                },
                emphasis: {
                    focus: "series",
                },
                data: [0],
            },
        ],
    };
    return memoryOption

}

export default initMemoryOption