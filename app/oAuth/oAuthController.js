donorApp.controller("OAuthCtrl",["$scope","$location","$log","$document",function($scope,$location,$log,$document){
    $scope.init = function(){
        $log.debug("OAuth init()");
        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady(){
            $log.debug(" onDeviceReady");
            $location.path('/newsFeed');
            $document[0].addEventListener("backbutton",function(e){
                e.preventDefault();
            });
            $document[0].addEventListener('orientationchange',function(event) {
                $scope.$broadcast("orientation");
            });
            $document[0].addEventListener('resize',function(event){
                $log.debug("resize()");
                $scope.$broadcast("orientation");
            });

        }

    };
}]);