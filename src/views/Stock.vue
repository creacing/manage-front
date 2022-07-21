<template>
  <div class="n-cards">
    <div class="n-btns">
      <div class="n-input">
        <el-input v-model="searchInput" class="w-50 m-2" size="large" placeholder="Please Input" />
      </div>
      <el-button type="primary" @click="queryStockHis">
        <el-icon>
          <Refresh />
        </el-icon>
      </el-button>
    </div>
    <div id="stockHis" class="n-monitor"></div>
  </div>
</template>
<script setup>
import { ref, onUnmounted } from "vue";
import StockApi from "@/api/stockApi.js";
import initEcharts from "@/utils/echarts.js";
import stockOption from "@/chartOption/stockOption.js";

const searchInput = ref("SH600000");
let STOCK = null;
const queryStockHis = () => {
  if (!searchInput.value) return;

  StockApi.queryStocks({ stockId: searchInput.value }).then((res) => {
    stockOption.xAxis.data = res.day;
    stockOption.series[0].data = res.close;
    stockOption.series[1].data = res.high;
    stockOption.series[2].data = res.low;
    stockOption.series[3].data = res.open;
    stockOption.series[4].data = res.volume;
    if (!STOCK) {
      STOCK = initEcharts("stockHis", stockOption);
    } else {
      STOCK.setOption(stockOption);
    }
  });
};

onUnmounted(() => {
  STOCK.dispose();
});
</script>

<style lang="scss" scoped>
.n-cards {
  width: 100%;
  .n-monitor {
    height: 500px;
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