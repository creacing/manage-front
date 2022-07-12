<template>
  <div class="n-cards">
    <div class="n-btns">
      <div class="n-input">
        <el-input
          v-model="searchInput"
          class="w-50 m-2"
          size="large"
          placeholder="Please Input"
        />
      </div>
      <el-button type="primary" @click="queryStockHis"
        ><el-icon><Refresh /></el-icon
      ></el-button>
    </div>
    <div id="stockHis" class="n-monitor"></div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import StockApi from '@/api/stockApi.js'
import initEcharts from "@/utils/echarts.js";
const searchInput = ref('')
const optionsStock = {
  color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
  title: {
    text: "his",
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
    data: ["close", 'high', 'low', 'open', 'volume'],
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
      name: 'close',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new initEcharts.echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
      data: []
    },
    {
      name: 'high',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new initEcharts.echarts.graphic.LinearGradient(0, 0, 0, 1, [
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
      data: []
    },
    {
      name: 'low',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new initEcharts.echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(55, 162, 255)'
          },
          {
            offset: 1,
            color: 'rgb(116, 21, 219)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: []
    },
    {
      name: 'open',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new initEcharts.echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 0, 135)'
          },
          {
            offset: 1,
            color: 'rgb(135, 0, 157)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 402, 231, 134, 190, 230, 120]
    },
    {
      name: 'volume',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {
        opacity: 0.8,
        color: new initEcharts.echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 191, 0)'
          },
          {
            offset: 1,
            color: 'rgb(224, 62, 76)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: []
    }
  ]
};
let stockHis = null
const queryStockHis = () => {
  StockApi.queryStocks({ stockId: searchInput.value }).then(res => {
    console.log(res);

    optionsStock.xAxis[0].data = res.day
    optionsStock.series[0].data = res.close
    optionsStock.series[1].data = res.high
    optionsStock.series[2].data = res.low
    optionsStock.series[3].data = res.open
    optionsStock.series[4].data = res.volume
    stockHis = initEcharts("stockHis", optionsStock);

  })
}

</script>

<style lang="scss" scoped>
.n-cards {
  width: 100%;
  .n-monitor {
    height: 300px;
    width: 100%;
    padding: 25px;
    background-color: #e9edf2;
    border-radius: 4px;
    transition: all 0.3s ease;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
  .n-monitor:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 14px 24px #0003;
    z-index: 999;
    border-radius: 6px;
  }
  .n-btns {
    width: 100%;
    padding: 25px;
    background-color: #e9edf2;
    border-radius: 4px;
    transition: all 0.3s ease;
    margin-bottom: 20px;
    box-sizing: border-box;
    display: flex;
    .n-input {
      width: 15rem;
      margin-right: 0.5rem;
      :deep(.el-input) {
        height: 2rem;
      }
    }
  }
  .n-btns:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 14px 24px #0003;
    z-index: 999;
    border-radius: 6px;
  }
}
</style>