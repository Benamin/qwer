<script>
import Dashboard from "./views/Dashboard.vue";
import {Api, partyBackApi} from "./constants.js";

export default {
  name: "App",
  components: {
    Dashboard,
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      let data = {
        username: "ggfw",
        password: "Winner@456",
        code: "12",
        uuid: "",
      };
      const resp2 = await this.$axios.post(`${partyBackApi}/auth/login`, data);
      console.log(resp2);
      if (resp2.token) {
        sessionStorage.setItem("token", resp2.token);
      }
    }
  }
};
</script>

<template>
  <div class="app-container">
    <dashboard></dashboard>
  </div>
</template>

<style scoped>

.app-container {
  font-size: 13px;
}
</style>