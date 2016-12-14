/**
 * Created by Round on 2016/12/14.
 */
(function(angular){
    angular.module("moviecat.directives.auto_focus",[])
        .directive("autoFocus",["$location",function($location){
            var path=$location.path();
            return{
                restrict:"A",
                link: function ($scope,iElm,iAttrs,controller) {
                    var aLink=iElm.children().attr("href");
                    var type=aLink.replace(/#(\/.+?)\/\d+/,"$1");
                    //console.log(path);
                    if(path.startsWith(type)){
                        //console.log(222);
                        iElm.addClass("active");
                    }
                    iElm.on("click", function () {
                        iElm.parent().children().removeClass("active");
                        iElm.addClass("active");

                    })
                }
            }
        }])
})(angular);