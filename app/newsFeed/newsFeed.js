'use strict';

donorApp.controller('NewsFeedCtrl', ['$log','$scope','$window',function($log,$scope,$window) {
    $scope.$on("orientation", function (event) {
        $scope.newsFeedStyle = {
            'height': ($window.innerHeight) + 'px',
            'overflow-y': 'auto',
            '-webkit-overflow-scrolling': 'touch'
        };
    });

    $scope.initNewsFeedCtrl = function(){
        $scope.$emit("orientation");
        $$.ajax({
            url: 'json/newsFeed.json',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $log.debug(data);
                $scope.newsFeeds = data;
            }
        });
    }
}]);