<template>
  <div class="map-panel">
    <div class="map-container" ref="map">
      <baidu-map v-if="isLoad" class="map" @ready="mapHandler" :scroll-wheel-zoom="true" :center="circlePath.center"
                 :zoom="17">
      </baidu-map>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  props: ["title"],
  data() {
    return {
      circlePath: {
        center: {
          lng: 121.504402,
          lat: 31.254679,
        },
        zoom: 15,
        mark: {},
      },
      isLoad: false,
      BMap: null,
      map: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.isLoad = true;
    });
  },
  methods: {
    initMap() {
      let chart = echarts.init(this.$refs.map);
      chart.setOption({
        title: { text: this.title, left: "center", textStyle: { color: "#fff" } },
        geo: {
          map: "china",
          label: { show: true, color: "#fff" },
          roam: true,
          itemStyle: { areaColor: "#123456", borderColor: "#fff" }
        },
        series: [{ type: "scatter", coordinateSystem: "geo", data: [] }]
      });
    },
    async mapHandler({ BMap, map }) {
      console.log(BMap);
      console.log(map);
      //保存百度地图类
      this.BMap = BMap;
      //保存地图对象
      this.map = map;
      const styleId = '9875ca4b0c574337efd3dfb2b0491c03'; // 这里替换为你的样式ID，例如 'pltn9105'（示例ID）
      // const style = new BMap.MapStyle(); // 创建地图风格实例对象。可选参数：styleId（样式ID），styleJson（样式JSON字符串）二者必选其一。此处仅为示例，实际应用时请使用你的样式ID。
      map.setMapStyleV2({styleId}); // 应用自
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
  height: 88vh;

  .map {
    width: 100%;
    height: 100%;
  }
}

</style>
