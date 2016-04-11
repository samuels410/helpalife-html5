donorApp.controller("OAuthCtrl",["$scope","$location","$log",function($scope,$location,$log){
    $scope.init = function(){
        $log.debug("OAuth init()");

        $location.path('/newsFeed');
    };
}]);