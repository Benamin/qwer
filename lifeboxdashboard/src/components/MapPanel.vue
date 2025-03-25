<template>
  <div class="map-panel">
    <div class="map-container" ref="map">
      <baidu-map v-if="isLoad" class="map" @ready="mapHandler" :scroll-wheel-zoom="true" :center="circlePath.center"
                 :zoom="13">
      </baidu-map>
      <div class="btn-list">
        <template v-for="item of tabList">
          <span :class="{'active':item === tabActive}" @click="changeTab(item)">{{ item }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {mapData} from "./data.js";
// 在文件顶部导入图片
import imgSrc from "../assets/marker.png";

export default {
  props: ["title"],
  data() {
    return {
      tabActive: "邻里汇",
      tabList: ["邻里汇", "助餐服务点", "文体服务点", "卫生服务点"],
      circlePath: {
        center: {
          lng: 121.440047,
          lat: 31.173705,
        },
        zoom: 15,
        mark: {},
      },
      tableData: [
        {
          "rank": "1",
          "sitename": "康健∙康乐汇邻里汇",
          "sitebyarea": "康健∙康乐汇邻里汇",
          "traffic": "2948035",
          "sitekey": "4707",
          "area": "500.00",
          "dayavgin": "1139",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "2.28",
          "openTime": "2023-09-28 00:00:00"
        },
        {
          "rank": "2",
          "sitename": "天平∙66梧桐邻里汇",
          "sitebyarea": "天平∙66梧桐邻里汇",
          "traffic": "1381187",
          "sitekey": "4651",
          "area": "500.00",
          "dayavgin": "533",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "1.07",
          "openTime": "2023-09-26 00:00:00"
        },
        {
          "rank": "3",
          "sitename": "田林∙田林十三村邻里汇",
          "sitebyarea": "田林∙田林十三村邻里汇",
          "traffic": "1325535",
          "sitekey": "4690",
          "area": "1200.00",
          "dayavgin": "512",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.43",
          "openTime": "2023-09-28 00:00:00"
        },
        {
          "rank": "4",
          "sitename": "徐家汇∙赵巷邻里汇",
          "sitebyarea": "徐家汇∙赵巷邻里汇",
          "traffic": "1202971",
          "sitekey": "4767",
          "area": "500.00",
          "dayavgin": "464",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.93",
          "openTime": "2023-10-07 00:00:00"
        },
        {
          "rank": "5",
          "sitename": "枫林∙天龙党群邻里汇",
          "sitebyarea": "枫林∙天龙党群邻里汇",
          "traffic": "1199845",
          "sitekey": "4715",
          "area": "600.00",
          "dayavgin": "463",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.77",
          "openTime": "2023-09-28 00:00:00"
        },
        {
          "rank": "6",
          "sitename": "徐家汇∙徐虹北邻里汇",
          "sitebyarea": "徐家汇∙徐虹北邻里汇",
          "traffic": "1101912",
          "sitekey": "4774",
          "area": "2199.00",
          "dayavgin": "425",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.19",
          "openTime": "2023-10-17 00:00:00"
        },
        {
          "rank": "7",
          "sitename": "斜土∙茶陵邻里汇",
          "sitebyarea": "斜土∙茶陵邻里汇",
          "traffic": "1086014",
          "sitekey": "4729",
          "area": "1200.00",
          "dayavgin": "419",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.35",
          "openTime": "2023-09-27 00:00:00"
        },
        {
          "rank": "8",
          "sitename": "华泾∙东湾徐浦邻里汇",
          "sitebyarea": "华泾∙东湾徐浦邻里汇",
          "traffic": "1082562",
          "sitekey": "4620",
          "area": "600.00",
          "dayavgin": "418",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.70",
          "openTime": "2023-09-25 00:00:00"
        },
        {
          "rank": "9",
          "sitename": "漕河泾∙薛家宅邻里汇",
          "sitebyarea": "漕河泾∙薛家宅邻里汇",
          "traffic": "990731",
          "sitekey": "4702",
          "area": "340.00",
          "dayavgin": "382",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "1.12",
          "openTime": "2023-09-28 00:00:00"
        },
        {
          "rank": "10",
          "sitename": "徐家汇∙土山湾邻里汇",
          "sitebyarea": "徐家汇∙土山湾邻里汇",
          "traffic": "959992",
          "sitekey": "4780",
          "area": "1200.00",
          "dayavgin": "370",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.31",
          "openTime": "2023-10-17 00:00:00"
        },
        {
          "rank": "11",
          "sitename": "漕河泾∙石龙路党群邻里汇",
          "sitebyarea": "漕河泾∙石龙路党群邻里汇",
          "traffic": "929490",
          "sitekey": "4842",
          "area": "3200.00",
          "dayavgin": "359",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.11",
          "openTime": "2023-11-16 00:00:00"
        },
        {
          "rank": "12",
          "sitename": "天平∙550弄堂邻里汇",
          "sitebyarea": "天平∙550弄堂邻里汇",
          "traffic": "872601",
          "sitekey": "4582",
          "area": "500.00",
          "dayavgin": "337",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.67",
          "openTime": "2023-09-24 00:00:00"
        },
        {
          "rank": "13",
          "sitename": "田林∙千鹤邻里汇",
          "sitebyarea": "田林∙千鹤邻里汇",
          "traffic": "855404",
          "sitekey": "5021",
          "area": "1800.00",
          "dayavgin": "330",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.18",
          "openTime": "2023-12-29 00:00:00"
        },
        {
          "rank": "14",
          "sitename": "斜土∙医学院路邻里汇",
          "sitebyarea": "斜土∙医学院路邻里汇",
          "traffic": "823802",
          "sitekey": "4754",
          "area": "1600.00",
          "dayavgin": "318",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.20",
          "openTime": "2023-09-28 00:00:00"
        },
        {
          "rank": "15",
          "sitename": "徐家汇∙乐山邻里汇",
          "sitebyarea": "徐家汇∙乐山邻里汇",
          "traffic": "817718",
          "sitekey": "4902",
          "area": "200.00",
          "dayavgin": "315",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "1.58",
          "openTime": "2023-11-23 00:00:00"
        },
        {
          "rank": "16",
          "sitename": "龙华∙龙南党群邻里汇",
          "sitebyarea": "龙华∙龙南党群邻里汇",
          "traffic": "744996",
          "sitekey": "4684",
          "area": "1200.00",
          "dayavgin": "287",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.24",
          "openTime": "2023-09-27 00:00:00"
        },
        {
          "rank": "17",
          "sitename": "枫林∙宛南邻里汇",
          "sitebyarea": "枫林∙宛南邻里汇",
          "traffic": "701564",
          "sitekey": "4745",
          "area": "600.00",
          "dayavgin": "271",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.45",
          "openTime": "2023-09-28 00:00:00"
        },
        {
          "rank": "18",
          "sitename": "湖南∙武康邻里汇",
          "sitebyarea": "湖南∙武康邻里汇",
          "traffic": "609882",
          "sitekey": "4964",
          "area": "1834.00",
          "dayavgin": "235",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.13",
          "openTime": "2023-12-25 00:00:00"
        },
        {
          "rank": "19",
          "sitename": "枫林∙西木党群邻里汇",
          "sitebyarea": "枫林∙西木党群邻里汇",
          "traffic": "606041",
          "sitekey": "4737",
          "area": "600.00",
          "dayavgin": "234",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.39",
          "openTime": "2023-09-28 00:00:00"
        },
        {
          "rank": "20",
          "sitename": "长桥∙汇成党群邻里汇",
          "sitebyarea": "长桥∙汇成党群邻里汇",
          "traffic": "589564",
          "sitekey": "5012",
          "area": "1200.00",
          "dayavgin": "227",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.19",
          "openTime": "2023-12-27 00:00:00"
        },
        {
          "rank": "21",
          "sitename": "康健·康乐邻里汇",
          "sitebyarea": "康健∙康乐邻里汇",
          "traffic": "546459",
          "sitekey": "5138",
          "area": "1090.00",
          "dayavgin": "211",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.19",
          "openTime": "2024-03-19 00:00:00"
        },
        {
          "rank": "22",
          "sitename": "虹梅∙东兰古美党群邻里汇",
          "sitebyarea": "虹梅∙东兰古美党群邻里汇",
          "traffic": "544224",
          "sitekey": "4656",
          "area": "800.00",
          "dayavgin": "210",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.26",
          "openTime": "2023-09-26 00:00:00"
        },
        {
          "rank": "23",
          "sitename": "华泾∙北杨华发汇邻里汇",
          "sitebyarea": "华泾∙北杨华发邻里汇",
          "traffic": "529985",
          "sitekey": "4602",
          "area": "600.00",
          "dayavgin": "204",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.34",
          "openTime": "2023-09-25 00:00:00"
        },
        {
          "rank": "24",
          "sitename": "漕河泾∙华富邻里汇",
          "sitebyarea": "漕河泾∙华富邻里汇",
          "traffic": "518386",
          "sitekey": "4828",
          "area": "1685.00",
          "dayavgin": "200",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.12",
          "openTime": "2023-11-13 00:00:00"
        },
        {
          "rank": "25",
          "sitename": "徐家汇∙万体汇邻里汇",
          "sitebyarea": "徐家汇∙万体汇邻里汇",
          "traffic": "491027",
          "sitekey": "5157",
          "area": "1000.00",
          "dayavgin": "189",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.19",
          "openTime": "2024-04-30 00:00:00"
        },
        {
          "rank": "26",
          "sitename": "凌云∙拾艺汇邻里汇",
          "sitebyarea": "凌云∙拾艺汇邻里汇",
          "traffic": "463184",
          "sitekey": "4592",
          "area": "500.00",
          "dayavgin": "178",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.36",
          "openTime": "2023-09-25 00:00:00"
        },
        {
          "rank": "27",
          "sitename": "长桥∙长桥党群邻里汇",
          "sitebyarea": "长桥∙长桥党群邻里汇",
          "traffic": "424716",
          "sitekey": "4771",
          "area": "500.00",
          "dayavgin": "164",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.33",
          "openTime": "2023-10-07 00:00:00"
        },
        {
          "rank": "28",
          "sitename": "天平∙新里137邻里汇",
          "sitebyarea": "天平∙新里137邻里汇",
          "traffic": "417176",
          "sitekey": "5214",
          "area": "1186.00",
          "dayavgin": "161",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.14",
          "openTime": "2024-09-20 00:00:00"
        },
        {
          "rank": "29",
          "sitename": "龙华∙水岸邻里汇",
          "sitebyarea": "龙华∙水岸邻里汇",
          "traffic": "403249",
          "sitekey": "4669",
          "area": "2400.00",
          "dayavgin": "155",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.06",
          "openTime": "2023-09-27 00:00:00"
        },
        {
          "rank": "30",
          "sitename": "华泾∙建华门户邻里汇",
          "sitebyarea": "华泾∙建华门户邻里汇",
          "traffic": "393114",
          "sitekey": "4574",
          "area": "600.00",
          "dayavgin": "151",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.25",
          "openTime": "2023-09-23 00:00:00"
        },
        {
          "rank": "31",
          "sitename": "长桥∙尚新坊邻里汇",
          "sitebyarea": "长桥∙尚新坊邻里汇",
          "traffic": "392484",
          "sitekey": "4788",
          "area": "2000.00",
          "dayavgin": "151",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.08",
          "openTime": "2023-10-18 00:00:00"
        },
        {
          "rank": "32",
          "sitename": "华泾∙关港蓝湾邻里汇",
          "sitebyarea": "华泾∙关港蓝湾邻里汇",
          "traffic": "313607",
          "sitekey": "4627",
          "area": "600.00",
          "dayavgin": "121",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.20",
          "openTime": "2023-09-25 00:00:00"
        },
        {
          "rank": "33",
          "sitename": "湖南∙淮海中路邻里汇",
          "sitebyarea": "湖南∙淮海中路邻里汇",
          "traffic": "302995",
          "sitekey": "5220",
          "area": "2215.00",
          "dayavgin": "117",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.05",
          "openTime": "2024-10-30 00:00:00"
        },
        {
          "rank": "34",
          "sitename": "虹梅∙华悦家园邻里汇",
          "sitebyarea": "虹梅∙华悦家园邻里汇",
          "traffic": "299384",
          "sitekey": "4952",
          "area": "4581.50",
          "dayavgin": "115",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.03",
          "openTime": "2023-12-19 00:00:00"
        },
        {
          "rank": "35",
          "sitename": "华泾∙华泾龙吟邻里汇",
          "sitebyarea": "华泾∙华泾龙吟邻里汇",
          "traffic": "277460",
          "sitekey": "4642",
          "area": "1000.00",
          "dayavgin": "107",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.11",
          "openTime": "2023-09-26 00:00:00"
        },
        {
          "rank": "36",
          "sitename": "龙华∙怡乐家园邻里汇",
          "sitebyarea": "龙华∙怡乐家园邻里汇",
          "traffic": "226810",
          "sitekey": "4564",
          "area": "1500.00",
          "dayavgin": "87",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.06",
          "openTime": "2023-09-23 00:00:00"
        },
        {
          "rank": "37",
          "sitename": "康健∙康新党群邻里汇",
          "sitebyarea": "康健∙康新党群邻里汇",
          "traffic": "106269",
          "sitekey": "5197",
          "area": "680.78",
          "dayavgin": "41",
          "upordown": "1",
          "yoy": "+100.0%",
          "jkl": "0.06",
          "openTime": "2024-07-05 00:00:00"
        }
      ],
      isLoad: false,
      BMap: null,
      map: null,
      markVo: {},
      color: ["#c44026", "#ef9c3d", "#f8ed4f", "#43964f", "#48a1e5", "#1b4595"],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.isLoad = true;
    });
  },
  methods: {
    changeTab(item) {
      this.tabActive = item;
      let pointList = mapData.filter(item => item.type === this.tabActive);
      this.loadMark(pointList);
    },
    // 自定义热力圆点覆盖物
    createHeatDotOverlay(point, value) {
      function HeatDotOverlay(point, value) {
        this._point = point;
        this._value = value;
      }

      HeatDotOverlay.prototype = new this.BMap.Overlay();
      HeatDotOverlay.prototype.initialize = function (map) {
        this._map = map;
        const div = document.createElement("div");

        // 将 value 映射到 0 ~ 1 之间
        const minValue = 106263;
        const maxValue = 2947830;
        let normalizedValue = (this._value - minValue) / (maxValue - minValue); // 映射到 0 ~ 1 范围

        // 根据映射后的值生成渐变颜色
        // 绿色 -> 黄色 -> 红色渐变
        let hue = 120 - (normalizedValue * 120); // 从绿色 (120) 到红色 (0)
        let opacity = 0.7 + normalizedValue * 0.3; // 透明度随着值的增大而增大

        div.style.cssText = `
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: radial-gradient(circle at center,
          hsla(${hue}, 100%, 50%, 0.9) 0%,
          hsla(${hue}, 100%, 50%, 0.3) 60%,
          transparent 80%);
        transform: translate(-50%, -50%);
        opacity: ${opacity};
        pointer-events: none;
      `;

        map.getPanes().markerPane.appendChild(div);
        this._div = div;
        return div;
      };

      HeatDotOverlay.prototype.draw = function () {
        const pixel = this._map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x + "px";
        this._div.style.top = pixel.y + "px";
      };

      return new HeatDotOverlay(point, value);
    },

    // 加载热力圆点的方法
    loadMark(pointList) {
      if (!this.map) return;
      this.map.clearOverlays(); // 清除旧标记

      pointList.forEach((point, index) => {
        const bPoint = new this.BMap.Point(point.lng, point.lat);
        const overlay = this.createHeatDotOverlay(bPoint, this.tableData[index].traffic);
        this.map.addOverlay(overlay);
      });
    },

    // 地图加载和初始化处理
    async mapHandler({ BMap, map }) {
      console.log(BMap);
      console.log(map);
      this.BMap = BMap;
      this.map = map;

      // 设置地图样式
      const styleId = "9875ca4b0c574337efd3dfb2b0491c03"; // 请替换为你的样式ID
      map.setMapStyleV2({ styleId });

      // 获取数据并加载热力点
      let pointList = mapData.filter(item => item.type === this.tabActive);
      this.loadMark(pointList);
    }
  }
};
</script>

<style scoped>
.map-panel {
  background: rgba(27, 42, 71, 0.9);
  color: white;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* 地图容器 */
.map-container {
  width: 100%;
  height: 85vh;
  position: relative;

  .btn-list {
    position: absolute;
    left: 10px;
    bottom: 10px;

    span {
      display: inline-block;
      font-size: 1rem;
      padding: 6px 12px;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 0px 0px 0px 0px;
      color: #FFFEFF;
      cursor: pointer;
    }

    span.active {
      background-color: rgba(2, 124, 139, 0.3);
      position: relative;
    }

    span.active::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to left, #00D6F9, #00D6F9) left top no-repeat,
      linear-gradient(to bottom, #00D6F9, #00D6F9) left top no-repeat,
      linear-gradient(to left, #00D6F9, #00D6F9) right top no-repeat,
      linear-gradient(to bottom, #00D6F9, #00D6F9) right top no-repeat,
      linear-gradient(to left, #00D6F9, #00D6F9) left bottom no-repeat,
      linear-gradient(to bottom, #00D6F9, #00D6F9) left bottom no-repeat,
      linear-gradient(to left, #00D6F9, #00D6F9) right bottom no-repeat,
      linear-gradient(to left, #00D6F9, #00D6F9) right bottom no-repeat;
      background-size: 1px 5px, 5px 1px, 1px 5px, 5px 1px;
    }

    span + span {
      margin-left: 10px;
    }
  }

  .map {
    width: 100%;
    height: 100%;
  }
}

</style>
