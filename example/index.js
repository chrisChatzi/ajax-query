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
// a GET request
var options = {
	url : "https://demo.home2net.com/api/v1/device/FFFF1300FFFFFFFF5130454E2C000D4001/status/io",
	type : "GET",
	headers : [ 
		{ "User-Email" : "christos.chatziioannidis@gmail.com" },
		{ "User-Token" : "qwerty" }
	],
};
ajax.ajaxRequest(options, callback);
// an invalid POST request
var options = {
	url : "https://demo.home2net.com/api/v1/device/FFFF1300FFFFFFFF5130454E2C000D4001/status/io",
	type : "PwwOST",
	headers : "",
	data : {"value":"1"},
}
ajax.ajaxRequest(
	options,
	callback
);

// callbacks
function errorCallback(data){
	console.log(data);
};
function callback(data){
	console.log(data);
	if(data.type == "error") $("#result").html(data.errorThrown);
	else $("#result").html(data);
}