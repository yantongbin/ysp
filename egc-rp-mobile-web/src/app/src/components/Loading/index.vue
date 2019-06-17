<template>
<div class="loading">
    <div class="main">
      <!-- <div class="img">
        <img src="../../assets/images/loading.png"/>
      </div> -->
      <span>
      <van-loading type="spinner" color="#fff" />
      </span>
    </div>
</div>
</template>

<script>
import { Loading } from 'vant';

export default {};
</script>

<style lang='less' scoped>
.loading {
  z-index: 99999;
  position: fixed;
  top: 0;
  width: 100%;
  text-align: center;
  height: 100%;
  background-color: #fff;
  left: 0;
  .main {
    position: relative;
    width: 100%;
    text-align: center;
   span{
     margin-top: 25rem;
     text-align: center;
     width: 10rem;
     border-radius:0.3rem;
     height: 10rem;
     background-color: rgba(0,0,0,0.5);
     display: inline-block;
     position: absolute;
     left:50%;
     
     margin-left: -5rem;
     top:50%;
     .van-loading{
       margin-top: 3.5rem;
       margin-left: 3.5rem;
     }
   }
  }
}
</style>
