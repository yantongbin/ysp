<template>
  <div class="home">
    <!-- home 头部 -->
    <div class="header">
    <div class="scan-icon" @click='handleCode'>
      <i class="icon iconfont icon-saoyisao"></i>
    </div>
    <div class="search-input" @click='handleSearch'>
      <span><i class="icon iconfont icon-search_001"></i>搜索食谱/食材/问题</span>
    </div>
    <div class="scan-icon" @click='handleMore'>
      <i class="icon iconfont icon-more"></i>
    </div>
      <!-- 弹出更多 -->
        <div class="popup-more menu-class" v-if='moreview'>
          <ul>
            <li> <router-link to='/cookieHistory'>烹饪记录</router-link></li>
            <li> <router-link to='/history'>收藏记录</router-link></li>
          </ul>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAYAAAFI2EyZAAAAAXNSR0IArs4c6QAAAIVJREFUKBWVkN0NgDAIhDFu4SauZRyjcSxHcQ57pWdA6ENJWn78OCoiamf3guDpR2uLy2oSEQX9/YmEfs8N9NAFw7CjRfHaYkkbXH11mf7dXmuYcPObhfBymgMJWSCAgDLgDzJPvV0x4mmzAniNPakg981JgEZ7J0N/1aAwodCMAHvpm+ALCRYgJABhMPUAAAAASUVORK5CYII="/>
        </div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <!-- banner图 -->
    <div class="banner">
  <van-swipe :autoplay="3000" :touchable="true">
    <!-- <img :src="item.image"/> -->
        <van-swipe-item v-for='(item,key) in bannerdata' :key='key' v-if='item.type==0'><router-link :to="{ name: 'Product', params: { id: item.relatedId }}" > <TemplateImg :msg='item.image'></TemplateImg> </router-link></van-swipe-item>
        <van-swipe-item v-for='(item,key) in bannerdata' :key='key' v-if='item.type==1'><router-link :to="{ name: 'Article', params: { id: item.relatedId }}" >  <TemplateImg :msg='item.image'></TemplateImg></router-link></van-swipe-item>
        <van-swipe-item v-for='(item,key) in bannerdata' :key='key' v-if='item.type==2'><router-link :to="{ name: 'Themrecipe', params: { id: item.relatedId }}" >  <TemplateImg :msg='item.image'></TemplateImg></router-link></van-swipe-item>
  </van-swipe>
    </div>
    <!-- 导航 -->
    <div class="nav">
      <ul>
        <li>
            <router-link to='/category'>
          <img src="../../assets/images/icon_classify.png"/>
          <span>食谱分类</span>
          </router-link>       
        </li>
        <li>
            <router-link to='/hotrecipe'>
          <img src="../../assets/images/icon_hot.png"/>
           <span>热门食谱 </span>
          </router-link>       
        </li>
        <li>
            <router-link to='/steakrecipe'>
            <img src="../../assets/images/icon_recipe_niupa.png"/>
          <span>牛排机食谱</span>
          </router-link>       
            </li>
         <li>
         <router-link to='/breadrecipe'>
          <img src="../../assets/images/icon_recipe_mianbao.png"/>
            <span>面包机食谱</span>
          </router-link>       
        </li>
      </ul>
    </div>
    <!--食谱内容 -->
    <div class="content">
      <div class="main" v-for='(item,key) in elementdata' :key='key'>
      <!-- 食谱软文 -->
      <template v-if='item.type===1'>
      <Article :data='item.data'></Article>
      </template>
      <!-- 食谱详情 -->
       <template v-if='item.type===0'>
       <Recipetemplate :data='item.data'></Recipetemplate>
      </template>
        <!-- 食谱主题 -->
      <template v-if='item.type===2'>
       <Theme :data='item.data'></Theme>
      </template>
      </div>
    </div>
    </van-pull-refresh>
    <Loading v-if='myisloading'></Loading>
    <!-- 弹出搜索页面-->
      <Search  ref='isSearch'></Search>
      <span class="iscookie" v-if='showCooie' @click='cookiebtn'><img src="../../assets/images/icon_video.gif"/></span>
      <van-popup v-model="show">
          <div class="cookie-state">
  <div class="title">
    烹饪食谱列表
  </div>
  <div class='content'>
    <ul>
      <li v-for='(item,key) in itemdata' :key='key' v-if='item.macName=="智能牛排机"'>
        <router-link  :to="{ name:'SteakCookie', query: { iotMacModelId: item.iotMacModelId ,recipeid:item.recipeId,macId:item.macId,title:item.title}}"  :id='item.recipeId'>
          <i><img :src="item.coverimg"/></i>
        <div>
          <font>{{item.title.length>22?item.title.substring(0,22)+'...':item.title}} </font>
        </div>
        </router-link>
      </li>
       <li v-for='(item,key) in itemdata' :key='key' v-if='item.macName=="智能面包机"'>
        <router-link  :to="{ name:'BreadCookie', query: { iotMacModelId: item.iotMacModelId ,recipeid:item.recipeId,macId:item.macId,title:item.title}}"  :id='item.recipeId'>
          <i><img :src="item.coverimg"/></i>
        <div>
          <font>{{item.title.length>22?item.title.substring(0,22)+'...':item.title}} </font>
        </div>
        </router-link>
      </li>
    </ul>
  </div> 
<div class="cancel" @click='cancel'>
取消
  </div>
  </div>
  </van-popup>
  </div>
</template>

<script>
import Article from "../../components/Article/";
import Theme from "../../components/Theme/";
import Loading from "../../components/Loading/";
import Recipetemplate from "../../components/Recipetemplate/";
import Search from "../../components/Search/";
import Img from '../../components/Img/';
import TemplateImg from '../../components/Img/';

// import {imgSplite}  from '../../utils/util.js';
import {
  homebanner,
  getElement,
  getUserCookieing
} from "../../services/api.js";
import { handleUserData } from "../../utils/appapi.js";
import { Popup, Toast } from "vant";
export default {
  components: {
    Article,
    Search,
    Theme,
    Loading,
    Recipetemplate,
    TemplateImg
  },
  data() {
    return {
      showCooie: true,
      show: false,
      moreview: false,
      itemdata: "",
      isSearch: false,
      isLoading: false,
      myisloading: false,
      bannerdata: "",
      elementdata: ""
    };
  },
  created() {
    // setInterval(() => {
    //       this.getUserCookieing();
    //     }, 1000);
  },
  mounted() {
    // localStorage.removeItem("userData");

    // console.log(store.state.LOADING);

    // this.getUserCookieing();
    this.onloading();
    this.getBannerData();
    this.getElement();

    let _this = this;
    document.body.addEventListener("click", e => {
      this.moreview = false;
    });
  },
  methods: {
    onloading() {
      setTimeout(() => {
        this.myisloading = false;
      }, 500);
    },
    // 获取轮播图数据
    async getBannerData() {
      let dataRes = await homebanner();
      this.bannerdata = dataRes.data.list;
    },
    // 获取食谱视图内容
    async getElement() {
      let elementData = await getElement();
      this.elementdata = elementData.data;
    },
    // 点击隐藏
    handleSearchHide() {
      this.isSearch = true;
    },
    // 弹出搜索页面
    handleSearch() {
      document.body.scrollTop = 0;
      this.$refs.isSearch.show = true;
    },
    // 调用 扫一扫
    handleCode() {
      EG_Recipes.nativeQRCoderScan(
        JSON.stringify({ funName: "nativeScanReuslt", rootType: 5 })
      );
    },
    // 获取用户是否正在烹饪
    async cookiebtn() {
      handleUserData();
      let userData = JSON.parse(localStorage.getItem("userData"));
      let userCooikeData = await getUserCookieing(userData.token);
        let isShow = userCooikeData.data.length;
        this.itemdata = userCooikeData.data;
        if (isShow > 0) {
          this.show = true;
        } else {
          Toast("您当前没有正在烹饪的食谱！");
        }
      
    },
    // 隐藏烹饪列表
    cancel() {
      this.show = false;
    },
    //显示烹饪列表
    // cookiebtn() {
    //   this.show = true;
    // },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        window.location.reload();
        this.isLoading = false;
      }, 500);
    },
    handleMore(e) {
      handleUserData();
      this.moreview ? (this.moreview = false) : (this.moreview = true);
      e.stopPropagation();
    }
  },
  computed:{
    // spliteImg(url){
    //     return url
    // }
  }
};
</script>

<style lang='less' scoped>
.nav ul li a img {
  height: 5rem;
}
.nav {
  margin-top: 0.5rem;
  background-color: #fff;
  padding: 1rem 0;
  ul {
    display: flex;
    width: 100%;
    li {
      flex: 1;
      text-align: center;
      a {
        display: inline-block;
        img {
          height: 5rem;
        }
        span {
          height: 2rem;
          line-height: 1.6rem;
          display: block;
          color: #4a4a4a;
          letter-spacing: 0;
          font-size: 1.2rem;
        }
      }
    }
  }
}

.home {
  width: 100%;
  position: relative;
  max-width: 640px;
  margin: 0 auto;
  padding-top: 4.5rem;
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
      z-index: 999999;
      text-align: center;
      height: 4.5rem;
      i {
        line-height: 4.5rem;
        color: #3c3c3c;
        display: inline-block;
        font-size: 2.6rem;
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
        color: #a1a1a1;
        width: 100%;
        background-color: #f5f6f8;
        i {
          display: inline-block;
          margin-right: 1rem;
          margin-left: 1rem;
          float: left;
          color: #a1a1a1;
          font-size: 1.8rem;
        }
      }
    }
  }
  .banner {
    // padding: 0 1rem 0.5rem 1rem;
    padding:0;
    width: 100%;
    // border-radius: 3px;
    height: 14.5rem;
    overflow: hidden;
    background-color: #fff;
    img {
      // border-radius: 5px;
      width: 100%;
    }
  }
  .nav {
    margin-top: 0.5rem;
    background-color: #fff;
    padding: 1rem 0;
    ul {
      display: flex;
      width: 100%;
      li {
        flex: 1;
        text-align: center;
        a {
          display: inline-block;
          img {
            height: 5rem;
            width: auto !important;
          }
          span {
            height: 2rem;
            line-height: 1.6rem;
            display: block;
            color: #4a4a4a;
            letter-spacing: 0;
            font-size: 1.2rem;
          }
        }
      }
    }
  }
  .content {
    padding: 0 1rem;
  }
  .searchpopup {
    height: 100%;
  }
  .popup-more:before {
    position: absolute;
    top: -5px;
    right: 5px;
    width: 10.5px;
    display: block;
    height: 5px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAJCAYAAAFI2EyZAAAAAXNSR…JPvV0x4mmzAniNPakg981JgEZ7J0N/1aAwodCMAHvpm+ALCRYgJABhMPUAAAAASUVORK5CYII=)
      no-repeat 50%;
    background-size: 100% 100%;
    content: "";
  }
  .popup-more {
    position: absolute;
    top: 0;
    right: 0;
    height: auto;
    bottom: 0;
    width: 100px;
    z-index: 999;
    display: block;
    img {
      width: 1.5rem;
      position: absolute;
      top: 3rem;
      right: 1.5rem;
    }
    ul {
      position: absolute;
      top: 38px;
      right: 10px;
      display: block;
      z-index: 1000;
      border-radius: 4px;
      width: 125px;
      background: rgba(0, 0, 0, 0.9);
      list-style-type: none;
      margin: 0;
      padding: 0;
      list-style: none outside none;
      background-color: rgba(0, 0, 0, 0.9);
      li {
        display: block;
        text-align: center;
        position: relative;
        border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);
        height: 40px;
        line-height: 40px;
        border-radius: 4px;
        width: 125px;
        /* background: rgba(0,0,0,.9); */
        list-style-type: none;
        margin: 0;
        padding: 0;
        list-style: none outside none;
        z-index: 1000;
        list-style-type: none;
        margin: 0;
        padding: 0;
        list-style: none outside none;

        a {
          display: block;
          border: 0;
          width: 100%;
          font-size: 14px;
          color: #fff;
          z-index: 1000;
          text-decoration: none;
        }
      }
    }
  }
  .iscookie {
    position: fixed;
    right: 0.5rem;
    top: 16rem;
    img {
      height: 5rem;
      width: auto;
    }
  }
  .cookie-state {
    width: 25rem;
    border-radius: 3rem;
    overflow: hidden;
    border-radius: 5rem;
    height: auto;
    background-color: #fff;
    .title {
      width: 100%;
      color: #4a4a4a;
      text-align: center;
      font-size: 1.5rem;
      line-height: 4rem;
      height: 4rem;
      border-bottom: 0.5px solid #ccc;
    }
    .cancel {
      height: 4rem;
      width: 100%;
      color: #4a4a4a;
      letter-spacing: -0.41px;
      line-height: 4rem;
      font-size: 1.6rem;
      text-align: center;
    }
    .content {
      height: auto;
      overflow: hidden;
      ul {
        li:last-child {
          border-bottom: 0.5px solid #ccc;
        }
        li {
          height: 6rem;
          position: relative;
          // overflow: hidden;
          a {
            display: flex;

            i {
              width: 6rem;
              display: inline-block;
              text-align: left;
              padding: 1rem;
              img {
                height: 4rem;
                width: 100%;
              }
            }
            span {
              display: block;
              margin-top: 1rem;
              font-size: 1.3rem;
            }
            div {
              flex: 1;
              font {
                display: block;
                margin-top: -0.5rem;
                line-height: 2rem;
                margin-top: 1rem;
                color: #4a4a4a;
                font-size: 1.4rem;
              }
            }
          }
        }
      }
    }
  }
  .van-popup {
    border-radius: 1rem;
  }
}
</style>
