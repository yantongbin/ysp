<template>
  <div id="app">
   <router-view/>
   <Loading v-if='LOADING'></Loading>
  </div>
</template>
 <script>
import Loading from "./components/Loading/";
import { mapState } from "vuex";
export default {
  components: {
    Loading
  },
  data() {
    return {
    };
  },
  created(){
      console.log(this.$store.state.LOADING);
  },
  computed: {
    ...mapState(["LOADING"])
  }
};
</script>
<style lang="less">
#app {
  margin: 0 auto;
  position: relative;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}
</style>
