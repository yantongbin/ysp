<template>
    <!-- 主题食谱 -->
    <div class="themrecipe">
   <Header>主题食谱</Header>
   <div class="name">
       {{themdata.title}}
   </div>
   <!-- 作者 -->
   <div class="author">
      <TemplateImg :msg='themdata.headimg'></TemplateImg>
    {{themdata.nickname}}
   </div>
   <!-- 描述 -->
   <div class="describle">
        {{themdata.description}}
   </div>
    <!-- 线条 数量 -->
   <div class="line">
       <font v-show='themlist.total!=0'>{{themlist.total}}道美味</font>
       <span class="left"></span>
       <span class="right"></span>
   </div>
   <!-- 内容 -->
   <div class="content">
       <HotRecipe v-for='(item,key) in themlist.list' :key='key' :data='item'></HotRecipe>
   </div>
    </div>
</template>

<script>
import Header from "../../components/Header/";
import HotRecipe from "../../components/Hottemplate/";
import { getThemData } from "../../services/api.js";
import TemplateImg from '../../components/Img/';

export default {
  data() {
    return {
      themdata: "",
      themlist: ""
    };
  },
  components: {
    Header,
    HotRecipe,
    TemplateImg
  },
  methods: {
    // 获取主题食谱列表
    async getThem() {
      let getthemdata = await getThemData(this.$route.params.id);
      // 绑定数据
      this.themdata = getthemdata.data;
      // 绑定主题食谱列表
      this.themlist = getthemdata.data.pageInfo;
    }
  },
  mounted() {
    this.getThem();
  }
};
</script>

<style lang='less' scoped>
.themrecipe {
  background-color: #fff;
  .name {
    padding: 0 1rem;
    font-size: 1.6rem;
    height: 4rem;
    line-height: 4rem;
  }
  .author {
    padding: 0 1rem;
    height: 5rem;
    font-size: 1.4rem;
    line-height: 5rem;
    vertical-align: middle;
    img {
      float: left;
      height: 3rem;
      margin-top: 1rem;
      margin-right: 1rem;
      width: 3rem;
      border-radius: 50%;
    }
  }
  .describle {
    line-height: 3rem;
    padding: 0 1rem;
    color: #4a4a4a;
    font-size: 1.4rem;
  }
  .line {
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    font {
      display: inline-block;
      position: absolute;
      left: 50%;
      color: #3cadff;
      line-height: 4rem;
      width: 10rem;
      margin-left: -5rem;
      font-size: 1.3rem;
    }
    .left {
      margin-top: 2rem;
      width: 35%;
      height: 1px;
      float: left;
      display: inline-block;
      background-image: linear-gradient(
        90deg,
        rgba(204, 204, 204, 0) 0%,
        #cccccc 98%
      );
    }
    .right {
      width: 35%;
      margin-top: 2rem;
      margin-left: 5rem;
      float: right;
      height: 1px;
      display: inline-block;
      background-image: linear-gradient(
        -90deg,
        rgba(204, 204, 204, 0) 0%,
        #cccccc 98%
      );
    }
  }
  .content {
    padding: 1rem 0;
  }
}
</style>
