<template>
<div class="searchempty">
<img src='../../assets/images/complete.png'/>
 <van-button round type="danger" @click='back' >我知道了</van-button>
</div>
</template>

<script>

export default {
  data() {
    return {};
  },
//   props: ["myrecipeid"],
  methods: {
    back() {
      window.history.length > 2?this.$router.go(-2):this.$router.go(-1);
    }
  },
  created() {
        this.$store.commit('hideLoading');

    // alert(this.tmyrecipeid);
  }
};
</script>
<style lang='less' scoped>
.searchempty {
  position: fixed;
  width: 100%;
  text-align: center;
  height: 100%;
  z-index: 9999;
  border-top: 0.5px solid #ececec;
  background-color: #fff;
  left: 0;
  top: 0rem;
  button {
    font-size: 1.6rem;
    width: 12rem;
    margin: 5rem auto;
    display: block;
  }
  img {
    text-align: center;
    margin-top: 10rem;
    width: 20rem;
  }
  span {
    text-align: center;
    display: block;
    font-size: 1.4rem;
    color: #898989;
    margin-top: 0rem;
  }
}
</style>
