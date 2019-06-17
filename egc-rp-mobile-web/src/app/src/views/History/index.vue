<template>
  <!-- 烹饪记录 -->
  <div class="cookiehistory">
    <Header>收藏记录</Header>
    <div class="content">
      <div class="list" v-for="(item,key) in recipedata.list" :key="key">
        <Recipetemplate :data="item"></Recipetemplate>
        <!-- 删除 -->
        <div class="delete">
          <span @click="handleDelete(item.id)">删除</span>
        </div>
      </div>
    </div>
    <NotFind v-if="isnot">收藏夹空空一片 o(╥﹏╥)o</NotFind>
  </div>
</template>

<script>
import Header from "../../components/Header/";
import Recipetemplate from "../../components/Cookie/";
import { getCollectionHistory, deleteCollection } from "../../services/api.js";
import { Dialog, Toast } from "vant";
import NotFind from "../../components/NotFind/";

export default {
  data() {
    return {
      recipedata: "",
      userToken: "",
      isnot: false
    };
  },
  components: {
    Header,
    Recipetemplate,
    NotFind
  },
  mounted() {
    this.userToken = JSON.parse(localStorage.getItem("userData"));
    this.getcolledata();
  },
  methods: {
    //   获取收藏记录
    async getcolledata() {
      let colldata = await getCollectionHistory(this.userToken.token);
      this.recipedata = colldata.data;
      if (this.recipedata.list.length < 1) {
        this.isnot = true;
      }
    },
    // 删除收藏记录
    handleDelete(id) {
      Dialog.confirm({
        title: "提示",
        message: "你确定要删除该收藏吗？"
      })
        .then(async () => {
          let deletecolldata = await deleteCollection(id, this.userToken.token);
          if (deletecolldata.code == 0) {
            Toast("您删除成功了哟 o(╥﹏╥)o~");
            this.getcolledata();
          }
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style lang='less' scoped>
.cookiehistory {
  .content {
    padding: 0 1rem;
  }
  .list {
    background-color: #fff;
    margin-top: 1rem;
    .delete {
      height: 5rem;
      margin-top: -0.2rem;
      border-top: 0.5px solid #ccc;
      width: 100%;
      span {
        border-radius: 2rem;
        height: 3rem;
        line-height: 3rem;
        font-size: 1.4rem;
        margin-top: 1rem;
        float: right;
        color: #fe3824;
        margin-right: 1rem;
        display: inline-block;
        width: 8rem;
        border: 1px solid #fe3824;
        text-align: center;
      }
    }
  }
}
</style>
