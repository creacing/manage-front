<template>
  <div class="server-cards">
    <div id="cpuuseage" class="monitor"></div>
    <div id="memoryuseage" class="monitor"></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import VueSocketIO from "vue-3-socket.io";
import initEcharts from "@/utils/echarts.js"
import * as echarts from 'echarts';

const optionsCpu = {
  color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
  title: {
    text: 'cpu使用率'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['cpu使用率']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'cpu使用率',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(128, 255, 165)'
          },
          {
            offset: 1,
            color: 'rgb(1, 191, 236)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [0]
    }
  ]
}
const optionsMemory = {
  color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
  title: {
    text: '内存使用情况'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['内存总量', '剩余内存']
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '内存总量',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(128, 255, 165)'
          },
          {
            offset: 1,
            color: 'rgb(1, 191, 236)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [0]
    },
    {
      name: '剩余内存',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(0, 221, 255)'
          },
          {
            offset: 1,
            color: 'rgb(77, 119, 255)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [0]
    }
  ]
}
let socket;
onMounted(() => {
  const date = new Date()
  const formatDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  // const formatDate = `${date.getFullYear()}${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`

  optionsCpu.xAxis[0].data.push(formatDate)

  initEcharts('cpuuseage', optionsCpu)

  optionsMemory.xAxis[0].data.push(formatDate)

  initEcharts('memoryuseage', optionsMemory)
  const socketConfig = {
    connection:
      "http://127.0.0.1:7001/server" + "?usekey=" + localStorage.getItem("m-token"),
  };
  socket = new VueSocketIO(socketConfig);

  socket.io.on("connect", () => {
    console.log("connected /sever");
  });
  socket.io.on("disconnect", () => {
    console.log("disconnected");
  });
  socket.emitter.addListener(
    "data",
    (data) => {
      // console.log('data is:', data);
      optionsCpu.xAxis[0].data.push(data.date)
      optionsCpu.series[0].data.push(data.cpuUsage)

      initEcharts('cpuuseage', optionsCpu)

      optionsMemory.xAxis[0].data.push(data.date)
      optionsMemory.series[0].data.push(data.totalMem)
      optionsMemory.series[1].data.push(data.freeMem)


      initEcharts('memoryuseage', optionsMemory)
    },
    { $options: { name: "ServerManage" } }
  );
  socket.emitter.addListener(
    "res",
    (data) => {
      console.log('res is:', data);
    },
    { $options: { name: "ServerManage" } }
  );
  socket.io.emit("index", 'start get server info');
});
</script>

<style>
.server-cards {
  display: flex;
  justify-content: space-between;
}
.monitor {
  height: 300px;
  width: 46.5%;
  justify-content: space-between;
  background-color: #e9edf2;
  border-radius: 4px;
  transition: all 0.3s ease;
  padding: 25px;
  margin-bottom: 20px;
}
.monitor:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 14px 24px #0003;
  z-index: 999;
  border-radius: 6px;
}
</style>