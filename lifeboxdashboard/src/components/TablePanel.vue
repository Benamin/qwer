<template>
  <div class="panel panel-container">
    <h3>{{ title }}</h3>
    <div class="table-container">
      <div class="header">
        <div class="col">排名</div>
        <div class="col">名称</div>
        <div class="col">服务次数</div>
      </div>
      <div v-for="(item, index) in tableData" :key="index" class="row">
        <div class="col">{{ index + 1 }}</div>
        <div class="col"><a href="#" class="link">{{ item.sitename }}</a></div>
        <div class="col">{{ item.traffic }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  props: ["title", "tableData"],
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {

    }
  }
};
</script>

<style scoped>
.panel {
  color: white;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* 图表容器 */
.chart-container {
  height: 200px;
}

/* 标题样式 */
.panel h3 {
  font-size: 18px;
  font-weight: bold;
  border-bottom: 2px solid #2c3e50;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.header, .row {
  display: flex;
  padding: 10px;
}

.header {
  color: #999;
  font-weight: normal;
}

.row {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  margin-bottom: 5px;
}

.col {
  width: 60%;
  text-align: left;
}

.col:first-child {
  width: 20%;
}

.col:last-child {
  width: 20%;
}

.link {
  color: #00D6F9;
  text-decoration: none;
}

.panel-container {
  height: 50vh;
}

.table-container {
  height: calc(100% - 50px);
  overflow-y: auto;
}

::-webkit-scrollbar {
  width: 2px;
  height: 1px;
}


::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: #00D6F9;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.32);
}

</style>
