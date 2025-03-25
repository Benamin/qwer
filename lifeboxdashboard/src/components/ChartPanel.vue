<template>
  <div class="panel">
    <h3>{{ title }}</h3>
    <div class="chart-container" ref="chart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {Api} from "../constants.js";
import moment from "moment";

export default {
  props: ["title"],
  mounted() {
    this.initChart();
  },
  methods: {
    async initChart() {
      const startTime = moment().subtract(1, "week").startOf("week").format("YYYY-MM-DD");
      const endTime = moment().subtract(1, "week").endOf("week").format("YYYY-MM-DD");
      const req = {
        "endTime": endTime,
        "rankType": "desc",
        "regionId": "4557",
        "regionType": "COUNTRY",
        "serviceId": "1667159201",
        "startTime": startTime
      };
      const resp = await this.$axios.post(`${Api}/rest_s/v1/partingbuing/mobile/life/box/getAgeAndSexInfoWeek`, req);
      console.log(resp);
      let data = [];
      resp.msg.forEach(e => {
        let total = ~~e.child + ~~e.middle + ~~e.senility + ~~e.teenager;
        data.push(total);
      });
      this.regionInfo = resp.msg;
      let chart = echarts.init(this.$refs.chart);
      chart.setOption({
        tooltip: {},
        grid: {
          left: "3%",
          right: "6%",
          top: "8%",
          bottom: "1%",
          containLabel: true
        },
        xAxis: {
          type: "category", axisLine: {
            show: false,
            lineStyle: {
              color: "#7FCEFF"
            }
          },
          axisTick: {
            show: false
          },
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value",

        },
        series: [{ type: "bar",
          itemStyle: {
            color: "#00D6F9"
          },
          data: data }]
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
  margin-top: 0;
}

</style>
