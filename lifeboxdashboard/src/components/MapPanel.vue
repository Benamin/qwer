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
      isLoad: false,
      BMap: null,
      map: null,
      markVo: {},
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
    loadMark(pointList) {
      this.map.clearOverlays();
      // 循环添加标记点并自定义图片作为标签
      pointList.forEach((point) => {
        let bPoint = new BMap.Point(point.lng, point.lat); // 创建坐标点
        this.markVo[point.name] = new BMap.Marker(bPoint, {
          icon: new BMap.Icon(imgSrc, new BMap.Size(30, 30)),
          offset: new BMap.Size(0, 0)
        }); // 创建标记

        this.map.addOverlay(this.markVo[point.name]); // 将标记添加到地图上
      });
      console.log(this.markVo);
    },
    async mapHandler({ BMap, map }) {
      console.log(BMap);
      console.log(map);
      //保存百度地图类
      this.BMap = BMap;
      //保存地图对象
      this.map = map;
      const styleId = "9875ca4b0c574337efd3dfb2b0491c03"; // 这里替换为你的样式ID，例如 'pltn9105'（示例ID）
      // const style = new BMap.MapStyle(); // 创建地图风格实例对象。可选参数：styleId（样式ID），styleJson（样式JSON字符串）二者必选其一。此处仅为示例，实际应用时请使用你的样式ID。
      map.setMapStyleV2({ styleId }); // 应用自
      let pointList = mapData.filter(item => item.type === this.tabActive);
      this.loadMark(pointList);
    },
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
