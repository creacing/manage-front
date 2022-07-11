<!-- <template>
  <div class="server-cards">
    <div id="stockHis" class="monitor"></div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import { getStockInfo } from "@/utils/stock.js";
import initEcharts from "@/utils/echarts.js";

onBeforeMount(async () => {
  const data = await getStockInfo();
  console.log("data", data);
});
const optionsStock = {
  color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
  title: {
    text: "股票历史行情",
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
      name: "股票历史行情",
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
</script>

<style lang="scss" scoped>
.monitor {
  height: 300px;
  width: 100%;
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
</style> -->