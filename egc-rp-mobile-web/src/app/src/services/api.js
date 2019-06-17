import request from "../utils/request.js";

// 首页轮播图
export function homebanner() {
  return request({
    url: "/api/search-service/indexBanner/list?page=1&size=10",
    method: "get"
  });
}

// 首页视图
export function getElement() {
  return request({
    url: "/api/search-service/indexElement/indexElements",
    method: "get"
  });
}

// 食谱详情
export function product(id, token) {
  return request({
    url:
      "/api/search-service/recipe/recipeDetail?recipeId=" +
      id +
      "&token=" +
      token,
    method: "get"
  });
}

// 食谱软文

export function getArticleData(id) {
  return request({
    url: "/api/search-service/recipeArticle/info?id=" + id,
    method: "get"
  });
}

// 主题食谱
export function getThemData(id) {
  return request({
    url: "/api/search-service/recipeTopic/detail/v2?topicId=" + id,
    method: "get"
  });
}

// 热门食谱
export function getHotData(page) {
  return request({
    url: "/api/search-service/es/hot?page=" + page + "&size=10",
    method: "get"
  });
}

// 联想搜索
export function contactSearch(id) {
  return request({
    url: "/api/search-service/es/guessWord?keyword=" + id,
    method: "get"
  });
}

//热门搜索
export function getHotSearchData() {
  return request({
    url: "/api/search-service/searchRecord/hot?count=10",
    method: "get"
  });
}

// 搜索数据
export function getSearchData(id, pid) {
  return request({
    url:
      "/api/search-service/es/keyword?page=0&size=10&keyword=" +
      id +
      "&category=" +
      pid,
    method: "get"
  });
}

//牛排机食谱

export function getSteakData(id) {
  return request({
    url:
      "/api/search-service/es/searchByCategory?page=0&size=100&option=" +
      id +
      "&category=牛排机",
    method: "get"
  });
}

// 面包机食谱
export function getBrandData(id) {
  return request({
    url:
      "/api/search-service/es/searchByCategory?page=0&size=100&option=" +
      id +
      "&category=面包机",
    method: "get"
  });
}

// 食谱分类

export function getCatrgoryData() {
  return request({
    url: "/api/search-service/category/listAllByTree",
    method: "get"
  });
}

// 收藏食谱
export function recipeCollect(id, token) {
  return request({
    url:
      "/api/cms-service/recipeCollect/add?recipeId=" + id + "&token=" + token,
    method: "post"
  });
}

// 删除食谱
export function deleteCollect(id, token) {
  return request({
    url:
      "/api/cms-service/recipeCollect/delete?recipeId=" +
      id +
      "&token=" +
      token,
    method: "post"
  });
}

// 查询

export function searchEquipment(id, token) {
  return request({
    url: "/api/iot-service/iot/getUserMacs?recipeId=" + id + "&token=" + token,
    method: "get"
  });
}

// 牛排机再次启动
export function steackAgainCookie(iotMacModelId, macId, recipeId, token, jk) {
  const data = {
    iotMacModelId: iotMacModelId,
    macId: macId,
    recipeId: recipeId,
    instructionName: jk,
    instructionType: 2,
    type: 2,
    id: jk
  };
  return request({
    url: "/api/cooking-service/cookingRecord/macControl?token=" + token,
    data: data,
    method: "post"
  });
}

// 停止牛排机

export function steakStopCookie(iotMacModelId, macId, recipeId, token) {
  const data = {
    iotMacModelId: iotMacModelId,
    macId: macId,
    recipeId: recipeId,
    instructionName: "取消烹饪",
    instructionType: 0,
    type: 1,
    id: 2
  };
  return request({
    url: "/api/cooking-service/cookingRecord/macControl?token=" + token,
    data: data,
    method: "post"
  });
}

// 暂停面包机
export function brandsupperstop(iotMacModelId, macId, recipeId, token) {
  const data = {
    iotMacModelId: iotMacModelId,
    macId: macId,
    recipeId: recipeId,
    instructionName: "暂停",
    instructionType: 2,
    type: 1,
    id:10
  };
  return request({
    url: "/api/cooking-service/cookingRecord/macControl?token=" + token,
    data: data,
    method: "post"
  });
}
// 开始烹饪

export function startCookie(iotMacModelId, macId, recipeId, token, totaltime) {
  const data = {
    iotMacModelId: iotMacModelId,
    macId: macId,
    recipeId: recipeId,
    instructionType: 1,
    type: 1,
    totalTime:totaltime
  };
  return request({
    url: "/api/cooking-service/cookingRecord/macStart?token=" + token,
    data: data,
    method: "post"
  });
}

// 童锁

export function methodclock(iotMacModelId, macId, recipeId, token, status) {
  const data = {
    iotMacModelId: iotMacModelId,
    macId: macId,
    instructionName: status,
    instructionType: 2,
    recipeId: recipeId,
    type: 2,
    id:status
  };
  return request({
    url: "/api/cooking-service/cookingRecord/macControl?token=" + token,
    data: data,
    method: "post"
  });
}

// 停止面包机

export function breadStopCookie(iotMacModelId, macId, recipeId, token) {
  const data = {
    iotMacModelId: iotMacModelId,
    macId: macId,
    recipeId: recipeId,
    instructionName: "停止",
    instructionType: 0,
    type: 1,
    id: 9
  };
  return request({
    url: "/api/cooking-service/cookingRecord/macControl?token=" + token,
    data: data,
    method: "post"
  });
}

// 烹饪页食谱

export function cookieSearch(argumast) {
  return request({
    url:
      "/api/search-service/es/keyword?size=5&keyword=" +
      argumast +
      "&category=1",
    method: "get"
  });
}

// 收藏食谱列表数据
export function getCollectionHistory(token) {
  return request({
    url: "/api/search-service/recipeCollect/list?size=99&&token=" + token,
    method: "get"
  });
}

// 删除收藏食谱列表数据
export function deleteCollection(id, token) {
  return request({
    url:
      "/api/cms-service/recipeCollect/delete?recipeId=" +
      id +
      "&&token=" +
      token,
    method: "post"
  });
}

// 烹饪食谱列表数据

export function getCookieHistory(token) {
  return request({
    url: "/api/cooking-service/cookingRecord/list/v2?size=99&&token=" + token,
    method: "get"
  });
}

// 删除食谱列表数据
export function deletCookieData(id, token) {
  return request({
    url:
      "/api/cooking-service/cookingRecord/delete?id=" + id + "&&token=" + token,
    method: "post"
  });
}

// 获取当前是否正在烹饪列表
export function getUserCookieing(token) {
  return request({
    url:
      "/api/cooking-service/cookingRecord/getUserCookingTasks?token=" + token,
    method: "get"
  });
}


//查询设备状态

export  function searchEquipments(did,token){
  return request({
    url:"/api/iot-service/iot/getMacDetails?did="+did+"&token="+token,
    method: "get"
  })
  }


  //查询食谱时间

  export function serachReicpeTime(recipeid,token){
    return request({
      url:"/api/iot-service/instruction/time?recipeId="+recipeid+"&iotMacModelId=POOvcN&token="+token,
      method: "get"
    })
  }