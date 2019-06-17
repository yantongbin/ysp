import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      meta: {
        title: "首页"
      },
      // name:'Index',
      component: resolve => require(["./views/Home/index.vue"], resolve)
    },
    {
      path: "/steakrecipe",
      meta: {
        title: "牛排机食谱"
      },
      // name:'Index',
      component: resolve => require(["./views/steakRecipe/index.vue"], resolve)
    },
    {
      path: "/breadrecipe",
      meta: {
        title: "面包机食谱"
      },
      // name:'BreadRecipe',
      component: resolve => require(["./views/BreadRecipe/index.vue"], resolve)
    },
    {
      path: "/category",
      meta: {
        title: "食谱分类"
      },
      // name:'Category',
      component: resolve => require(["./views/Category/index.vue"], resolve)
    },
    {
      path: "/hotrecipe",
      meta: {
        title: "热门食谱"
      },
      // name:'Hotrecipe',
      component: resolve => require(["./views/HotRecipe/index.vue"], resolve)
    },
    {
      path: "/recipedetail/:id",
      name:'Product',
      meta: {
        title: "食谱详情"
      },
      component: resolve => require(["./views/Product/index.vue"], resolve)
    },
    {
      path: "/article/:id",
      name:'Article',
      meta: {
        title: "食谱软文"
      },
      component: resolve => require(["./views/Article/index.vue"], resolve)
    },
    {
      path: "/themrecipe/:id",
      name:'Themrecipe',
      meta: {
        title: "主题食谱"
      },
      component: resolve => require(["./views/ThemeRecipe/index.vue"], resolve)
    },
    {
      path: "/search/:id/:pid",
      name:'Search',
      meta: {
        title: "搜索"
      },
      component: resolve => require(["./views/Search/index.vue"], resolve)
    },
    {
      path: "/steakcookie/:id",
      name:'SteakCookie',
      meta: {
        title: "牛排机烹饪"
      },
      component: resolve => require(["./views/SteakCookie/index.vue"], resolve)
    },
    {
      path: "/breadCookie/:id",
      name:'BreadCookie',
      meta: {
        title: "面包机烹饪"
      },
      component: resolve => require(["./views/BreadCookie/index.vue"], resolve)
    },
    {
      path: "/complete",
      name:'Complete',
      meta: {
        title: "烹饪完成"
      },
      component: resolve => require(["./views/empty/complate.vue"], resolve)
    },
    {
      path: "/history",
      name:'History',
      meta: {
        title: "收藏记录"
      },
      component: resolve => require(["./views/History/index.vue"], resolve)
    },
    {
      path: "/cookieHistory",
      name:'CookieHistory',
      meta: {
        title: "烹饪历史"
      },
      component: resolve => require(["./views/CookieHistory/index.vue"], resolve)
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
