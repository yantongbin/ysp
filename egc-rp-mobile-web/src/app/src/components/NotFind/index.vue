<template>
        <!-- 无页面 -->
    <div class="notfind">
       <div class="img">
           <img src="../../assets/images/pic_recording.png"/>
       </div>
        <div class="tost">
             <slot></slot>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.notfind{
    height: 100%;
    border-top:1px solid #f5f6f8;
    width: 100%;
    top:4.5rem;
    left:0rem;
    position: fixed;
    background-color: #fff;
    .img{
        text-align: center;
        margin-top: 5rem;
        img{
            height: 28rem;
            width: 70%;
        }
    }
    .tost{
        width: 100%;
        // height: 5rem;
        // line-height: 5rem;
        text-align: center;
font-family: PingFangSC-Regular;
font-size: 14px;
color: #898989;
        font-size: 1.4rem;
    }
}
</style>
