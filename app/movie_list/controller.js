(function(angular){
  'use strict';
    //注册moviecat.in_theaters模块
    //[]中放的是需要依赖注入的模块名称,相对应的需要在controller中传递给模块的参数;
  var module=angular.module('moviecat.movie_list',['ngRoute', 'moviecat.service.http']);
    //配置模块相关路由,这里是在每个模块自身配置路由,好处是可以让每个模块自我管理
      module.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/:category/:page', {
          templateUrl: 'movie_list/view.html',
          controller: 'MovieListController'
        });
      }]);

      module.controller('MovieListController', ["$scope","$route","$routeParams","HttpService","Appconfig",
          function($scope,$route,$routeParams,HttpService,Appconfig) {
              //设置分页功能
              var page=parseInt($routeParams.page);
              var count=Appconfig.pagesize;
              var start=(page-1)*count;
            //console.log(data[0]);
            ////console.log(data.title);
            ////$scope.subjects=data[0].subjects;
          //给$scope绑定数据,前面不要加上var
          $scope.loading=true;
          $scope.subjects=[];
          $scope.message='';
          $scope.totalCount=0;
          $scope.totalpages=0;
          $scope.currentpage=page;
          $scope.title="Loading....";
          //console.log(111);
          HttpService.jsonp(Appconfig.listApiAddress+$routeParams.category,
              {start:start,count:count,q:$routeParams.q },function(data){
              //console.log(data.subjects);
              $scope.title=data.title;
              $scope.subjects=data.subjects;
              $scope.totalCount=data.total;
              $scope.totalpages=Math.ceil($scope.totalCount/count);
              $scope.loading=false;
              $scope.$apply();
          });
          $scope.goPage= function (page) {
              if(page>=1&&page<=$scope.totalpages)
              $route.updateParams({page:page});
          }
      }]);
})(angular);

//以下调用需要放在module.controller中
//var doubanApi="http://api.douban.com/v2/movie/in_theaters";
////注意json的格式问题
//$http.jsonp(doubanApi+"?callback=JSON_CALLBACK").then(function(res){
//    console.log(res);
//    if(res.status==200){
//        $scope.subjects=res.data.subjects;
//    }else{
//        $scope.message="服务器压力太大,找不到数据啦!"
//    }
//}, function(err){
//    $scope.message="服务器压力太大,找不到数据啦!"
//});