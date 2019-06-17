<template>
  <!-- 食谱软文展示 -->
  <router-link :to="({name:'Article',params:{id:data.id}})" class="articletemplate">
    <div class="main">
      <div class="left">
        <div class="title">{{data.title}}</div>
        <div class="describle">{{data.description}}</div>
      </div>
      <div class="right">
        <span>
          <TemplateImg :msg="data.image"></TemplateImg>
        </span>
      </div>
    </div>
  </router-link>
</template>

<script>
import TemplateImg from "../../components/Img/";

export default {
  props: {
    data: {
      type: Object
    }
  },
  components: {
    TemplateImg
  }
};
</script>

<style lang='less' scoped>
.articletemplate {
  width: 100%;
  border-radius: 3px;
  display: inline-block;
  margin-top: 1rem;
  background-color: #fff;
  height: 12rem;
  .main {
    // display: flex;
    height: 12rem;
    width: 100%;
    width: 100%;

    overflow: hidden;
    .left {
      //  flex: 1;
      width: 55%;
      float: left;
      height: 12rem;
      .title {
        height: 3rem;
        color: #4a4a4a;
        margin-top: 3rem;
        line-height: 3rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        font-size: 1.4rem;
      }
      .describle {
        color: #4a4a4a;
        text-align: center;
        font-size: 1.2rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .right {
      width: 40%;
      overflow: hidden;
      border-radius: 2px;
      //  flex: 1;
      //  display:table;
      position: relative;
      float: right;
      height: 12rem;
      span {
        position: absolute;
        left: 50%;
        top: 50%;
        height: 100%;

        img {
          position: relative;
          left: -50%;
          top: -50%;
          height: 100%;
          // float: left;
          border-radius: 0.3rem;
          width: auto !important;
          // width: 100%;
        }
      }
    }
  }
}
</style>
