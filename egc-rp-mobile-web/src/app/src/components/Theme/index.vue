<template>
    <!-- 主题模板 -->
    <router-link :to="({name:'Themrecipe',params:{id:data.id}})" class="themetemplate">
    <div class="main">
    <!-- 标题 -->
    <div class='title'>
        {{data.title}}
    </div>
    <!-- 描述 -->
    <div class="describe">
        {{data.description}}
    </div>
    <!-- 图片 -->
    <div class="img">
              <TemplateImg :msg='data.coverimg'></TemplateImg>

    </div>
    </div>
</router-link> 
</template>

<script>
import TemplateImg from '../../components/Img/';

export default {
  props: {
    data: {
      type: Object
    }
  },
  components:{
    TemplateImg
  },
};
</script>

<style lang='less' scoped>
.themetemplate {
  width: 100%;
  display: inline-block;
  padding-top: 1rem;
  border-radius: 3px;
  margin-top: 1rem;
  background-color: #fff;
  .main {
    width: 100%;
    .title {
      height: 3rem;
      padding: 0 1rem;
      width: 100%;
      overflow: hidden;
      line-height: 3rem;
      font-size: 1.4rem;
    }
    .describe {
      height: 3rem;
      padding: 0 1rem;
      width: 100%;
      color: #898989;
      font-size: 1.2rem;
    }
    .img {
      
      img {
        
        width: 100%;
      }
    }
  }
}
</style>
