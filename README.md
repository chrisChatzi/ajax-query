Ajax library with the use of jQuery for implementing ajax calls.
Used with AMD.

**What is new**: 
_contentType_ can be set on the request

_data_ is cleared in case it is not used

You can also install from **Bower**

	bower install ajax-query (--save)
    
## Usage

> var ajax = require("ajax-query");

**Request:**

```javascript
ajax.ajaxRequest(options, callback);

var options = {
	url : "https://qwe.qwe",
	type : "POST",
    contentType : "application/json; charset=utf-8",
	headers : [{"token" : "qwe"}],
	data : {"value":"1"}  or  data : JSON.stringify(obj)
};

or

var options = {
	url : "https://qwe.qwe",
	type : "GET"
};

contentType, headers and data fields can be empty or ignored.
url and type fields are mandatory.

headers must be an array of JSON objects 
	e.g. [ {"key1" : "val1" }, { "key2" : "val2" }, ... ]
		
data can be JSON formated object or stringified JSON object 
	e.g. { "value" : "1" } or "{/"value/" : /"1/" }".
```

**Set timeout of requests:**

```javascript
ajax.ajaxSetTimeout(timeout, callback)

Must be a number 
   	e.g 4000 or "4000".
Default timeout is 5 seconds (5000).
Callback is called in case of error.
```

**Set headers of requests:**

If you use the same headers for all the requests in your application,
you can set them once and call the _ajaxRequest_ method without the headers option.

```javascript
ajax.ajaxSetHeaders(headers, callback)

Should be an array of JSON objects 
   	e.g. [ { "Device-Token" : "qwerty" } ]
```

**Set data type of requests:**

```javascript
ajax.ajaxSetDataType(dataType, callback)

Must be a valid ajax dataType: ["xml", "html", "script", "json", "jsonp", "text"]
Default dataType is "json".
Callback is called in case of error.
```
