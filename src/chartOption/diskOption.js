const initDiskOption = ({ initEcharts }) => {
    const formatUtil = initEcharts.echarts.format;
    const diskOption = {
        title: {
            text: '硬盘使用情况',
            left: 'center'
        },
        tooltip: {
            formatter: function(info) {
                var value = info.value;
                var treePathInfo = info.treePathInfo;
                var treePath = [];
                for (var i = 1; i < treePathInfo.length; i++) {
                    treePath.push(treePathInfo[i].name);
                }
                return [
                    '<div class="tooltip-title">' +
                    formatUtil.encodeHTML(treePath.join('/')) +
                    '</div>',
                    'Disk Usage: ' + formatUtil.addCommas(value) + ' GB'
                ].join('');
            }
        },
        series: [{
            name: 'Disk Usage',
            type: 'treemap',
            visibleMin: 300,
            label: {
                show: true,
                formatter: '{b}'
            },
            itemStyle: {
                borderColor: '#fff'
            },
            levels: getLevelOption(),
            data: []
        }]
    }

    return diskOption
}



const getLevelOption = () => {
    return [{
            itemStyle: {
                borderWidth: 0,
                gapWidth: 5
            }
        },
        {
            itemStyle: {
                gapWidth: 1
            }
        },
        {
            colorSaturation: [0.35, 0.5],
            itemStyle: {
                gapWidth: 1,
                borderColorSaturation: 0.6
            }
        }
    ];
}
export default initDiskOption