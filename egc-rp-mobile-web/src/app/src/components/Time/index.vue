<template>
  <div class="timer">
    <van-popup v-model="timeshow" position="bottom" :overlay="false">
      <div class="heade">什么时间吃面包?</div>
      <van-picker :columns="columns" title="什么时候吃面包" @change="onChange" :visible-item-count="5"/>
      <div class="t-btn">
        <span @click="handlHideCan">取消</span>
        <span @click="handleStart">确定</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { serachReicpeTime } from "../../services/api.js";
import { Toast } from "vant";

var h = [];
var m = [];
// 添加小时

// let settime = this.childDate.hours + 13;
// if (settime > 23) {
//   settime = 24;
// }
// h = [];
// // 添加小时

// //添加分钟
for (var i = 0; i < 60; i++) {
  if (i < 10) {
    m.push("0" + i + "分");
  } else {
    m.push(i + "分");
  }
}
let date = new Date();
let ishous = date.getHours();
for (let i = parseInt(ishous); i < parseInt(ishous) + 13; i++) {
  if (i < 10) {
    h.push("0" + i + "时");
  } else {
    h.push(i + "时");
  }
}
if (ishous < 11) {
  var citys = {
    今天: h
  };
} else {
  var citys = {
    今天: h,
    明天: h
  };
}
// let citys = {};
var min = {
  分钟: m
};

import { Popup } from "vant";

export default {
  data() {
    return {
      timeshow: true,
      childDate: "",
      changetime: "",
      getTimes: "",
      timevaluse: "",
      columns: [
        {
          values: Object.keys(citys),
          className: "column1"
        },
        {
          values: citys["今天"],
          className: "column2",
          defaultIndex: 1
        },
        {
          values: min["分钟"]
          //   className: "column1",
          //   defaultIndex: 1,
        }
      ]
    };
  },
  props: ["childDate"],
  created() {
    let t = setInterval(() => {
      h = [];
      // 添加小时
      for (let i = this.childDate.hours; i < this.childDate.hours + 13; i++) {
        if (i < 10) {
          h.push("0" + i + "时");
        } else {
          h.push(i + "时");
        }
      }

      m = [];
      // //添加分钟
      for (let i = 0; i < 60; i++) {
        if (i < 10) {
          m.push("0" + i + "分");
        } else {
          m.push(i + "分");
        }
      }

      if (this.childDate.hours < 12) {
        citys = {
          今天: h
          //   明天: h
        };
      } else {
        citys = {
          今天: h,
          明天: h
        };
      }
    }, 1000);
  },
  mounted() {},
  methods: {
    async handleStart() {
      let userData = JSON.parse(localStorage.getItem("userData"));
      let getTime = await serachReicpeTime(this.childDate.recipeid,userData.token);
      let date = new Date();
      let ishous = date.getHours();
      let mt = date.getMinutes();
      let sumtostm;
      let sumtosh;
      // 获取食谱时间
      let getrecipetime = getTime.data.totalTime;
      this.getTimes = getTime.data.totalTime;
      
      // 提示小时
      let getsumh = parseInt(ishous) + parseInt(getrecipetime / 60);
      //保存烹饪时间
      let getcookieh=parseInt(getrecipetime/60)
      let summ=(getrecipetime / 60)-parseInt(getrecipetime / 60)
     //保存烹饪分钟
           let getcookiem=Math.round(parseInt(getrecipetime / 60));
           //获取分钟
           let roundm=Math.round(summ*60);
      //提示分钟
      let getsumm =
     parseInt(60- parseInt(mt)) +
        Math.round((getrecipetime / 60 - parseInt(getrecipetime / 60)) * 60);

      let sumtost = getsumh + ":" + getsumm;
      let timevaluse={
        cookiehourse:getcookieh,
        timevaluse:this.timevaluse,
        cookieminuter:roundm
      }

      localStorage.setItem('setTime', JSON.stringify(timevaluse) )

        if(this.changetime==''){
            Toast('请滑动选择时间')
        }

      let geth = this.changetime[1].substring(0, 2);
      let getm = this.changetime[2].substring(0, 2);

      if (this.changetime[0] == "今天") {
        // 获取当前时间分钟
        let remainingh = parseInt(ishous) * 60 +parseInt(60-parseInt(mt)) ;
        //获取剩余时间分钟
        let remainingm = parseInt(geth) * 60 + parseInt(getm);
        //  剩余总分钟
        let totalm = remainingm - remainingh;
   
        if (totalm < getrecipetime) {
          Toast("选择的时间必须要大于" + sumtost);
        } else {
          this.handleTime(totalm);
        }
      } else {
        // 获取当前时间
        // 今天剩余的时间
        let getyth = (23 - parseInt(ishous)) * 60 +parseInt(60-parseInt(mt));
        //明天剩余的时间
        let detyth = parseInt(geth) * 60 + parseInt(getm);
        //总时间
        // alert(geth)
        // alert(getyth);
      
        let yestotal = getyth + detyth;
        if (yestotal < getrecipetime) {
          Toast("选择的时间必须要大于" + sumtost);
        } else {
          this.handleTime(yestotal);
        }
      }
    },
    handleTime(time) {
      this.$emit("handlePropsTime", time);
    },
    handlHideCan() {
      this.$emit("handleCall", "false");
    },
    onChange(picker, values) {
      let total = this.childDate.hours + 13 - 23;
      this.timevaluse = values;

      localStorage.setItem("setTime", values[0] + values[1] + values[2]);
      if (values[0] == "明天") {
        h = [];
        for (let i = 0; i < total; i++) {
          if (i < 10) {
            h.push("0" + i + "时");
          } else {
            h.push(i + "时");
          }
        }
        citys = {
          今天: h,
          明天: h
        };
      } else {
        let settime = this.childDate.hours + 13;
        if (settime > 23) {
          settime = 24;
        }
        h = [];
        // 添加小时
        for (let i = this.childDate.hours; i < settime; i++) {
          if (i < 10) {
            h.push("0" + i + "时");
          } else {
            h.push(i + "时");
          }
        }
        citys = {
          今天: h,
          明天: h
        };
      }

      this.changetime = values;
      picker.setColumnValues(1, citys[values[0]]);
    }
  },
  watch: {}
};
</script>

<style lang='less' scoped>
.heade {
  height: 6rem;
  line-height: 6rem;
  text-align: center;
  font-size: 14px;
  width: 100%;
  // border: 1px solid red;
}
.timer {
  position: absolute;
  //   bottom: 0;
  top: 0;
  left: 0;
  width: 100%;
}
.t-btn {
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  border-top: 0.5rem solid #f7f7f7;
  display: flex;
  span {
    flex: 1;
    font-size: 1.4rem;
    text-align: center;
  }
  span:first-child {
    color: #898989;
    border-right: 0.5px solid #ccc;
  }
}

.van-picker__toolbar {
  .van-picker__cancel,
  .van-picker__confirm {
    font-size: 16px;
  }
}
.van-popup--bottom {
  top: auto !important;
}
</style>
