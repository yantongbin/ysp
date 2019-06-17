<template>
<!-- 搜索页面 -->
    <div class="search">
    <div class="header">
    <div class="scan-icon" @click='$router.back()'>
      <i class="icon iconfont icon-fanhui"></i>
    </div>
    <div class="search-input" @click='handleSearch'>
      <span><i class="icon iconfont icon-search_001"></i>{{recipeid}}</span>
    </div>
    <div class="scan-icon">
      <font>搜索</font>
    </div>
    </div>
    <!-- 内容 -->
    <div class="content">
        <Recipetemplate v-for='(item,key) in recipedata.list' :key='key' :data='item'></Recipetemplate>
    </div>
    <!-- 空 -->
  <NotFind v-if='isnot'>没有搜索到您想要的结果 </NotFind>
    <!-- 弹出搜索页面-->
      <Search  ref='isSearch'></Search>
    </div>
</template>

<script>
import Recipetemplate from "../../components/Recipetemplate/";
import Search from "../../components/Search/";
import NotFind from "../../components/NotFind/";
import { getSearchData } from "../../services/api.js";
export default {
  data() {
    return {
      recipeid: "",
      recipedata: "",
      isnot: false,
      pid:''
    };
  },
  components: {
    Recipetemplate,
    NotFind,
    Search
  },
  methods: {
    async handleSearchdata() {
      // 名称截取
      this.recipeid =
        this.$route.params.id.length > 10
          ? this.$route.params.id.slice(0, 18) + "..."
          : this.$route.params.id;
      // 隐藏无
      this.isnot = false;
      // 获取数据
      let steakdata = await getSearchData(this.recipeid,this.pid);
      this.recipedata = steakdata.data;
      if (this.recipedata.list.length < 1) {
        this.isnot = true;
      }
    },
    // 弹出搜索页面
    handleSearch() {
      document.body.scrollTop = 0;
      this.$refs.isSearch.show = true;

    }
  },
  mounted() {
    this.pid=this.$route.params.pid
    this.handleSearchdata();
  },
  created() {
    //绑定食谱id
    this.recipeid =
      this.$route.params.id.length > 10
        ? this.$route.params.id.slice(0, 18) + "..."
        : this.$route.params.id;
  },
  // 监听路由是否发生变化
  watch: {
    $route(from) {
      this.handleSearchdata();
      // let id = this.$route.params.id;
    }
  }
};
</script>

<style lang='less' scoped>
.search {
  .header {
    background-color: #fff;
    width: 100%;
    z-index: 999;
    max-width: 640px;
    position: fixed;
    top: 0;
    height: 4.5rem;
    display: flex;
    .scan-icon {
      width: 4.5rem;
      text-align: center;
      height: 4.5rem;
      i,
      font {
        line-height: 4.5rem;
        color: #3c3c3c;
        display: inline-block;
        font-size: 2.6rem;
      }
      font {
        font-size: 1.4rem;
      }
    }
    .search-input {
      flex: 1;
      padding: 0 1rem;
      height: 4.5rem;
      span {
        display: inline-block;
        height: 3rem;
        border-radius: 3px;
        line-height: 3rem;
        font-size: 1.2rem;
        margin-top: 0.75rem;
        color: #010101;
        width: 100%;
        background-color: #f5f6f8;
        i {
          display: inline-block;
          margin-right: 1rem;
          margin-left: 1rem;
          float: left;
          color: #010101;
          font-size: 1.8rem;
        }
      }
    }
  }
  .content {
    padding-top: 4.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
