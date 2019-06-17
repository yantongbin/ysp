<template>
    <!-- 食谱软文 -->
    <div class="article">
   <Header v-if='isheader' :isshare='true'  :title='articledata.title' :imageUrl='articledata.image' :descriContent='articledata.description' :shareUrl="sharUrl+articleId+'?sharid=1'">{{titile}}</Header>
  <!-- banner图 -->
  <div class="banner">
   <TemplateImg :msg="articledata.image"></TemplateImg>
  </div>
  <!-- 软文名称 -->
  <div class="name">
    {{articledata.title}}
<p>{{articledata.description}}</p>
  </div>
  <!-- 作者 -->
  <div class="author">
    <div class="header">
         <TemplateImg :msg="articledata.authorHeadimg"></TemplateImg>
    </div>
    <div class="name">
      {{articledata.authorName}}
    </div>
  </div>
  <div class="content" >
   <div v-html="articledata.content">

</div>
  </div>
  <!-- 阅读与日期 -->
  <div class="readdata">
      阅读 {{articledata.readCount}} <span>{{articledata.createTime}}</span>
    </div>
    </div>
</template>

<script>
import Header from "../../components/Header/";
import { getArticleData } from "../../services/api.js";
import { getarticleUrl } from "../../utils/request.js";
import TemplateImg from '../../components/Img/';

export default {
  data() {
    return {
      articledata: "",
      titile: "",
      isheader: true,
      sharUrl: "",
      articleId: ""
  };
  },
  components: {
    Header,
    TemplateImg
  },
  methods: {
    // 获取软文数据
    async articleData() {
      let article = await getArticleData(this.$route.params.id);
      //绑定软文数据
      this.articledata = article.data;
      // 截取标题文字长度
      this.titile =
        this.articledata.title.length > 6
          ? this.articledata.title.substring(0, 16) + "..."
          : this.articledata.title;
    },
    handleShareHide() {
      var host = window.location.href;
      let ishost = host.indexOf("sharid");
      if (ishost != -1||typeof EG_Recipes == "undefined") {
        this.isheader = false;
      }
    }
  },
  mounted() {
    setTimeout(()=>{
    this.handleShareHide();
    },300)
    this.sharUrl = getarticleUrl();
    this.articleId = this.$route.params.id;
    this.articleData();
  }
};
</script>

<style lang='less' >
img {
  width: 100%;
}
.article {
  background-color: #fff;

  .banner {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .content {
    background-color: #fff;
    font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB",
      "Microsoft YaHei", Arial, sans-serif;
    font-size: medium;
    letter-spacing: 2px;

    color: #999999;
  }
  .content > img {
    width: 100%;
  }

  .name {
    padding: 1rem;
    font-size: 1.6rem;
    color: #4a4a4a;
    border-bottom: 0.5px solid #ccc;
    p {
      line-height: 3rem;
      font-size: 1.4rem;
      color: #999;
      margin-top: 1rem;
    }
  }
  .author {
    padding: 1rem;
    display: flex;
    .header {
      height: 3rem;
      line-height: 3rem;
      overflow: hidden;
      width: 3rem;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .name {
      font-size: 1.2rem;
      color: #4a4945;
      border: none;
      p {
        font-size: 1.4rem;
      }
    }
  }
  .content {
    padding: 0 1rem;
    color: #999;
    line-height: 3rem;
    font-size: 1.4rem;
    p {
      font-size: 1.4rem;
    }
    img {
      width: 100%;
    }
  }

  .readdata {
    font-size: 1.4rem !important;
    padding: 1rem;
    color: #898989;
    span {
      float: right;
      font-size: 1.4rem !important;
    }
  }
}
</style>
