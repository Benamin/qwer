<template>
  <div class="panel">
    <h3>{{ title }}</h3>
    <div class="chart-container" ref="chart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  props: ["title"],
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      let chart = echarts.init(this.$refs.chart);
      chart.setOption({
        title: { text: this.title, left: "center", textStyle: { color: "#fff" } },
        tooltip: {},
        xAxis: { type: "category", data: ["3月11", "3月12", "3月13", "3月14", "3月15", "3月16", "3月17"] },
        yAxis: { type: "value" },
        series: [{ type: "bar", data: [120, 200, 150, 80, 70, 220, 180] }]
      });
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

</style>
