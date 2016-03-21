Ajax library with the use of jQuery for implementing ajax calls.
Used with AMD.

var ajax = require("ajax-query");

Request:

	ajaxRequest(opt, callback);

	var options = {
		url : "https://qwe.qwe",
		type : "POST",
		headers : [{"token" : "qwe"}],
		data : {"value":"1"},
	};

	or

	var options = {
		url : "https://qwe.qwe",
		type : "GET"
	};

	headers and data fields can be empty or ignored.
	url and type fields are mandatory.
	headers must be an array of JSON objects e.g. [ {"key1" : "val1" }, { "key2" : "val2" }, ... ]
	data can be JSON formated object or stringified JSON object,
	e.g. { "value" : "1" } or "{/"value/" : /"1/" }".

Set timeout of requests:

	ajaxSetTimeout(timeout, callback)

	Must be a number e.g 4000 or "4000".
	Default timeout is 5 seconds (5000).
	Callback is called in case of error.

Set headers of requests:

	ajaxSetHeaders(headers, callback)

	should be an array of JSON objetcs e.g. [ { "Device-Token" : "qwerty" } ]

Set data type of requests:

	ajaxSetDataType(dataType, callback)

	Must be a valid ajax dataType: ["xml", "html", "script", "json", "jsonp", "text"]
	Callback is called in case of error.
