<template>
    <!-- 搜索 -->
        <van-popup v-model="show" position="bottom" :overlay="false" class="searchpopup">
        <div class="search">
        <div class="header">
            <span class="icon iconfont icon-fanhui" @click='handleback'></span>
            <div class="input">
                <i class="icon iconfont icon-search_001"></i>
                <input type="text" v-model='inputValue' @input="handleInput" placeholder="搜索食谱/食材/问题" autofocus="autofocus"   />
            </div>
            <span @click='handleSearch'>搜索</span>
        </div>
        <!-- 最近搜索 -->
        <div class="recentsearch" v-show='myhistory!=null'>
            <div class="title">
            最近搜索 <i class="icon iconfont icon-shanchu" @click='deleteHistory'></i>
            </div>
            <div class="content">
                    <ul>
                        <li v-for='(item,key) in history' :key='key'><span  @click='hideSearch(item)'>{{item}}</span></li>
                    </ul>
            </div>
        </div>
        <!-- 热门搜索 -->
        <div class="recentsearch hotsearch">
            <div class="title">
            热门搜索
            </div>
            <div class="content">
                    <ul>
                        <li v-for='(item,key) in hotdata' :key='key'><span @click='hideSearch(item)'>{{item}}</span></li>
                    </ul>
            </div>
        </div>
          <!-- 搜索联想查询列表 -->
        <div class="popup-list" v-show="isconcatSearch">
          <ul>
            <li v-for='(item,key) in concatList' v-if='key<10' :key='key' @click='handleAssociated'><span @click='hideSearch(item)' >{{item}}<i class="icon iconfont icon-arrow-left-top"></i></span></li>
          </ul>
        </div>
    </div>
        </van-popup>
</template>

<script>
import { contactSearch, getHotSearchData } from "../../services/api.js";
import { Toast, Dialog } from "vant";
export default {
  data() {
    return {
      show: false,
      focusState: false,
      isconcatSearch: false,
      inputValue: "",
      concatList: "",
      hotdata: "",
      myhistory: "",
      history: "",
      historydata: ""
    };
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    // 返回点击关闭搜索
    handleback() {
      this.show = false;
    },
    handleClick() {
      // this.inserted();
    },
    // 热门搜索
    async hotSearch() {
      let hotsearchdata = await getHotSearchData();
      this.hotdata = hotsearchdata.data;
    },
    // 历史记录
    handleHistory() {
      this.myhistory = localStorage.getItem("history");
      if (this.myhistory != null) {
        let history = this.myhistory.split(",");
        this.history = Array.from(new Set(history.reverse()));
      }
    },
    hideSearch(id) {
       this.$router.push({
        name: "Search",
        params: { id: id,pid:0}
      });
      this.show = false;
    },
    // 删除历史记录
    deleteHistory() {
      Dialog.confirm({
        title: "提示",
        message: "确认删除全部历史记录？"
      })
        .then(() => {
          // on confirm
          localStorage.removeItem("history");
          this.handleHistory();
        })
        .catch(() => {
          // on cancel
        });
    },
    // 联想搜索
    async handleInput(e) {
      if (e.target.value == "") {
        this.isconcatSearch = false;
      } else {
        let concatdata = await contactSearch(e.target.value);
        if (this.concatList.length == 0) {
          this.isconcatSearch = false;
        }
        this.concatList = concatdata.data;
        if (this.concatList.length > 0) {
          this.isconcatSearch = true;
        }
      }
    },

    // 点击关联搜索的时候
    handleAssociated() {
      // this.handleSearch();
    },
    // 点击搜索输入框
    handleSearch() {
      if (this.inputValue == "") {
        Toast("请输入你想要的东西~");
      } else {
        let newlocaStorage = localStorage.getItem("history");
        if (newlocaStorage == null || newlocaStorage == "") {
          localStorage.setItem("history", this.inputValue);
        } else {
          let mylocaStorage = localStorage.getItem("history");
          let strog;
          strog = mylocaStorage.split(",");
          strog.push(this.inputValue);
          localStorage.setItem("history", strog);
        }
        this.$router.push({ name: "Search", params: { id: this.inputValue,pid:0 } });
        this.show = false;

      }
    }
  },
  mounted() {
    this.hotSearch();
    this.handleHistory();
    // this.searchChange();
  },
  watch: {}
};
</script>

<style lang='less' scoped>
.search {
  position: absolute;
  top: 0;
  height: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  .header {
    display: flex;
    width: 100%;
    height: 4.5rem;
    span {
      height: 4.5rem;
      text-align: center;
      line-height: 4.5rem;
      color: #4a4945;
      width: 5rem;
      font-size: 1.5rem;
      display: inline-block;
    }
    .icon {
      font-size: 3rem;
    }
    .input {
      flex: 1;
      position: relative;
      padding: 0 0.8rem;
      input {
        width: 100%;
        margin-top: 0.75rem;
        background-color: #f5f6f8;
        font-size: 1.2rem;
        height: 3rem;
        line-height: 3rem;
        text-indent: 4rem;
        color: #4a4a4a;
        outline: none;
      }
      i {
        position: absolute;
        top: 1.5rem;
        vertical-align: middle;
        left: 2rem;
        color: #9d9d9d;
        font-size: 1.8rem;
      }
    }
  }
  .hotsearch {
    margin-top: 2rem !important;
  }
  .recentsearch {
    width: 100%;
    margin-top: 1rem;
    color: #999999;
    line-height: 3rem;
    .title {
      font-size: 1.2rem;
      text-align: left;
      height: 3rem;
      text-indent: 1.5rem;
      width: 100%;
      i {
        margin-right: 1.5rem;
        float: right;
        font-size: 2rem;
      }
    }
    .content {
      overflow: hidden;
      ul {
        li {
          float: left;
          overflow: hidden;
          margin-top: 1rem;
          margin-left: 1.2rem;
          span {
            border-radius: 5px;
            padding: 0.5rem 1.2rem;
            background-color: #f5f6f8;
            font-size: 1.2rem;
          }
        }
      }
    }
  }
  .popup-list {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    top: 4.5rem;
    background-color: #f9f9f9;
    ul {
      li {
        height: 4.5rem;
        line-height: 4.5rem;
        text-indent: 1rem;
        font-size: 1.4rem;
        border-bottom: 0.5px solid #dedede;
        span {
          font-size: 1.4rem;
          display: block;
          i {
            display: inline-block;
            font-size: 1.4rem;
            float: right;
            margin-right: 1rem;
            color: #7e8c8d;
          }
        }
      }
    }
  }
}
</style>
