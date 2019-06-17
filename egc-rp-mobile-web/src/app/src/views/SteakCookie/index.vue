<template>
  <div class="steakCokkie">
    <Header :isshare="false">智能牛排机</Header>
    <!-- 头部 -->
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
    <div class="ysp-header">
      <div class="left" @click="handleLock">
        <img src="../../assets/images/icon_lock_dis.png" id="lockimg">
        <span :class="{lockcolor:iscolor}">童锁</span>
      </div>
      <!-- <div class='right'>
                    <img src="../../assets/images/icon_scan_dis.png"/>
                     <span>扫一扫</span>
      </div>-->
    </div>
    <!-- 环形倒计时 -->
    <div class="content">
      <van-circle
        v-model="currentRate"
        :color="rotecolor"
        fill="#fff"
        size="20rem"
        layer-color="#ddd"
        :text="timer"
        :rate="rate"
        :speed="100"
        :clockwise="false"
        :stroke-width="18"
      />
      <!-- 时间 -->
      <span class="test-time">剩余时间</span>
      <!-- 名称 -->
      <span class="name">{{title}}</span>
      <!-- 状态 -->
      <span class="tatus">{{statusText}}</span>
      <!-- 动画圈圈 -->
      <ul id="countdown" v-if="isanimate">
        <li>
          <i>
            <b class="dotdot"></b>
          </i>
          <span class="seconds"></span>
        </li>
      </ul>
    </div>
    <!-- 按钮组 -->
    <div class="cookie-btn">
      <van-button
        round
        type="danger"
        :class="{ active: isActive,round:isround}"
        @click="handleSteakStopCookie"
        :disabled="topdisblead"
      >停止</van-button>
      <van-button
        round
        type="danger"
        :class="{ active: isActive,round:isround}"
        @click="handleAginStartCookie"
        v-if="isaginbtn"
      >开始煎烤</van-button>
    </div>

    <Recipetemplate v-for="(item,key) in  steakdata.list" :key="key" :data="item"></Recipetemplate>
    <!-- </van-pull-refresh> -->
    <Loading v-if="isloadinghide" class="loading"></Loading>
  </div>
</template>
<script>
import Header from "../../components/Header/index.vue";
import { Circle, Button, Dialog } from "vant";
import locaactive from "../../assets/images/icon_lock_select.png";
import loca from "../../assets/images/icon_lock_dis.png";
import { handleUserData } from "../../utils/appapi.js";
import { Toast, Popup } from "vant";
import { getApiUrl } from "../../utils/request.js";
import Recipetemplate from "../../components/Recipetemplate/";
import Loading from "../../components/Loading/";

import {
  steackAgainCookie,
  steakStopCookie,
  startCookie,
  methodclock,
  cookieSearch,
  searchEquipments
} from "../../services/api.js";
export default {
  data() {
    return {
      currentRate: 0,
      timer: "--:--",
      steakdata: "",
      rotecolor: "#ddd",
      rate: 10,
      defaluttime:'',
      isLoading: false,
      isloadinghide: true,
      iscolor: false,
      isclassstop: false,
      topdisblead: false,
      isanimate: false,
      isActive: false,
      isround: true,
      statusText: "",
      title: "",
      isaginbtn: false,
      macId: "",
      iotMacModelId: "",
      recipeid: "",
      token: ""
    };
  },
  components: {
    Header,
    Recipetemplate,
    Loading
  },
  methods: {
    // 下拉刷新
    // onRefresh() {
    //   setTimeout(() => {
    //     window.location.reload();
    //     this.isLoading = false;
    //   }, 500);
    // },
    // 获取用户token
    getUserToken() {
      // 获取用户token
      handleUserData();
      let userData = JSON.parse(localStorage.getItem("userData"));
      this.token = userData.token;
    },
    // 连接websock
    linkWebsock() {
      let SocketUrl = getApiUrl();
      let stompClient = null;
      let macId = this.macId;
      // 52为测试环境
      let socket = new SockJS(SocketUrl); //1牛排机连接SockJS的endpoint是“endpointWisely”，与后台代码中注册的endpoint要一样。
      stompClient = Stomp.over(socket); //2创建STOMP协议的webSocket客户端。
      stompClient.connect(
        { macId: macId },
        frame => {
          //3连接webSocket的服务端。
          console.log("开始进行连接Connected: " + frame);
          //4通过stompClient.subscribe1（）订阅服务器的目标是'/user/' + userId + '/msg'接收一对一的推送消息,其中userId由服务端传递过来,用于表示唯一的用户,通过此值将消息精确推送给一个用户
          stompClient.subscribe("/user/" + macId + "/msg", response => {
            var obj = JSON.parse(response.body);
            this.statusText = obj.iotPlatformMessages.runstateText;
            this.isloadinghide = false;
            if (
              obj.iotPlatformMessages.runstateText == "待机" &&
              obj.iotPlatformMessages.data.over == 0
            ) {
              Toast("您已经终止了此食谱！");
              this.$router.go(-1);
            }
            // 如果烹饪完成
            if (obj.iotPlatformMessages.data.over == 1) {
              this.$router.push("/complete");
            } else if (obj.iotPlatformMessages.runstate == 0) {
              this.isanimate = false;
              this.isaginbtn = true;
            }

            let timecomputed = obj.iotPlatformMessages.data;
            // 保存童锁状态
            this.lockstatus = timecomputed.childLock;
            // 判断童锁状态
            if (this.lockstatus == 1) {
              document.getElementById("lockimg").src = locaactive;
              this.isround = false;
              this.iscolor = true;
              this.isActive = true;
              this.topdisblead = true;
            } else {
              document.getElementById("lockimg").src = loca;
              this.isround = true;
              this.iscolor = false;
              this.isActive = false;
              this.topdisblead = false;
            }
            //  计算剩余总时间
            var total =
              timecomputed.downRemianTimeSecond +
                timecomputed.downTimeMinuteL * 60 <
              timecomputed.upRemainTimeSecond + timecomputed.upTimeMinuteL * 60
                ? timecomputed.upRemainTimeSecond +
                  timecomputed.upTimeMinuteL * 60
                : timecomputed.downTimeSecond +
                  timecomputed.downTimeMinuteL * 60;
            // 1为预热状态
            if (obj.iotPlatformMessages.runstate === 1) {
              this.isanimate = true;
            } else if (obj.iotPlatformMessages.runstate === 2) {
              this.isanimate = false;
              this.isaginbtn = true;
              // 判断是否等于工作中
              if (obj.iotPlatformMessages.runstateText == "工作中") {
                this.isaginbtn = false;
              }
              // 时间转成分秒
              this.time(total);
              // 算出总时间
              let StartMinuteH =
                timecomputed.downTimeSetMinute * 60 +
                timecomputed.downTimeSetSecond;
              if (this.rate > 0) {
                this.rotecolor = "#3CADFF";
              }
              //  判断剩余总时间是否归0
              if (total == 1) {
                this.rate = 0;
                this.timer = "00:01";
                return false;
              }
              // 时间跟环形进度对比换算
              this.rate = (total * 100) / StartMinuteH;
            }
          });
        }
      );
    },

    //   计算时间
    time(second) {
      //将秒数除以60，然后下舍入，既得到分钟数
      let m; //分
      let s; //秒
      m = Math.floor(second / 60);
      // 取得秒%60的余数，既得到秒数
      s = second % 60;
      //将变量转换为字符串
      m += "";
      s += "";
      //如果只有一位数，前面增加一个0
      m = m.length == 1 ? "0" + m : m;
      s = s.length == 1 ? "0" + s : s;
      if (m == "NaN") {
        this.timer = "--:--";
      } else {
        this.timer = m + ":" + s;
      }
    },
    // 开始煎烤
    async handleAginStartCookie() {
      this.getUserToken();
      let jk = "1";
      let cookiedata = await steackAgainCookie(
        this.iotMacModelId,
        this.macId,
        this.recipeid,
        this.token,
        jk
      );
      console.log(cookiedata);
    },
    // 牛排机停止烹饪
    async handleSteakStopCookie() {
      Dialog.confirm({
        title: "提示",
        message: "你要停止此食谱吗？"
      })
        .then(async () => {
          this.getUserToken();
          let cookiedata = await steakStopCookie(
            this.iotMacModelId,
            this.macId,
            this.recipeid,
            this.token
          );
          if (cookiedata.code == 0) {
            this.$router.go(-1);
          }
        })
        .catch(() => {});
    },
    // 开启烹饪
    async handleStartCookie() {
      this.getUserToken();

      // alert(this.recipeid);
      let text = "开启烹饪";
      let cookiedata = await startCookie(
        this.iotMacModelId,
        this.macId,
        this.recipeid,
        this.token,
        text
      );
      console.log(cookiedata);
    },
    // 童锁
    async handleLock(e) {
      this.getUserToken();

      let open = "3";
      let over = "4";
      if (this.lockstatus == 1) {
        let cookiedata = await methodclock(
          this.iotMacModelId,
          this.macId,
          this.recipeid,
          this.token,
          over
        );
        if (cookiedata.code == 0) {
          this.isround = true;
          e.target.src = loca;
          console.log(this.iscolor);
          this.iscolor = false;
          this.isActive = false;
          this.topdisblead = false;
        }
      } else {
        let cookiedata = await methodclock(
          this.iotMacModelId,
          this.macId,
          this.recipeid,
          this.token,
          open
        );
        if (cookiedata.code == 0) {
          this.isround = false;
          e.target.src = locaactive;
          this.iscolor = true;
          this.isActive = true;
          this.topdisblead = true;
        }
      }
    },
    // 拿到牛排机食谱数据
    async steakData() {
      let argumast = "牛排机";

      let steakdata = await cookieSearch(argumast);
      // this.steakdata = steakdata.data;
      if (steakdata.data.list.length > 0) {
        let breadfilter = steakdata.data.list;
        this.steakdata = steakdata.data;
        this.steakdata.list = [];
        for (let i = 0; i < breadfilter.length; i++) {
          if (breadfilter[i].id != this.recipeid) {
            this.steakdata.list.push(breadfilter[i]);
          }
        }
      }
      // console.log(steakdata);
    }
  },
  beforeDestroy () {
    clearInterval(this.defaluttime)
  },
  mounted() {
    // 链接webscoke
    this.linkWebsock();
    //进入页面就开始烹饪
    // this.handleStartCookie();
    // 获取牛排机食谱列表数据
    this.steakData();
  },
  computed: {},
  created() {
    setTimeout(() => {
      let getItem = localStorage.getItem("cookiereload");
      if (getItem == null) {
        localStorage.setItem("cookiereload", "1");
        // location.reload()
      }
    }, 300);

    setTimeout(() => {
      localStorage.removeItem("cookiereload", "1");
    }, 1000);

   this.defaluttime= setInterval(async() => {
       let data=await searchEquipments(this.$route.query.macId,this.token);
        if(data.data.status=='待机'){
         Toast("您已经终止了此食谱！");
              this.$router.go(-1);
            }
    }, 4000);

    this.title =
      this.$route.query.title < 5
        ? this.$route.query.title
        : this.$route.query.title.substring(0, 6) + "...";
    this.macId = this.$route.query.macId;
    this.iotMacModelId = this.$route.query.iotMacModelId;
    this.recipeid = this.$route.query.recipeid;
    // 获取用户token
    handleUserData();
    let userData = JSON.parse(localStorage.getItem("userData"));
    this.token = userData.token;
  }
};
</script>

<style lang='less' scoped>
.steakCokkie {
  overflow: hidden;
  background-color: #fff;
  .ysp-header {
    width: 100%;
    height: 8rem;
    span {
      display: block;
      font-size: 1.4rem;
      color: #4a4a4a;
      line-height: 2rem;
    }
    .left {
      width: 8rem;
      text-align: center;
      height: 8rem;
      float: left;

      line-height: 5rem;
      .lockcolor {
        color: #3cadff;
      }
      img {
        width: auto !important;

        line-height: 5rem;
        margin-top: 1.5rem;
        vertical-align: middle;
        height: 5rem;
      }
    }
    .right {
      width: 8rem;
      float: right;
      text-align: center;
      height: 8rem;
      line-height: 5rem;
      img {
        line-height: 5rem;
        width: auto !important;
        margin-top: 1.5rem;
        vertical-align: middle;
        height: 5rem;
      }
    }
  }
  .content {
    text-align: center;
    position: relative;
    .van-circle {
      margin-top: -6rem;
      font-size: 1.8rem;
      .van-circle__text {
        top: 48% !important;
        font-size: 2.8rem !important;
      }
    }
    .test-time {
      width: 10rem;
      left: 50%;
      top: -1rem;
      font-size: 1.4rem;
      color: #898989;
      margin-left: -5rem;
      position: absolute;
      text-align: center;
    }
    .name {
      width: 10rem;
      left: 50%;
      top: 7.5rem;
      font-size: 1.4rem;
      color: #4a4a4a;
      margin-left: -5rem;
      position: absolute;
      text-align: center;
    }
    .tatus {
      width: 10rem;
      left: 50%;
      top: 10.5rem;
      font-size: 1.4rem;
      color: #898989;
      margin-left: -5rem;
      position: absolute;
      text-align: center;
    }

    ul#countdown {
      text-align: center;
      margin: 2em 0 2em;
    }

    ul#countdown li {
      display: inline-block;
      margin-right: 28px;
      width: 13.9rem;
      top: 0.2rem;
      margin-left: -10rem;
      left: 50%;
      height: 13.9rem;
      margin-top: -6.2rem;
      text-align: center;
      padding: 30px;
      // border: 1px solid #2be0f0;
      border-radius: 50%;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      position: absolute;
    }

    ul#countdown li p.timeRefSeconds {
      color: #2be0f0;
      font-size: 17px;
      font-weight: 100;
      font-style: "microsoft-yahei";
      line-height: 0px;
      font-style: italic;
    }

    /*倒计时加上圆圈*/

    ul#countdown li i {
      width: 14.1rem;
      height: 14.1rem;
      position: absolute;
      display: block;
      /*旋转动画*/
      animation: circleRoate 5s infinite linear;
    }
    .dotdot {
      position: absolute;
      left: -2px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #3cadff;
    }
    @keyframes circleRoate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
  .cookie-btn {
    width: 100%;
    text-align: center;
    line-height: 8rem;
    height: 8rem;
    button:nth-child(2) {
      margin-left: 1rem;
    }
    .round {
      border: 1px solid #3cadff;
      background-color: #3cadff;
      width: 15rem;
      font-size: 1.6rem !important;
      border-radius: 3rem;
    }
    .active {
      background: #cccccc;
      color: #fff;
      border: 1px solid #ccc;
      width: 15rem;
      font-size: 1.6rem !important;
      border-radius: 3rem;
    }
  }
}
@media screen and (min-width: 640px) {
  .steakCokkie {
    .content {
      .name {
        top: 5rem;
      }
      .tatus {
        top: 8rem;
      }
    }
  }
}
@media only screen and (min-width: 640px) and (-webkit-min-device-pixel-ratio: 2) {
  ul#countdown li {
    margin-top: -5.8rem !important;
    margin-left: -9.5rem !important;
  }
}

@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  ul#countdown li {
    margin-top: -6.35rem !important;
    margin-left: -10rem !important;
  }
  ul#countdown li i {
    width: 14.1rem !important;
    height: 14.1rem !important;
  }
}
@media (device-height: 736px) and (-webkit-min-device-pixel-ratio: 2) {
  ul#countdown li {
    margin-top: -6.3rem !important;
    margin-left: -10.1rem !important;
  }
  ul#countdown li i {
    width: 14.1rem !important;
    height: 14.1rem !important;
  }
}
@media (device-height: 667px) and (-webkit-min-device-pixel-ratio: 2) {
  /* 兼容iphone6 */
  ul#countdown li {
    margin-top: -6.2rem !important;
    margin-left: -10.1rem !important;
  }
}
.loading {
  top: 4.5rem !important;
}
</style>
