/**
 * New node file
 */
var exec = require("child_process").exec;

var querystring = require("querystring"),fs = require("fs");

function start(response, postData,meal) {
  console.log("Request handler 'start' was called.");

   var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="mainFood" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

//    exec('ls -lh /usr',{ timeout: 10000, maxBuffer: 20000*1024 }, function(err, stdout, stderr) {
//        console.log(stdout);
//        response.writeHead(200, {"Content-Type": "text/html"});
//        response.write(body);
//        response.end();
//    });
      exec("find /",
    { timeout: 10000, maxBuffer: 20000*1024 },
    function (error, stdout, stderr) {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(body);
      response.end();
      console.log("Request handler 'start' was called."+ body);
    });
}

function upload(response, postData,meal) {
	
	
console.log("Request handler 'upload' postData == " + postData); 
	
	var objectPostData = querystring.parse(postData);//需要先对传回的数据转换格式，然后就可以用字典的方式取值了
	
	var food = objectPostData["mainFood"];
	
//	var objectPostData = querystring.parse(food);
	
  console.log("Request handler 'upload' was called."+ food + postData); 
  
  var data = {  
		  address: "hanhan local server",  
		  subject: "test" , 
		  inputData: food
  };

  data = JSON.stringify(data);
     
  response.writeHead(200, {"Content-Type": "text/plain"});
//  response.write("You've sent the text: "+
//  querystring.parse(postData).text);

  response.write(data);
//  response.write(postData);
  response.end();
}


exports.start = start;
exports.upload = upload;