<template>
  <div class="baseinfos-cards">
    <div class="baseinfo mr">
      <div class="card-title">平台</div>
      <div class="card-des">
        <h1>{{ plantForm }}</h1>
      </div>
    </div>
    <div class="baseinfo mr">
      <div class="card-title">运行时间</div>
      <div class="card-des">
        <h1>{{ runTime }} s</h1>
      </div>
    </div>
    <div class="baseinfo">
      <div class="card-title">CPU使用率</div>
      <div class="card-des">
        <h1>{{ cpuUsagePercent * 100 }} %</h1>
      </div>
    </div>
  </div>
  <div class="server-cards">
    <div id="cpuuseage" class="monitor mr"></div>
    <div id="memoryuseage" class="monitor"></div>
  </div>
  <div class="disk-use-cards">
    <div id="diskusage" class="disk-monitor"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import VueSocketIO from "vue-3-socket.io";
import initEcharts from "@/utils/echarts.js";

const plantForm = ref("");
const runTime = ref("0");
const cpuUsagePercent = ref("0");
const optionsCpu = {
  color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
  title: {
    text: "cpu使用率",
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
    data: ["cpu使用率"],
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
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: [],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "cpu使用率",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new initEcharts.echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
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
  ],
};
const optionsMemory = {
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
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: [],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
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
        color: new initEcharts.echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
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
        color: new initEcharts.echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
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
let socket;
onMounted(() => {
  let myCpuusage = null;
  let myMemoryuseage = null;
  const date = new Date();
  const formatDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  // const formatDate = `${date.getFullYear()}${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`

  optionsCpu.xAxis[0].data.push(formatDate);

  myCpuusage = initEcharts("cpuuseage", optionsCpu);

  optionsMemory.xAxis[0].data.push(formatDate);

  myMemoryuseage = initEcharts("memoryuseage", optionsMemory);
  const socketConfig = {
    connection:
      "http://127.0.0.1:7001/server" +
      "?usekey=" +
      localStorage.getItem("m-token"),
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
      console.log("data is:", data);
      plantForm.value = data.plantForm;
      runTime.value = data.sysUptime;
      cpuUsagePercent.value = data.cpuUsage;
      optionsCpu.xAxis[0].data.push(data.date);
      optionsCpu.series[0].data.push(data.cpuUsage);

      myCpuusage.setOption(optionsCpu);

      optionsMemory.xAxis[0].data.push(data.date);
      optionsMemory.series[0].data.push(data.totalMem);
      optionsMemory.series[1].data.push(data.freeMem);

      myMemoryuseage.setOption(optionsMemory);
    },
    { $options: { name: "ServerManage" } }
  );
  socket.emitter.addListener(
    "res",
    (data) => {
      console.log("res is:", data);
    },
    { $options: { name: "ServerManage" } }
  );
  socket.io.emit("index", "start get server info");
});
onUnmounted(() => {
  myCpuusage.dispose();
  myMemoryuseage.dispose();
});
</script>

<style lang="scss" scoped>
.server-cards {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.monitor {
  height: 300px;
  width: 50%;
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
.baseinfos-cards {
  display: flex;
  justify-content: space-between;
}
.baseinfo {
  height: 100px;
  width: 33%;
  justify-content: space-between;
  background-color: #e9edf2;
  border-radius: 4px;
  transition: all 0.3s ease;
  padding: 25px;
  margin-bottom: 20px;
  .card-title {
    height: 30px;
    color: #000;
    font-weight: bold;
  }
  .card-des {
    height: 60px;
    color: #999;
  }
}
.baseinfo:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 14px 24px #0003;
  z-index: 999;
  border-radius: 6px;
}
.mr {
  margin-right: 1rem;
}
.disk-monitor {
  width: 100%;
  height: calc(100% - 300px - 100px - 20px - 20px);
}
</style>