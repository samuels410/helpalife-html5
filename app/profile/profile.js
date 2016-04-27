donorApp.directive('profileView',["$log","$window",function($log,$window) {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'profile/profileViewTemplate.html',
        controller: ["$scope", function ($scope) {
            $scope.$on("orientation", function (event) {
                $scope.profileStyle = {
                    'height': ($window.innerHeight - 104) + 'px',
                    'overflow-y': 'auto',
                    '-webkit-overflow-scrolling': 'touch'
                };
            });
        }],
        link: function (scope, element, attr) {
            scope.$emit("orientation");
        }
    }
}]);