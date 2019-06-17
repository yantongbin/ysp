<template>
<!-- 牛排机食谱 -->
    <div class="steakRecipe">
    <Header :isHideSearch='true'>牛排机食谱</Header>
    <van-tabs v-model="active"  @click="handleTab">
    <van-tab title="综合最多">
        <Recipetemplate v-for='(item,key) in  steakdata.list' :key='key' :data='item'></Recipetemplate>
    </van-tab>
    <van-tab title="做过最多">
        <Recipetemplate v-for='(item,key) in  steakdata.list' :key='key' :data='item'></Recipetemplate>

    </van-tab>
    <van-tab title="收藏最多">
            <Recipetemplate v-for='(item,key) in  steakdata.list' :key='key' :data='item'></Recipetemplate>
            </van-tab>
    </van-tabs>
    </div>
</template>

<script>
import Header from "../../components/Header/";
import Recipetemplate from "../../components/Recipetemplate/";
import { getSteakData } from "../../services/api.js";
export default {
  data() {
    return {
      active: 0,
      steakdata: ""
    };
  },
  components: {
    Header,
    Recipetemplate
  },
  mounted() {
    this.handleTab();
  },
  methods: {
    // 拿到牛排机食谱数据
    async steakData(id) {
      let steakdata = await getSteakData(id);
      this.steakdata = steakdata.data;
      console.log(steakdata);
    },
    handleTab(index, title) {
      this.steakData(this.active);
    }
  }
};
</script>

<style lang='less' scoped>
.steakRecipe {
  // padding-top: 4.5rem;
  .van-tabs__content {
    padding-left: 1rem;
  }
}
</style>
