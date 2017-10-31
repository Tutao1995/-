(function(win){
	var ajax = function (myJson){
	//参数说明：
	// type:访问方式   默认就是get方法        string类型
	// url: 访问地址   必传参数               string类型
	// data: 携带发送的数据                   json对象
	// success: 访问成功的回调函数  第一个参数为后台返回的数据    function类型
	// error:访问失败的回调函数     第一个参数为http请求状态码    function类型
	var type = myJson.type || "get";
	var url = myJson.url;
	var data = myJson.data;
	var dataStr = "";//用来拼接的
	var success = myJson.success;
	var error = myJson.error;
	//传了数据
	if(data){//user=Kery&age=28&_=时间戳
		for(var key in data){
			dataStr += key+"="+data[key]+"&";
		}
		//解决ie低版本的缓存问题
		dataStr += "_="+new Date().getTime();//时间戳对象
		//如果是get方式请求的话，拼接url
		if(type.toLowerCase()=="get"){
			url += "?"+dataStr;
		}
	}
	console.log(url);
	var xhr = new XMLHttpRequest();
	xhr.open(type,url,true);
	//post提交数据的时候，需要规定一下提交数据的格式
	xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
	
	xhr.send(dataStr);//post请求，把数据放入send
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4){
			if(xhr.status>=200 && xhr.status<300){
				success&&success(xhr.responseText);
			}else{
				error&&error(xhr.status);
			}
		}
	};
}
	win.myAjax = ajax;
})(window);