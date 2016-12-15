(function(angular){
    'use strict';
    var module=angular.module('moviecat.movie_detail',['ngRoute', 'moviecat.service.http']);
    module.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/detail/:id', {
            templateUrl: 'movie_detail/view.html',
            controller: 'MovieDetailController'
        });
    }]);

    module.controller('MovieDetailController', ["$scope","$route","$routeParams","HttpService","Appconfig",
        function($scope,$route,$routeParams,HttpService,Appconfig) {
            $scope.loading=true;
            $scope.movie={};
            var id=$routeParams.id;
            var apiaddress=Appconfig.detailApiAddress+id;
            HttpService.jsonp(apiaddress,{}, function (data) {
                $scope.loading=false;
                $scope.movie=data;
                $scope.$apply();

            })
        }]);
})(angular);
