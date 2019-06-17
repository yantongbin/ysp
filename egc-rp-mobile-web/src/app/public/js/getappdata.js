
function Datas() {
  var url = window.location.host;
  return new Promise(function(resolve, reject) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
      // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
      xmlhttp = new XMLHttpRequest();
    } else {
      // IE6, IE5 浏览器执行代码
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        resolve(JSON.parse(xmlhttp.responseText));
      }
    };
		// 测试
    // xmlhttp.open("GET",url+"/nmenu/config/config.json",true);
		// xmlhttp.open("GET", "../../config/config.json", true);
		xmlhttp.open("GET", "./config/config.json", true);
    xmlhttp.send();
  });
}

//回调用户信息
function getUserDataFromNative(userData) {
  localStorage.removeItem("userData");
  //   把数据存储下来
  localStorage.setItem("userData", userData);
}
// WebView执行
function webViewDidFinishLoad() {
  EG_Recipes.hidenNativeNaviBar(JSON.stringify({ isHidenNaviBar: "1" }));
}

function pageRootType(rootType) {
  //to do
  // alert(rootType);
  var myrootType = JSON.parse(rootType);
  // alert(myrootType.rootType);
  localStorage.setItem("rootType", myrootType.rootType);
}
