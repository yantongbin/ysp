<template>
  <img :src="rtimg">
</template>
<script>
import "../../../public/js/getappdata.js";

export default {
  data() {
    return {
      rtimg: ""
    };
  },
  created() {
    // console.log(data);
    // splitetr = str.match(/(\S*).com/)[1] + ".com";
    //    alert(splitetr);//结果aaabbbcccddd

    let urlApi = Datas();
    let str = this.msg;
    let b;
    if (str != undefined) {
      b = urlApi.then(function(data) {
        //   console.log(data);
        getConfigUrl = data;
        // console.log(getConfigUrl.config.active)
        let isApiUrl = getConfigUrl.config.active;
        let splitetr;
        let urlbefor;
        let getConfigUrl;
        //   console.log(str);
        let strof = str.indexOf(".com");
        getConfigUrl = data;
        let ApiUrl = getConfigUrl.config;
        if (str.indexOf(".com") != -1) {
          splitetr = str.match(/(\S*).com/)[1] + ".com";
          urlbefor = str.match(/.com(\S*)/)[1];
          let httpspite = splitetr.indexOf("http");
          if (httpspite != 0) {
            if (isApiUrl == "test") {
              return ApiUrl.test.imgurl + str;
            } else if (isApiUrl == "prod") {
              return ApiUrl.prod.imgurl + str;
            } else if (isApiUrl == "dev") {
              return ApiUrl.dev.imgurl + str;
            }
          } else {
            return str;
          }
        } else {
          if (isApiUrl == "test") {
            return ApiUrl.test.imgurl + str;
          } else if (isApiUrl == "prod") {
            return ApiUrl.prod.imgurl + str;
          } else if (isApiUrl == "dev") {
            return ApiUrl.dev.imgurl + str;
          }
        }
      });
    } else {
      console.log(str);
      return str;
    }

    b.then(data => {
      //   console.log(data);
      this.rtimg = data;
      //    console.log(this.rtimg);
    });
  },
  methods: {
    handleUrl() {
      let urlApi = Datas();
      let str = this.msg;
      let b;
      if (str != undefined) {
        b = urlApi.then(function(data) {
          //   console.log(data);
          getConfigUrl = data;
          // console.log(getConfigUrl.config.active)
          let isApiUrl = getConfigUrl.config.active;
          let splitetr;
          let urlbefor;
          let getConfigUrl;
          //   console.log(str);
          let strof = str.indexOf(".com");
          getConfigUrl = data;
          let ApiUrl = getConfigUrl.config;
          if (str.indexOf(".com") != -1) {
            splitetr = str.match(/(\S*).com/)[1] + ".com";
            urlbefor = str.match(/.com(\S*)/)[1];
            let httpspite = splitetr.indexOf("http");
            if (httpspite != 0) {
              if (isApiUrl == "test") {
                return ApiUrl.test.imgurl + str;
              } else if (isApiUrl == "prod") {
                return ApiUrl.prod.imgurl + str;
              } else if (isApiUrl == "dev") {
                return ApiUrl.dev.imgurl + str;
              }
            } else {
              return str;
            }
          } else {
            if (isApiUrl == "test") {
              return ApiUrl.test.imgurl + str;
            } else if (isApiUrl == "prod") {
              return ApiUrl.prod.imgurl + str;
            } else if (isApiUrl == "dev") {
              return ApiUrl.dev.imgurl + str;
            }
          }
        });
      } else {
        console.log(str);
        return str;
      }

      b.then(data => {
        //   console.log(data);
        this.rtimg = data;
        //    console.log(this.rtimg);
      });
    }
  },
  watch: {
    msg(curVal, oldVal) {
      if (curVal != undefined) {
        this.handleUrl();
      }
    }
  },
  computed: {},
  props: ["msg"]
};
</script>

<style lang='less'>
</style>
