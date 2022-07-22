<template>
  <div class="my-baseinfocards">
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
    <div class="baseinfo mr">
      <div class="card-title">CPU使用率</div>
      <div class="card-des">
        <h1>{{ (cpuUsagePercent * 100).toFixed(2) }} %</h1>
      </div>
    </div>
    <div class="baseinfo">
      <div class="card-title">Node版本</div>
      <div class="card-des">
        <h1>{{ nodeVersion }}</h1>
      </div>
    </div>
  </div>
  <div class="server-cards">
    <div id="cpuuseage" class="monitor mr"></div>
    <div id="memoryuseage" class="monitor"></div>
  </div>
  <div class="server-cards">
    <div id="diskuseage" class="monitor mr"></div>
    <div id="netuseage" class="monitor"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import VueSocketIO from "vue-3-socket.io";
import initEcharts from "@/utils/echarts.js";
import initDiskOption from "@/chartOption/diskOption.js";
import initCpuOption from "@/chartOption/cpuOption";
import initMemoryOption from "@/chartOption/memoryOption";
import initNetOption from "@/chartOption/netOption";
const cpuOption = initCpuOption({ initEcharts });
const memoryOption = initMemoryOption({ initEcharts });
const diskOption = initDiskOption({ initEcharts });
const netOption = initNetOption({ initEcharts });
const plantForm = ref("");
const nodeVersion = ref("");
const runTime = ref("0");
const cpuUsagePercent = ref("0");
let socket = null;
let myCpuusage = null;
let myMemoryuseage = null;
let myDiskuseage = null;
let myNetuseage = null;
onMounted(() => {
  const date = new Date();
  const formatDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  // const formatDate = `${date.getFullYear()}${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`
  //cpu
  cpuOption.xAxis[0].data.push(formatDate);
  myCpuusage = initEcharts("cpuuseage", cpuOption);
  //memory
  memoryOption.xAxis[0].data.push(formatDate);
  myMemoryuseage = initEcharts("memoryuseage", memoryOption);
  //net
  netOption.xAxis[0].data.push(formatDate);
  myNetuseage = initEcharts("netuseage", netOption);
  //disk
  myDiskuseage = initEcharts("diskuseage", diskOption);
  //socket
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
      nodeVersion.value = data.nodeVersion;
      //cpu
      cpuUsagePercent.value = data.cpuUsage;
      cpuOption.xAxis[0].data.push(data.date);
      cpuOption.series[0].data.push(data.cpuUsage);
      myCpuusage.setOption(cpuOption);
      //memory
      memoryOption.xAxis[0].data.push(data.date);
      memoryOption.series[0].data.push(data.totalMem);
      memoryOption.series[1].data.push(data.freeMem);
      myMemoryuseage.setOption(memoryOption);
      //net
      netOption.xAxis[0].data.push(data.date);
      netOption.series[0].data.push(data.netInfo.download);
      netOption.series[1].data.push(data.netInfo.upload);
      myNetuseage.setOption(netOption);
      //disk
      const diskInfo = data.diskinfo;
      const diskData = [];
      for (const index in diskInfo) {
        const disk = diskInfo[index];
        diskData.push({
          value: Number(disk.total.replace(/[A-Z]/g, "")),
          value: Number(disk.total.replace(/[A-Z]/g, "")),
          name: `${disk.mounted}盘总共`,
          path: `${disk.mounted}/All`,
          children: [
            {
              value: Number(disk.used.replace(/[A-Z]/g, "")),
              name: `${disk.mounted}盘已使用`,
              path: `${disk.mounted}/Used`,
            },
            {
              value: Number(disk.available.replace(/[A-Z]/g, "")),
              name: `${disk.mounted}盘剩余`,
              path: `${disk.mounted}/Available`,
            },
          ],
        });
      }
      diskOption.series[0].data = diskData;
      myDiskuseage.setOption(diskOption);
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
  myDiskuseage.dispose();
  myNetuseage.dispose();
});
</script>

<style lang="scss" scoped>
.server-cards {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.monitor {
  height: 300px;
  width: 50%;
  min-width: 600px;
  justify-content: space-between;
  background-color: #e9edf2;
  border-radius: 4px;
  transition: all 0.3s ease;
  padding: 25px;
  margin-bottom: 10px;
}
.monitor:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 14px 24px #0003;
  z-index: 999;
  border-radius: 6px;
}
.my-baseinfocards {
  display: flex;
  justify-content: space-between;
}
.baseinfo {
  // height: 100px;
  width: 25%;
  min-width: 300px;
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
</style>