'use strict';

// Declare app level module which depends on views, and components
angular.module('moviecat', [
  'ngRoute',
  'moviecat.movie_detail',
  'moviecat.movie_list',
  'moviecat.directives.auto_focus'
]).constant("Appconfig",{
  pagesize:8,
  listApiAddress:"http://api.douban.com/v2/movie/",
  detailApiAddress:"http://api.douban.com/v2/movie/subject/"
}).config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}]).controller("SearchController", ["$scope","$route", function ($scope,$route) {
  $scope.input='';
  $scope.search= function(){
    $route.updateParams({category:"search",page:1,q:$scope.input});
    $scope.input='';
  };

}]);
