<template>
  <div class="panel">
    <h3>{{ title }}
      <div class="tab-container">
        <button
            v-for="(tab, index) in tabs"
            :key="index"
            :class="['tab-button', { active: activeTab === index }]"
            @click="handleTab(index)">
          {{ tab }}
        </button>
      </div>
    </h3>
    <div class="rank-container">
      <p>邻里汇top3</p>
      <div v-for="(item, index) in llh" :key="index+'1'" class="ranking-item">
        <div class="ranking-header">
          <span :class="['rank', getRankColor(index)]">TOP{{ index + 1 }}</span>
          <span class="name">{{ item.siteName }}</span>
          <span :class="['value', getRankColor(index)]">{{ item.dataSum }}</span>
        </div>
        <div class="progress-bar">
          <div
              class="progress"
              :style="{
            width: (item.dataSum / maxValue(llh)) * 100 + '%',
            backgroundColor: getBarColor(index),
          }"
          ></div>
        </div>
      </div>
      <p>助餐服务top3</p>
      <div v-for="(item, index) in zcfw" :key="index+'2'" class="ranking-item">
        <div class="ranking-header">
          <span :class="['rank', getRankColor(index)]">TOP{{ index + 1 }}</span>
          <span class="name">{{ item.siteName }}</span>
          <span :class="['value', getRankColor(index)]">{{ item.dataSum }}</span>
        </div>
        <div class="progress-bar">
          <div
              class="progress"
              :style="{
            width: (item.dataSum / maxValue(zcfw)) * 100 + '%',
            backgroundColor: getBarColor(index),
          }"
          ></div>
        </div>
      </div>
      <p>卫生服务top3</p>
      <div v-for="(item, index) in wsfw" :key="index+'3'" class="ranking-item">
        <div class="ranking-header">
          <span :class="['rank', getRankColor(index)]">TOP{{ index + 1 }}</span>
          <span class="name">{{ item.siteName }}</span>
          <span :class="['value', getRankColor(index)]">{{ item.dataSum }}</span>
        </div>
        <div class="progress-bar">
          <div
              class="progress"
              :style="{
            width: (item.dataSum / maxValue(wsfw)) * 100 + '%',
            backgroundColor: getBarColor(index),
          }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Api} from "../constants.js";
import moment from "moment";

export default {
  props: ["title"],
  data() {
    return {
      tabs: ["上个月", "本年度"],
      activeTab: 0, // 默认选中第一个
      llh: {},
      zcfw: {},
      wsfw: {},
    };
  },
  mounted() {
    this.getPopRank();
  },
  computed: {},
  methods: {
    maxValue(arr) {
      return Math.max(...arr.map((item) => item.dataSum));
    },
    handleTab(index) {
      this.activeTab = index;
      this.getPopRank();
    },
    async getPopRank() {
      let time = this.getTimeRange();
      console.log(time);
      let req = {
        "endTime": time.endTime,
        "rankType": "desc",
        "regionId": "4557",
        "regionType": "COUNTRY",
        "serviceId": "1667159201", //邻里汇
        "startTime": time.startTime,
      };
      console.log(req);
      const resp1 = await this.$axios.post(`${Api}/rest_s/v1/partingbuing/mobile/life/box/getServiceProgress`, req);
      this.llh = resp1.msg.progressThree;

      req.serviceId = "1667159202";  //助餐服务
      const resp2 = await this.$axios.post(`${Api}/rest_s/v1/partingbuing/mobile/life/box/getServiceProgress`, req);
      this.zcfw = resp1.msg.progressThree;

      req.serviceId = "1667159204";  //卫生服务
      const resp3 = await this.$axios.post(`${Api}/rest_s/v1/partingbuing/mobile/life/box/getServiceProgress`, req);
      this.wsfw = resp1.msg.progressThree;
    },
    getTimeRange() {
      let startTime, endTime;
      console.log(this.activeTab);
      switch (this.activeTab) {
          // case 0:
          //   startTime = moment().subtract(1, "week").startOf("week").format("YYYY-MM-DD");
          //   endTime = moment().subtract(1, "week").endOf("week").format("YYYY-MM-DD");
          //   break;
        case 0:
          startTime = moment().subtract(1, "month").startOf("month").format("YYYY-MM-DD");
          endTime = moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD");
          break;
        case 1:
          startTime = moment().startOf("year").format("YYYY-MM-DD");
          endTime = moment().endOf("year").format("YYYY-MM-DD");
          break;
        default:
          console.error("Invalid type. Use 'day', 'month', or 'year'.");
          return null;
      }
      ;
      return { startTime, endTime };
    },
    getRankColor(index) {
      const colors = ["top1", "top2", "top3", "top4", "top5"];
      return colors[index] || "default";
    },
    getBarColor(index) {
      const barColors = ["#42a5f5", "#66bb6a", "#ffffff", "#b0bec5", "#b0bec5"];
      return barColors[index] || "#b0bec5";
    },
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
  position: relative;
}


.ranking-container {
  background: #1e1e1e;
  color: white;
  padding: 20px;
  border-radius: 10px;
  width: 350px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.ranking-item {
  margin-bottom: 15px;
}

.ranking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.rank {
  font-weight: bold;
}

.value {
  font-weight: bold;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #444;
  border-radius: 3px;
  margin-top: 5px;
  position: relative;
}

.progress {
  height: 100%;
  border-radius: 3px;
}

/* 颜色样式 */
.top1 {
  color: #42a5f5;
}

.top2 {
  color: #66bb6a;
}

.top3,
.top4,
.top5 {
  color: #b0bec5;
}

.tab-container {
  display: flex;
  padding: 10px;
  position: absolute;
  right: 0;
  top: -15px;
}

.tab-button {
  background: rgba(255, 255, 255, 0.1);
  color: #a0a0a0;
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 4px;
  outline: none;
}

.tab-button.active {
  color: #ffffff;
  position: relative;
}

.tab-button.active::after {
  content: "";
  position: absolute;
  left: 4px;
  right: 4px;
  bottom: 2px;
  height: 2px;
  background: #38bdf8;
}

.tab-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.rank-container {
  > p {
    font-size: 16px;
    margin-top: 3vh;
  }
}
</style>
