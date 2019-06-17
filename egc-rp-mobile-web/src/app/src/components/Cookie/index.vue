<template>
  <!-- 食谱详情 -->
  <router-link :to="({name:'Product',params:{id:data.id}})" class="recipemplate">
    <div class="main">
      <div class="left">
        <TemplateImg :msg="data.coverimg=='undefined'?'':data.coverimg"></TemplateImg>
      </div>
      <div class="right">
        <!-- 标题 -->
        <div class="title">{{titlesplit}}</div>
        <!-- 标签 -->
        <!-- <div class="label" v-show="data.listTags!==null">
          <ul>
            <li v-for="(item,key) in data.listTags" :key="key">{{item}}</li>
          </ul>
        </div> -->
        <div class="time">
          {{data.createTime}}
          </div>      
            <!-- 作者 -->
        <div class="author">
          {{data.nickname}}
          <span>已有{{data.cookiedCount}}人做过</span>
        </div>
        <!-- 收藏与浏览 -->
        <div class="collection">
          <ul>
            <li>
              <i class="icon iconfont icon-chakan"></i>
              {{data.readCount}}
            </li>
            <li>
              <i class="icon iconfont icon-wujiaoxingkong"></i>
              {{data.collectCount}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import TemplateImg from "../../components/Img/";

export default {
  data() {
    return {
      title: ""
    };
  },
  props: {
    data: {
      type: Object
    }
  },
  components: {
    TemplateImg
  },
  mounted() {},
  computed: {
    titlesplit() {
      let objtitle = this.data.title;
      return objtitle.length > 6 ? objtitle.substring(0, 14) + "..." : objtitle;
    }
  }
};
</script>

<style lang='less' scoped>
.recipemplate {
  width: 100%;
  margin-top: 1rem;
  display: inline-block;
  overflow: hidden;
  background-color: #fff;
  height: 12rem;
  border-radius: 3px;
  // box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  .main {
      display: flex;
      width: 100%;
      border-radius: 3px;
      overflow: hidden;

    height: 12rem;
    .left {
      // flex: 1;
      margin-right: 1rem;
      overflow: hidden;
      // height: 100%;
      width: 100%;
      width: 12rem;
      img {
        border-radius: 3px;
        // height: 100%;
        width: 100%;
      }
    }
    .right {
            width: 50%;
            .time{
                font-size: 1.3rem;
                        color: #898989;
            }
      .title {
        height: 3rem;
        overflow: hidden;
        line-height: 3rem;
        font-size: 1.5rem;
        color: #4a4a4a;
        overflow: hidden;
        width: 17rem;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .label {
        font-size: 1rem;
        height: 1.5rem;
        display: block;
        width: 100%;
        ul {
          li {
            overflow: hidden;
            float: left;
            color: #898989;
            margin-right: 1rem;
            font-size: 1.2rem;
          }
        }
      }
      .author {
        height: 2rem;
        line-height: 2rem;
        display: block;
        margin-top: 0.3rem;
        color: #4a4a4a;
        font-size: 1.3rem;
        span {
          color: #898989;
          margin-left: 0.5rem;
          font-size: 1rem;
        }
      }
      .collection {
        margin-top: 0.3rem;
        ul {
          display: flex;
          li {
            height: 2rem;
            font-size: 1rem;
            line-height: 2rem;
            margin-right: 1.5rem;
            color: #898989;
            i {
              font-size: 1.6rem;
              margin-right: 0.5rem;
              color: #898989;
              float: left;
            }
          }
          li:last-child i {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
}
</style>
