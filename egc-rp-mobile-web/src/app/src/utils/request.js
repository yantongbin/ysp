import axios from "axios";
import store from "../store.js";
// import getConfigUrl from "../../public/config/config.json";
import '../../public/js/getappdata.js';
var host = window.location.host;

let urlApi=Datas();
let getConfigUrl;
let scoketUrl;
let sharUrl;
let baseUrl;
console.log(urlApi);
// console.log(uPi);
urlApi.then(function(data){
  // console.log(data);
   getConfigUrl=data;
  // console.log(getConfigUrl.config.active)

}).then(()=>{

      let isApiUrl = getConfigUrl.config.active;
      let ApiUrl = getConfigUrl.config;
      if (isApiUrl == "test") {
        baseUrl = ApiUrl.test.urlApi;
        scoketUrl = ApiUrl.test.scoketUrl;
        sharUrl = ApiUrl.test.sharUrl;
      } else if (isApiUrl == "prod") {
        baseUrl = ApiUrl.prod.urlApi;
        scoketUrl = ApiUrl.prod.scoketUrl;
        sharUrl = ApiUrl.prod.sharUrl;
      }else if(isApiUrl == "dev"){
        baseUrl = ApiUrl.dev.urlApi;
        scoketUrl = ApiUrl.dev.scoketUrl;
        sharUrl = ApiUrl.dev.sharUrl;
      }

    axios.defaults.baseURL = baseUrl;
    // response interceptor
    axios.interceptors.response.use(
      
      response => {
        // const res = response.data;
        // store.commit('showLoading');
        store.commit("hideLoading");
        return response.data;
     
      },
      error => {
        if (error.response && error.response.status === 401) {
          removeToken();
          if (error.config.url.indexOf("layout") === -1) {
            // message.error("登录信息已过期，请重新登录！");
          }
          setTimeout(() => {
            history.push("/login");
          }, 1000);
        } else if (error.response && error.response.status === 500) {
          // message.error("系统错误！");
        } else if (error.message && error.message.indexOf("timeout") > -1) {
          // message.error("网络超时!");
        } else if (error === "403") {
          // message.error("没有请求权限!");
        } else {
          // message.error("网络错误!");
        }
        return Promise.reject(error);
      }
    );
  
})

 // socket配置
 export function getApiUrl() {
  return scoketUrl;
}
// 分享配置
export function getShareUrl() {
  return sharUrl;
}
//软文分享配置
export function getarticleUrl() {
  return sharUrl;
}






// ApiUrl
// let urlBase;
// let ishost = host.indexOf("192.168.1");
// if (ishost !=-1) {
//   urlBase = "http://192.168.1.243:8765";
// } else {
//   urlBase = "https://recipe.eg-live.com";
// }

// if(getConfigUrl.serverinfo){

// }


export default axios;
