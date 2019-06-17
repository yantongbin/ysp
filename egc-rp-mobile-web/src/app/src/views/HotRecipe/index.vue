<template>
        <!-- 热门食谱 -->
    <div class="hotrecipe">
        <Header :isHideSearch='true'>热门食谱</Header>
        <div class="content">
          <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
          :offset='20'
          >
            <template class='template' >
            <Hotrecipe v-for="(item,key) in list" :key='key' :data='item'></Hotrecipe>
            </template>
            </van-list>
        </div>
         <div class="footer" v-show='isfooter'>
            我可是有底线的
            </div>
    </div>
</template>

<script>
import Header from "../../components/Header/";
import Hotrecipe from "../../components/Hottemplate/";
import { getHotData } from "../../services/api.js";
export default {
  data() {
    return {
      hotdata: "",
      list: [],
      pagenumber: 0,
      loading: false,
      finished: false,
      totalNum: 0,
      isfooter: false
    };
  },
  components: {
    Header,
    Hotrecipe
  },
  methods: {
    // 拿到热门食谱数据
    // async getHotdata() {
    //   let gethotdata = await getHotData(1);
    //   // 绑定热门食谱数据
    //   this.hotdata = gethotdata.data;
    //   this.list=this.hotdata.list;
    //   console.log(this.hotdata);
    // },
    async onLoad() {
      // 绑定热门食谱数据
      if (this.pagenumber >= this.pageSize - 1) {
        this.finished = true;
        this.loading = false;
        this.isfooter = true;
        return;
      }
      this.loading = false;
      this.pagenumber++;
      let gethotdata = await getHotData(this.pagenumber);
      this.hotdata = gethotdata.data;
      this.pageSize = gethotdata.data.pageSize;
      this.list = [].concat(this.list, this.hotdata.list);
    }
  },
  mounted() {
    // this.onLoad();
  }
};
</script>

<style lang='less' scoped>
.hotrecipe {
  background-color: #fff;
  .content {
  }
  .footer {
    height: 3rem;
    width: 100%;
    text-align: center;
    line-height: 3rem;
    background-color: #f5f5f5;
    font-size: 1.2rem;
    color: #a9a9a9;
  }
}
</style>
