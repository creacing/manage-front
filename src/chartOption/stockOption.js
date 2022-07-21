const stockOption = {
    title: {
        text: 'STOCK'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ["CLOSE", 'HIGH', 'LOW', 'OPEN', 'VOLUME']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value'
    },
    series: [{
            name: 'CLOSE',
            type: 'line',
            stack: 'Total',
            data: []
        },
        {
            name: 'HIGH',
            type: 'line',
            stack: 'Total',
            data: []
        },
        {
            name: 'LOW',
            type: 'line',
            stack: 'Total',
            data: []
        },
        {
            name: 'OPEN',
            type: 'line',
            stack: 'Total',
            data: []
        },
        {
            name: 'VOLUME',
            type: 'line',
            stack: 'Total',
            data: []
        }
    ]
};

export default stockOption