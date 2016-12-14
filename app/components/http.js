/**
 * Created by Round on 2016/12/14.
 */
(function(angular){
    'use strict';
    var http=angular.module("moviecat.service.http", []);
    http.service("HttpService",["$window",'$document',function($window,$document){
        this.jsonp=function(url,data,callback){
            var cb_Name="cb_name_"+Math.random().toString().replace(".","");
            //挂载函数
            $window[cb_Name]=callback;
            //将url转换为字符串
            var querystring=url.indexOf("?")== -1 ? "?" : "&";
            for(var key in data){
                querystring+=key + "=" + data[key]+"&";
            }
            //豆瓣api要求回调函数必须是以callback为前缀;
            querystring+="callback="+cb_Name;
            //创建并且添加script标签
            var scriptElement=$document[0].createElement("script");
            scriptElement.src=url+querystring;
            $document[0].body.appendChild(scriptElement);
        };
    }])
})(angular);
//console.log($document);
//document.url= "http://localhost:63342/moviecat/app/index.html#/in_theaters"
//this.jsonp= function (url,callback) {
//    //1.设置url的参数;
//    //2.添加一个script 标签;
//    //3.挂载函数;
//    //4.将函数添加到html中;
//}
