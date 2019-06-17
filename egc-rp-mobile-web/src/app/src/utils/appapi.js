


export //回调方法
function nativeScanReuslt(scanData) {
  //to do
}

// 执行这个方法做回调（获取用户信息）
export function handleUserData() {
  EG_Recipes.userData(
    JSON.stringify({
      funName: "getUserDataFromNative",
    })
  );
}



