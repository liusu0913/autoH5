function getUrlParams(name) { // 不传name返回所有值，否则返回对应值
  let url = window.location.search;
  if (url.indexOf('?') == 1) { return false; }
  url = url.substr(1);
  url = url.split('&');
  name = name || '';
  let nameres;
  // 获取全部参数及其值
  for(let i=0;i<url.length;i++) {
      let info = url[i].split('=');
      let obj = {};
      obj[info[0]] = decodeURI(info[1]);
      url[i] = obj;
  }
  // 如果传入一个参数名称，就匹配其值
  if (name) {
      for(let i=0; i<url.length; i++) {
          for (const key in url[i]) {
              if (key == name) {
                  nameres = url[i][key];
              }
          }
      }
  } else {
      nameres = url;
  }
  // 返回结果
  return nameres;
}

export {
  getUrlParams
}