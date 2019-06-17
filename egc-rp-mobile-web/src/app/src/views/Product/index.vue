<template>
  <!-- 食谱详情 -->
  <div class="product">
    <Header
      v-if="isheader"
      :isshare="true"
      :isHideSearch="isSearch"
      :title="recipedata.title"
      :imageUrl="recipedata.coverimg"
      :descriContent="recipedata.description"
      :shareUrl="sharUrl+recipeId+'?sharid=1'"
    >{{this.title}}</Header>
    <!-- banner图 -->
    <div class="banner">
      <img :src="recipedata.coverimg" />
    </div>
    <!-- 作者 -->
    <div class="author">
      <!-- 头像 -->
      <div class="head-portrait">
        <img :src="userdata.headimg" />
      </div>
      <!-- nikename -->
      <span class="name">{{userdata.nickname}}</span>
      <!-- 收藏 -->
      <div
        :class="{collection:isActive,'collec':hasError}"
        @click="handleCollection"
        collection
        v-if="iscoolebtn"
      >
        <font>{{collecttext}}</font>
      </div>
    </div>
    <!-- 描述 -->
    <div class="describle">
      <!-- 标题 -->
      <div class="title">{{recipedata.title}}</div>
      <!-- 难度 -->
      <div class="difficulty">
        难度：{{difficultyView}}
        <font>制作时间：约{{diifftimeCost}}</font>
      </div>
      <!-- 描述 -->
      <div class="content">{{recipedata.description}}</div>
    </div>
    <!-- 材料 -->
    <div class="material">
      <!-- 主料 -->
      <div class="main" v-show="ingredients.length>0">
        <div class="title">主料</div>
        <div class="content">
          <ul>
            <li v-for="(items,key) in ingredients" :key="key">
              <span>{{items.ingredientName}}</span>
              <font>{{items.numberUnit}}</font>
            </li>
          </ul>
        </div>
      </div>
      <!-- 配料 -->
      <div class="ingredients" v-show="material.length>0">
        <div class="title">配料</div>
        <div class="content">
          <ul>
            <li v-for="(items,key) in material" :key="key">
              <span>{{items.ingredientName}}</span>
              <font>{{items.numberUnit}}</font>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 烹饪步骤 -->
    <div class="cookiestep">
      <div class="content" v-for="(items,key) in recipedata.cookingSteps" :key="key">
        <div class="title">{{items.title}}</div>
        <ul>
          <li v-for="(item,key) in items.cookingStepByTitle" :key="key">
            <div class="name">步骤{{item.stepno}}</div>
            <div class="img">
              <img :src="item.images">
            </div>
            <p>{{item.description}}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 小贴士 -->
    <div class="tips">
      <div class="title">小贴士</div>
      {{recipedata.tips}}
    </div>
    <!-- 支持设备 -->
    <div class="equipment" v-if="isequipment.length!==0">
      <div class="title">支持设备</div>
      <ul>
        <li
          v-for="(item,key) in recipedata.recipeMacModelMids"
          :key="key"
        >{{item.macName}} {{item.macModel}}</li>
      </ul>
    </div>
    <!-- 日期与浏览次数 -->
    <div class="datareading">
      阅读 {{recipedata.readCount}}
      <font>{{recipedata.createTime}}</font>
    </div>
    <!-- 一键烹饪按钮 -->
    <div class="cookie_btn" @click="handleCookieBtn" v-if="iscookiebtn&&isequipment.length!==0">我要烹饪</div>
    <!-- 弹出层设备 -->
    <van-popup v-model="show" position="bottom">
      <div class="equipment-popup">
        <div class="header">请选择烹饪设备</div>
        <div class="content">
          <ul>
            <li
              v-for="(item,key) in equipmentdata"
              :key="key"
              v-if="(item.status!='离线')&&(item.status!='保温中')&&(item.status!='工作中'&&item.type=='智能面包机'||item.type=='智能牛排机')"
              @click="handleIsChoose"
            >
              <van-checkbox-group
                v-model="changetrue"
                class="checlass"
                :max="1"
                @change="toggle(item.did,item.uuid,item.status,item.recipeId,item.type,recipedata.title)"
              >
                <van-checkbox v-model="item.did" :key="item.did" :name="item.did" class="choose">
                  <!-- @click="handleCookieClick(item.did,item.uuid,item.status,item.recipeId,item.type,recipedata.title)" -->
                  <a>
                    <img :src="item.image">
                    <div class="container">
                      <!-- 名称 -->
                      <span>{{item.name.length>10?item.name.substring(0,10)+'...':item.name}}</span>
                    </div>
                    <!-- 状态 -->
                    <div class="status" style="float:right">{{item.status}}</div>
                  </a>
                </van-checkbox>
              </van-checkbox-group>
            </li>
          </ul>
        </div>
      </div>
      <!-- 取消 -->
      <!-- @click="handleCancel" -->
      <div class="footer">
        <span @click="nowCookie">立即烹饪</span>
        <span @click="handleChooseTime" v-if="istimeHide">选择时间</span>
      </div>
    </van-popup>
    <temptimer
      v-if="istime"
      v-on:handleCall="handleHidetime"
      v-on:handlePropsTime="handlepropstime"
      :childDate="getcurrentdate"
      class="p-time"
    ></temptimer>
    <i class="bg-pop" v-if="ispopu"></i>
  </div>
</template>

<script>
import Header from "../../components/Header/";
import temptimer from "../../components/Time/";
import {
  product,
  recipeCollect,
  deleteCollect,
  searchEquipment
} from "../../services/api.js";
import { handleUserData } from "../../utils/appapi.js";
import { Toast, Popup, DatetimePicker, checked } from "vant";
import { startCookie } from "../../services/api.js";
import { getShareUrl } from "../../utils/request.js";
import TemplateImg from "../../components/Img/";
export default {
  data() {
    return {
      title: "",
      recipedata: "",
      changetrue: [],
      isheader: true,
      getcurrentdate: "",
      isSearch: false,
      iscookiebtn: true,
      ispopu: false,
      istime: false,
      show: false,
      isActive: true,
      collecttext: "收藏",
      hasError: false,
      sharUrl: "",
      iscoolebtn: true,
      userdata: "",
      ingredients: "",
      token: "",
      text: "1",
      material: "",
      difficulty: "",
      coverimg: "",
      timeCost: "",
      recipeId: "",
      iscollect: "",
      isequipment: "",
      istimeHide: true,
      equipmentdata: "",
      code: "",
      changedata: "",
      statusObj: []
    };
  },
  components: {
    TemplateImg,
    Header,
    temptimer
  },
  created() {
    // let redata = await this.startfCookie();
    // console.log(redata);
    // this.nowCookie();
    this.show = false;
    this.getRecipeData();
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    console.log(h + ":" + m);
  },
  methods: {
    // 判断是否选择设备
    handleIsChoose() {
      // alert(this.changedata.did);
      // if(this.changedata.did!=undefined){
      //   Toast('只支持一台设备烹饪')
      // }
    },

    nowCookie() {
      if (this.changetrue == "") {
        Toast("请选择一台设备");
      } else {
        if (this.changedata.recipeid == undefined) {
          this.changedata.recipeid = null;
        }
        // alert(this.changedata.did);
        this.handleCookieClick(
          this.changedata.did,
          this.changedata.uuid,
          this.changedata.status,
          this.changedata.recipeId,
          this.changedata.type,
          this.changedata.title
        );

        //   let gio = await this.startfCookie(
        //   this.changedata.did,
        //   this.changedata.uuid,
        //   this.changedata.recipeId
        // );

        // if(gio.code==0||gio.code==9500){

        //      this.$router.push({
        //           name: "BreadCookie",
        //           query: {
        //             macId:  this.changedata.did,
        //             iotMacModelId: this.changedata.uuid,
        //             recipeid: this.recipeId,
        //             title: this.changedata.title
        //           }
        //         });
        // }
      }
    },
    handlepropstime(time) {
      if (this.changetrue == "") {
        Toast("请选择一台设备");
      } else {
        if (this.changedata.recipeid == undefined) {
          this.changedata.recipeid = null;
        }
        if (time > 779) {
          Toast("设置的时间不能大于13个小时");
        } else {
          
          this.handleCookieClick(
            this.changedata.did,
            this.changedata.uuid,
            this.changedata.status,
            this.changedata.recipeId,
            this.changedata.type,
            this.changedata.title,
            time
          );
        }
      }
    },
    toggle(did, uuid, status, recipeId, type, title) {
      // alert( this.changetrue[this.changetrue.length-1])
      //      let changeval=[this.changetrue[this.changetrue.length-1]];
      //      this.changetrue=[];
      //  this.changetrue.push(changeval);
      //  alert(this.changetrue);
      //  if(this.statusObj.length>0){

      // }
      // this.statusObj.push(status);
      // alert(did)
      // alert(this.changetrue+did)
      //如果 循环出来的id 与选中的id匹配
      if (did == this.changetrue) {
        this.changedata = {
          did: did,
          uuid: uuid,
          status: status,
          recipeId: recipeId,
          type: type,
          title: title
        };
        // alert(this.statusObj[0]);
      }
      // alert(this.changedata.status);
      //  if(did)
    },
    // 选择时
    handleChooseTime() {
      if (this.changedata == "") {
        Toast("请选择一台设备");
      } else if (this.changedata.type != "智能面包机") {
        Toast("该设备不能选择时间");
      } else {
        this.istime = true;
        this.ispopu = true;
        this.getRecipeData();
        let date = new Date();
        let h = date.getHours();
        let m = date.getMinutes();
        this.getcurrentdate = { hours: h, minuter: m,recipeid:this.recipeId };
      }
    },
    // 查询是否是分享出去的食谱
    handleShareHide() {
      var host = window.location.href;
      let ishost = host.indexOf("sharid");
      // ||typeof EG_Recipes != "undefined"
      if (ishost != -1 || typeof EG_Recipes == "undefined") {
        this.iscoolebtn = false;
        this.iscookiebtn = false;
        this.isheader = false;
      }
    },
    // 开始烹饪
    async startfCookie(macId, iotMacModelId, recipeId) {
      let c = await startCookie(
        iotMacModelId,
        macId[0],
        this.recipeId,
        this.token,
        this.text
      );
      return c;
    },
    // 开始烹饪
    async startCookie(macId, iotMacModelId, recipeId, totime) {
      this.code = await startCookie(
        iotMacModelId,
        macId,
        recipeId,
        this.token,
        totime
      );
    },
    // 食谱详情数据
    async getRecipeData() {
      let token;
      // 调用获取用户数据

      let userData = JSON.parse(localStorage.getItem("userData"));
      if (userData == null) {
        token == null;
      } else {
        token = userData.token;
      }
      let recipedata = await product(this.$route.params.id, token);
      // 食谱数据绑定
      this.recipedata = recipedata.data;
      this.isequipment = recipedata.data.recipeMacModelMids;
      this.coverimg = recipedata.data.coverimg;
      this.timeCost = this.recipedata.timeCost;
      this.recipeId = recipedata.data.id;
      this.iscollect = this.recipedata.iscollect;
      this.title =
        this.recipedata.title.length > 6
          ? this.recipedata.title.substring(0, 16) + "..."
          : this.recipedata.title;
      //绑定用户数据
      this.userdata = recipedata.data.user;
      //获取困难程度的值（还需做判断）
      this.difficulty = recipedata.data.difficultyDegree;
      // 绑定主料
      if (recipedata.data.ingredientInfo[0].ingredients) {
        this.ingredients = recipedata.data.ingredientInfo[0].ingredients;
      }
      // 绑定辅料
      if (recipedata.data.ingredientInfo[1].ingredients) {
        this.material = recipedata.data.ingredientInfo[1].ingredients;
      }
      // 判断是否收藏
      if (this.iscollect == false) {
        this.isActive = true;
        this.hasError = false;
      } else if (this.iscollect == true) {
        this.isActive = false;
        this.hasError = true;
        this.collecttext = "已收藏";
      }
    },

    // 点击收藏
    async handleCollection(e) {
      // 调用获取用户数据
      handleUserData();

      setTimeout(async () => {
        let userData = JSON.parse(localStorage.getItem("userData"));
        if (userData != null) {
          if (this.collecttext == "收藏") {
            let resdata = await recipeCollect(this.recipeId, userData.token);
            if (resdata.code == 0) {
              // Toast("你已经收藏该食谱~");
              Toast("收藏成功~");
              this.collecttext = "已收藏";
              this.isActive = false;
              this.hasError = true;
            } else if (resdata.code == 1) {
              let resdata = await deleteCollect(this.recipeId, userData.token);
              if (resdata.code == 0) {
                Toast("您已取消收藏~");
                this.collecttext = "收藏";
                this.isActive = true;
                this.hasError = false;
              }
            }
          } else if ((this.collecttext = "已收藏")) {
            let resdata = await deleteCollect(this.recipeId, userData.token);
            if (resdata.code == 0) {
              Toast("您已取消收藏~");
              this.collecttext = "收藏";
              this.isActive = true;
              this.hasError = false;
            }
          }
        }
      }, 200);
    },
    // 点击取消隐藏弹出
    handleCancel() {
      this.show = false;
    },
    //点击一键烹饪 弹出
    async handleCookieBtn() {
      this.changetrue = [];
      handleUserData();
      setTimeout(async () => {
        let userData = JSON.parse(localStorage.getItem("userData"));
        if (userData != null) {
          this.token = userData.token;
          let resdata = await searchEquipment(this.recipeId, userData.token);
          this.equipmentdata = resdata.data;
          if (this.equipmentdata[0]) {
            if (this.equipmentdata[0].type == "智能牛排机") {
              this.istimeHide = false;
            }
          }
          if (this.equipmentdata.length > 0) {
            this.show = true;
          } else {
            Toast("您没有可支持此食谱的设备！");
            this.show = false;
          }
        }
      }, 300);
    },
    handleHidetime(msg) {
      this.ispopu = false;
      this.istime = false;
    },
    // 烹饪跳转并且获取状态跟是否跳转
    async handleCookieClick(
      macId,
      iotMacModelId,
      status,
      recipeid,
      type,
      title,
      totaltime
    ) {
      localStorage.setItem('totaltime',totaltime);
      // alert( macId+
      // iotMacModelId+
      // status+
      // recipeid+
      // type+
      // title)
      // alert(recipeid);
      // alert(status)
      let that = this;
      // this.handleCookieBtn();
      if (status == "离线") {
        Toast("离线设备无法使用~");
      } else if (this.recipeId == recipeid) {
        if (status == "待机") {
          if (type == "智能牛排机") {
            this.startCookie(macId, iotMacModelId, this.recipeId, totaltime);
            setTimeout(() => {
              if (this.code.code == 0 || this.code.code == 9500) {
                this.$router.push({
                  name: "SteakCookie",
                  query: {
                    macId: this.macId,
                    iotMacModelId: this.iotMacModelId,
                    recipeid: this.recipeId,
                    title: title
                  }
                });
              } else {
                Toast("控制异常，请确认网络和设备工作是否正常！");
              }
            }, 300);
          } else {
            // alert('1233');
            this.startCookie(macId, iotMacModelId, this.recipeId, totaltime);

            setTimeout(() => {
              if (this.code.code == 0 || this.code.code == 9500) {
                this.$router.push({
                  name: "BreadCookie",
                  query: {
                    macId: macId,
                    iotMacModelId: iotMacModelId,
                    recipeid: this.recipeId,
                    title: title
                  }
                });
              } else {
                Toast("控制异常，请确认网络和设备工作是否正常！");
              }
            }),
              300;
          }
          return false;
        }
        if (
          status == "预热" ||
          status == "预热完成" ||
          status == "工作中" ||
          status == "暂停中"
        ) {
          if (type == "智能牛排机") {
            this.$router.push({
              name: "SteakCookie",
              query: {
                macId: macId,
                iotMacModelId: iotMacModelId,
                recipeid: this.recipeId,
                title: title
              }
            });
          } else {
            this.$router.push({
              name: "BreadCookie",
              query: {
                macId: macId,
                iotMacModelId: iotMacModelId,
                recipeid: this.recipeId,
                title: title
              }
            });
          }
        }
      } else if (recipeid == null && status != "待机") {
        Toast("设备正在运行中~");
      } else if (this.recipeId != recipeid) {
        if (status == "待机") {
          if (type == "智能牛排机") {
            this.startCookie(macId, iotMacModelId, this.recipeId, totaltime);
            setTimeout(() => {
              if (this.code.code == 0 || this.code.code == 9500) {
                this.$router.push({
                  name: "SteakCookie",
                  query: {
                    macId: macId,
                    iotMacModelId: iotMacModelId,
                    recipeid: this.recipeId,
                    title: title
                  }
                });
              } else {
                Toast("控制异常，请确认网络和设备工作是否正常！");
              }
            }, 1000);
          } else {
            this.startCookie(macId, iotMacModelId, this.recipeId, totaltime);
            setTimeout(() => {
              if (this.code.code == 0 || this.code.code == 9500) {
                this.$router.push({
                  name: "BreadCookie",
                  query: {
                    macId: macId,
                    iotMacModelId: iotMacModelId,
                    recipeid: this.recipeId,
                    title: title
                  }
                });
              }
            }, 500);
          }
        } else {
          Toast("当前设备正在工作中或者正在烹饪别的食谱！");
        }
      }
    }
  },
  mounted() {
    this.sharUrl = getShareUrl();
    this.getRecipeData();
    setTimeout(() => {
      this.getRecipeData();
      this.handleShareHide();
    }, 300);
    let userToken;
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (userData == null) {
      userToken = null;
    } else {
      userToken = userData.token;
    }
    this.token = userToken;
  },
  computed: {
    // 判断是否大于60分钟
    diifftimeCost() {
      if (this.timeCost < 60) return this.timeCost + "分钟";
      if (this.timeCost >= 60) {
        return Math.floor(this.timeCost / 60) + "小时";
      }
    },
    // 判断食谱困难程度
    difficultyView() {
      switch (this.difficulty) {
        case 0:
          return "初级";
        case 1:
          return "中级";
        case 2:
          return "高级";
        default:
          "未知";
      }
    }
  }
};
</script>

<style lang='less' scoped>
.product {
  background-color: #fff;
  .banner {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .author {
    height: 5rem;
    border-bottom: 0.5px solid #ccc;
    padding: 0 1rem;
    line-height: 5rem;
    display: flex;
    .head-portrait {
      height: 3rem;
      width: 3rem;
      img {
        vertical-align: middle;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    span {
      line-height: 5rem;
      float: left;

      color: #4a4a4a;
      font-size: 1.4rem;
      margin-left: 1rem;
    }
    .collection {
      flex: 1;
      font {
        margin-right: 1rem;
        display: inline-block;
        font-size: 1.4rem;
        line-height: 3rem;
        margin-top: 1rem;
        color: #fff;
        padding: 0 2rem;
        border-radius: 3rem;
        background: #3cadff 100%;
        float: right;
      }
    }
    .collec {
      flex: 1;

      font {
        margin-right: 1rem;
        display: inline-block;
        font-size: 1.4rem;
        background-color: #ccc;
        line-height: 3rem;
        margin-top: 1rem;
        color: #fff;
        padding: 0 2rem;
        border-radius: 3rem;
        border: 0.5px solid #ccc;
        float: right;
      }
    }
  }
  .describle {
    padding: 0 1rem 1rem 1rem;
    border-bottom: 0.5px solid #ccc;
    .title {
      height: 4rem;
      line-height: 4rem;
      font-size: 1.6rem;
    }
    .difficulty {
      font-size: 1.2rem;
      color: #898989;
      font {
        margin-left: 1rem;
      }
    }
    .content {
      line-height: 2.5rem;
      margin-top: 1rem;
      color: #4a4a4a;
      font-size: 1.4rem;
    }
  }
  .material {
    padding: 0 1rem;
    border-bottom: 0.5px solid #ccc;
    .title {
      font-size: 1.6rem;
      height: 4rem;
      line-height: 4rem;
    }
    .content {
      ul {
        li {
          height: 3rem;
          font-size: 1.4rem;
          color: #4a4a4a 100%;
          width: 100%;
          position: relative;
          span {
            width: 80%;
            font-size: 1.4rem;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          font {
            float: right;
            margin-right: 3rem;
          }
        }
      }
    }
    .main {
    }
  }
  .cookiestep {
    .content {
      padding: 1rem;
      .title {
        height: 2rem;
        line-height: 2rem;
        font-size: 1.4rem;
      }
      ul {
        border-bottom: 0.5px solid #ccc;
        padding-bottom: 1rem;

        li {
          .name {
            font-size: 1.2rem;
            height: 3rem;
            color: #fe3824;
            line-height: 3rem;
          }
          img {
            width: 100%;
          }
          p {
            font-size: 1.4rem;
            overflow: hidden;
            line-height: 2rem;
          }
        }
      }
    }
  }
  .tips {
    padding: 1rem;
    font-size: 1.4rem;
    color: #4a4a4a;
    line-height: 2rem;
    border-bottom: 0.5px solid #ccc;
    .title {
      font-size: 1.6rem;
      height: 3rem;
      color: #4a4a4a;
      line-height: 3rem;
    }
  }
  .equipment {
    padding: 1rem;
    .title {
      height: 3rem;
      line-height: 3rem;
      font-size: 1.4rem;
      color: #4a4a4a;
      text-align: center;
    }
    ul {
      border-bottom: 0.5px solid #ccc;
      li {
        font-size: 1.4rem;
        height: 3rem;
        line-height: 3rem;
      }
    }
  }
  .datareading {
    height: 3rem;
    color: #898989;
    padding: 0 1rem;
    line-height: 3rem;
    font-size: 1.4rem !important;
    font {
      font-size: 1.4rem !important;
      float: right;
    }
  }
  .cookie_btn {
    width: 10rem;
    height: 6.5rem;
    position: fixed;
    bottom: 5rem;
    right: 0;
    color: #feb119;
    line-height: 6.5rem;
    text-align: center;
    font-size: 1.4rem;
    border-radius: 5rem 0 0 5rem;
    background: #4a4a4a;
  }
  .van-popup {
    position: fixed !important;
    // border-radius: 1.2rem;
  }
  .footer {
    height: 5rem;
    color: #4a4a4a;
    display: flex;
    letter-spacing: -0.41px;
    line-height: 5rem;
    border-top: 1rem solid #f7f7f7;
    font-size: 1.6rem;
    text-align: center;

    span {
      font-size: 1.6rem;
      display: inline-block;
      flex: 1;
    }
    span:nth-child(1) {
      color: #3cadff;
      border-right: 0.5px solid #ccc;
    }
  }
  .equipment-popup {
    width: 30rem;
    margin: 0 auto;
    height: auto;
    bottom: 0;
    padding: 1rem 0;
    background-color: #fff;

    .header {
      text-align: center;
      font-size: 1.4rem;
      height: 4rem;
      border-bottom: 0.5px solid #e7e2e5;
      font-size: 16px;
      letter-spacing: -0.39px;
      color: #4a4a4a;
      letter-spacing: -0.41px;
      text-align: center;
      line-height: 16px;
      line-height: 4rem;
      width: 100%;
    }

    ul {
      li {
        padding: 1rem 0;
        border-bottom: 0.5px solid #e7e2e5;
        height: 5rem;
        width: 100%;
        position: relative;
        a {
          display: flex;
          width: 100%;

          padding: 0 1rem;
          .choose {
            float: left;
            padding-right: 1rem;
            margin-top: 1rem;
          }
          .container {
            padding-left: 1rem;
            font-size: 1.4rem;
            line-height: 5rem;
            vertical-align: middle;
            span {
              color: #4a4a4a;
              display: block;
              margin-top: 1rem;
              line-height: 3rem;

              font-size: 1.4rem;
            }
          }
          .status {
            color: #898989;
            letter-spacing: -0.34px;
            font-size: 1.4rem;
            line-height: 5rem;
            flex: 1;
            position: absolute;
            right: 0;
            color: #4a4a4a;
            padding-right: 2rem;
            text-align: right;
            display: inline-block;
            float: right !important;
          }
          img {
            width: 5rem;
            height: 5rem;
          }
        }
      }
    }
  }
}
.bg-pop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.p-time {
  position: relative;
  bottom: 0;
  overflow: hidden;
  border: 1px solid red;
}
.checlass {
  // display: inline-block;
  // width: 100%;
  // position:absolute;
  // right:0;
}
.van-popup--bottom {
  top: auto !important;
}
</style>

