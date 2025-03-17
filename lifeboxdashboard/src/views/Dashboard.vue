<template>
  <div class="dashboard">

    <div class="dashboard-title">
      <div></div>
      <div>邻里汇态势感知分析系统</div>
      <div></div>
    </div>
    <!-- 左侧内容区域 -->
    <div class="left-panel">
      <ChartPanel title="趋势分析"/>
      <TablePanel title="服务场所TOP10" :tableData="tableData"/>
    </div>

    <!-- 中间内容区域 -->
    <div class="center-panel">
      <MapPanel title="地图概览"/>
    </div>

    <!-- 右侧内容区域 -->
    <div class="right-panel">
      <div class="numberRoller">
        <div class="turnBox">
          <span v-for="(digit, index) in formattedNumber" :key="index">{{ digit }}</span>
        </div>
      </div>
      <RankPanel title="运营成效"/>
    </div>
  </div>
</template>

<script>
import ChartPanel from "../components/ChartPanel.vue";
import MapPanel from "../components/MapPanel.vue";
import {Api} from "../constants.js";
import TablePanel from "../components/TablePanel.vue";
import RankPanel from "../components/RankPanel.vue";

export default {
  components: {
    RankPanel,
    TablePanel,
    ChartPanel,
    MapPanel
  },
  data() {
    return {
      regionInfo: {},
      totalPeople: 0,
      tableData: []
    };
  },
  created() {
    this.initData();
  },
  computed: {
    formattedNumber() {
      let numStr = this.totalPeople.toString().padStart(8, "0"); // 补全 8 位
      return numStr.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,").split(""); // 加千分位逗号，并拆分成数组
    },
  },
  methods: {
    async initData() {
      const resp1 = await this.$axios.post(`${Api}/rest_s/v1/partingbuing/mobile/life/box/getLifBoxQuery`);
      console.log(resp1);
      this.regionInfo = resp1.msg;


      //场所服务TOP10；
      const resp2 = await this.$axios.get(`${Api}/rest_s/v1//partingbuing/SHDQOverviewHandlerV2/getTrafficCountByDateSearch?SiteKey=-1&TownSiteKey=-1&Type=5&SearchType=4&DeptLevel=0&PositionType=-1&CustomBegTime=2020%2F01%2F01&CustomEndTime=2027%2F01%2F31&WDType=-1`);
      console.log(resp2);
      if (resp2.msg && resp2.msg.length > 0) {
        resp2.msg.forEach((item) => {
          this.totalPeople += ~~item.traffic;
        });
      }
      this.turnfunc(this.totalPeople);
      this.tableData = resp2.msg.slice(0, 10);
    },
    turnfunc(targetNumber) {
      let count = 0;
      let step = targetNumber / 30;
      let timer = setInterval(() => {
        count += step;
        if (count >= targetNumber) {
          clearInterval(timer);
          count = targetNumber;
        }
        this.totalPeople = Math.floor(count); // 更新 Vue 响应式数据
      }, 30);
    },
  }
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: row;
  height: 90vh;
  padding: 6vh 20px 20px 20px;

  position: relative;
}

.left-panel, .right-panel {
  width: 25%;
}

.center-panel {
  flex: 1;
  padding: 0 20px;
}

/* 事件面板样式 */
.event-panel {
  background: #1b2a47;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.dashboard-title {
  position: absolute;
  height: 5vh;
  top: 0px;
  left: 0px;
  z-index: 999;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    font-size: 20px;
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(270deg, rgba(3, 16, 35, 0) 0%, rgba(3, 16, 35, 0.8) 46%, rgba(3, 16, 35, 0.68) 67%, rgba(3, 16, 35, 0.33) 87%, rgba(3, 16, 35, 0) 100%);
  }

  div:first-child {
    background: linear-gradient(90deg, rgba(12, 48, 58, 0.8) 0%, rgba(12, 48, 58, 0.73) 29%, rgba(12, 48, 58, 0.51) 59%, rgba(12, 48, 58, 0.16) 89%, rgba(12, 48, 58, 0) 100%);
    border-radius: 0px 0px 0px 0px;
    opacity: 0.85;
  }

  div:last-child {
    //background: linear-gradient(90deg, rgba(12, 48, 58, 0.8) 0%, rgba(12, 48, 58, 0.73) 29%, rgba(12, 48, 58, 0.51) 59%, rgba(12, 48, 58, 0.16) 89%, rgba(12, 48, 58, 0) 100%);
    background: linear-gradient(90deg, rgba(12, 48, 58, 0) 0%, rgba(12, 48, 58, 0.16) 29%, rgba(12, 48, 58, 0.51) 59%, rgba(12, 48, 58, 0.73) 89%, rgba(12, 48, 58, 0.8) 100%);
    border-radius: 0px 0px 0px 0px;
    opacity: 0.85;
  }
}

.table-container {
  background-color: rgba(255, 255, 255, 0.1);
}

.numberRoller {
  margin-bottom: 20px;
}

.turnBox {
  display: flex;
  justify-content: center;
  font-size: 24px;

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 56px;
    background: linear-gradient(180deg, #063E65 0%, #021E2E 100%);
    box-shadow: inset 0px 0px 20px 0px #0089DB;
    border: 2px solid;
    border-image: linear-gradient(360deg, rgba(65, 128, 221, 1), rgba(35, 98, 191, 1), rgba(149, 218, 255, 1)) 2 2;
  }

  > span + span {
    margin-left: 3px;
  }
}
</style>
