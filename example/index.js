var $ = require("jquery");
var ajax = require("../ajax");
var template = require("./jade/main.jade");
$('body').append(template());
// set headers once
// ajax.ajaxSetHeaders(
// 	{ "token" : "qwe"},
// 	errorCallback
// );
// set datatype once
ajax.ajaxSetDataType(
	"json",
	errorCallback
);
// set timeout
ajax.ajaxSetTimeout(
	"4000", 
	errorCallback
);

// an invalid POST request
var data = '{"op":"r","path":"/net/status"}'+'\n'+
			'{"op":"r","path":"/config/net"}'+'\n'+
			'{"op":"r","path":"/usr/lambrecht/config/system"}'+'\n'+
			'{"op":"r","path":"/config/security"}'+'\n'+
			'{"op":"r","path":"/usr/lambrecht/config/email"}';
var options = {
	url : "https://demo.home2net.com/api/v1/device/F0QWERTYC0D01/status/io",
	type : "POST",
	headers : "",
	data : data,
}
ajax.ajaxRequest(
	options,
	callback
);
// a GET request
var options = {
	url : "https://demo.home2net.com/api/v1/device/F0QWERTYC0D01/status/io",
	type : "GET",
	contentType : "application/json; charset=utf-8",
	headers : [ 
		{ "User-Email" : "christos.chatziioannidis@gmail.com" },
		{ "User-Token" : "qwerty" }
	],
};
ajax.ajaxRequest(options, callback);
// callbacks
function errorCallback(data){
	console.log(data);
};
function callback(data){
	console.log(data);
	if(data.type == "error") $("#result").html(data.errorThrown);
	else $("#result").html(data);
}