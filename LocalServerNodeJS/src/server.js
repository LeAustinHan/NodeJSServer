/**
 * New node file
 */

var http = require("http");
var url = require("url");

function start(route,handle){
	function onRequest(request,response){
		
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		var allUrl = url.parse(request.url,true).query;//解析方法中添加true参数，让返回参数为键值对格式，allUrl为字典类，否则为“=”链接的字符串
//		JSON.parse(string):
		var meal = allUrl["mainFood"];
		
		console.log("Request Url ==  "+meal);
		console.log("Request for " + pathname + " received.");
		
		request.setEncoding("utf8");
		
		//两个监听要配合使用
		request.addListener("data",function(postDataChunk){
			postData += postDataChunk;
			 console.log("Received  data chunk '"+
		      postDataChunk + "'.");
			});
		
		request.addListener("end",function(){
			
			console.log("Request is getEnd.\n");
			route(handle,pathname,response,postData,meal);
			});
		
		
		if (request.method == "GET") {
			console.log("Request is 'GET' request.\n");
		}else {
			console.log("Request isn't 'GET' request.\n");
			
			
		 	}
		}
	
		
	http.createServer(onRequest).listen(8889);
	console.log("Server has started.");
	}


exports.start = start;
