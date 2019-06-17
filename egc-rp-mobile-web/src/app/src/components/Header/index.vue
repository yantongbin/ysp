<template>
  <div class="header">
    <div class="main">
      <span class="icon iconfont icon-fanhui" @click="handleBack"></span>
      <slot></slot>
      <i class="icon iconfont icon-sousuo" @click="handleShow" v-if="isHideSearch"></i>
      <i class="icon iconfont icon-fenxiang" @click="handleSshare" v-if="isshare"></i>
    </div>
    <!-- 弹出搜索页面-->
    <Search ref="isSearch" class="searchbox"></Search>
  </div>
</template>
<script>
import Search from "../../components/Search/";
export default {
  props: [
    "isHideSearch",
    "title",
    "imageUrl",
    "descriContent",
    "shareUrl",
    "isshare"
  ],
  data() {
    return {};
  },
  components: {
    Search
  },
  created() {},
  mounted() {},
  methods: {
    handleBack() {
      // let rootTypeNumber = window.location.href;
      // let backnumber = rootTypeNumber.split("rootType=")[1];
      if (typeof EG_Recipes != "undefined") {
        var rootType = localStorage.getItem("rootType");
        // alert(rootType);
      //   if (rootType == 1 || rootType == null) {
      //     this.$router.back(-1);
      //   } else {
      //       EG_Recipes.callBack(
      //         JSON.stringify({
      //           callBackNative: 1
      //           // urlAddr: "http://192.168.1.52/nmenu/#/"
      //         })
            
      //       )

      
        // }
        // alert(window.history.length);
        // alert(rootType);
          window.history.length >=2&&rootType=='1'
            ? this.$router.go(-1)
            : EG_Recipes.callBack(
               JSON.stringify({
                 callBackNative: 1
                 // urlAddr: "http://192.168.1.52/nmenu/#/"
                 })          
                )
      } else {
        this.$router.back(-1);
      }
    },
    handleShow() {
      this.$refs.isSearch.show = true;
    },
    // 分享食谱
    handleSshare() {
      var shardata = JSON.stringify({
        title: this.title,
        descriContent: this.descriContent,
        shareUrl: this.shareUrl,
        imageUrl: this.imageUrl
      });
      if (typeof EG_Recipes != "undefined") {
        EG_Recipes.toShareByNative(shardata);
      }
    }
  }
};
</script>

<style lang='less' scoped>
.header {
  padding-bottom: 4.5rem;
  max-width: 640px;
  // position: fixed;
  .main {
    height: 4.5rem;
    max-width: 640px;
    position: fixed;
    z-index: 9999;
    border-bottom: 0.5px solid #eaeaea;
    top: 0;
    line-height: 4.5rem;
    font-size: 1.6rem;
    text-align: center;
    width: 100%;
    background-color: #fff;
    // position: relative;
    font-size: 1.6rem;
    span {
      left: 0;
      top: 0;
      font-size: 2.6rem;
      display: inline-block;
      height: 4.5rem;
      width: 4.5rem;
      text-align: center;
      position: absolute;
    }
    i {
      position: absolute;
      right: 0;
      text-align: center;
      font-size: 2.3rem;
      top: 0;
      width: 4.5rem;
      height: 4.5rem;
      display: inline-block;
    }
    slot {
      font-size: 1.6rem;
    }
  }
  .searchbox {
    height: 100%;
    z-index: 9999999 !important;
  }
}
</style>
