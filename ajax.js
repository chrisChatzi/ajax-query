(function(){
    'use strict';
    var $ = require('jquery');

    var ajaxObj = "";

    var ajaxClass = function(){
        this.url = "";
        this.type = "";
        this.headers = [];
        this.data = "";
        this.dataType = "json";
        this.timeout = 5000;
        this.callback = "";
        this.errorType = false;
        this.types = ["GET", "POST", "DELETE", "PUT"];
        this.dataTypes = ["xml", "html", "script", "json", "jsonp", "text"];
    }

    ajaxClass.prototype = {
        // INIT
            init : function(url, type, headers, data, callback){
                this.settings(url, type, headers, data, callback);
                // this.ajaxCall(this, callback);
            },
        // SETTINGS
            settings : function (url, type, headers, data, callback){
                this.setUrl(url);
                this.setType(type, callback);
                if(headers) this.setHeaders(headers);
                if(data) this.setData(data);
                this.callback = callback;

                this.ajaxCall(this, callback);
            },
            setUrl : function(url){
                this.url = url;
            },
            setType : function(type, callback){
                var exists = this.checkIfExists(this.types, type);
                this.errorType = false;
                if(exists) this.type = type;
                else{
                    this.errorType = true;
                    callback("Ajax type is invalid");
                }
            },
            setHeaders : function(headers){
                var json = []
                $.map(headers, function (item){
                    var key = Object.keys(item)[0];
                    var val = item[key];
                    json.push({
                        key : key,
                        val : val
                    });
                });
                this.headers = json;
            },
            setData : function(data){
                if(typeof data === 'object' || $.isPlainObject(data)) this.data = JSON.stringify(data);
                else this.data = data;
            },
            setDataType : function(dataType, callback){
                var exists = this.checkIfExists(this.dataTypes, dataType);
                if(exists) this.dataType = dataType;
                else callback("Data type is invalid");
            },
            setTimeoutVar : function(timeout, callback){
                if(isNaN(timeout)) callback("Invalid timeout value");
                else this.timeout = timeout;
            },
        // HELPERS
            checkIfExists : function(array, value){
                var exists = false;
                $.map(array, function (item){
                    if(item == value) exists = true;
                });
                return exists;
            },
        //make request
            ajaxCall : function(self, callback){
                if(this.errorType) return;
                $.ajax({
                    dataType: this.dataType,
                    type: this.type,
                    url: this.url,
                    data: this.data,
                    beforeSend: function(request){
                        if(self.headers){
                            $.map(self.headers, function (item){
                                request.setRequestHeader(item.key, item.val);
                            });
                        }
                    },
                    success: function(data){
                        data.type = "ok";
                        self.callback(data);
                    },
                    error: function(xhr, textStatus, errorThrown){
                        var data = {
                            "type" : "error",
                            "xhr" : xhr,
                            "textStatus" : textStatus,
                            "errorThrown" : errorThrown
                        }
                        self.callback(data);
                    },
                    timeout: this.timeout
                });
            },
    };
    //class calls
    function ajaxRequest(opt, callback){
        if(!ajaxObj) ajaxObj = new ajaxClass();
        if(!opt.url) callback("URL cannot be empty");
        else if(!opt.type) callback("Type cannot be empty");
        else ajaxObj.init(opt.url, opt.type, opt.headers, opt.data, callback);
    };
    function ajaxSetTimeout(timeout, callback){
        if(!ajaxObj) ajaxObj = new ajaxClass();
        ajaxObj.setTimeoutVar(timeout, callback);
    };
    function ajaxSetHeaders(headers, callback){
        if(!ajaxObj) ajaxObj = new ajaxClass();
        ajaxObj.setHeaders(headers, callback);
    };
    function ajaxSetDataType(dataType, callback){
        if(!ajaxObj) ajaxObj = new ajaxClass();
        ajaxObj.setDataType(dataType, callback);
    };
    //exports
    module.exports = {
        ajaxRequest : ajaxRequest,
        ajaxSetTimeout : ajaxSetTimeout,
        ajaxSetHeaders : ajaxSetHeaders,
        ajaxSetDataType : ajaxSetDataType
    };
})();