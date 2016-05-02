'use strict';

// Declare app level module which depends on views, and components
var donorApp = angular.module('myApp', ['ngRoute']).
config(['$routeProvider','$httpProvider','$sceProvider', function($routeProvider,$httpProvider,$sceProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.headers.common['Accept'] = "application/json";
  $httpProvider.defaults.cache = true;
  $sceProvider.enabled(false);

  $routeProvider.when('/newsFeed', {templateUrl: 'newsFeed/newsFeed.html',controller: 'NewsFeedCtrl' });
  $routeProvider.when('/donors', {templateUrl: 'donors/donors.html' });
  $routeProvider.when('/requirement', {templateUrl: 'requirement/requirement.html'});
  $routeProvider.otherwise({redirectTo:'/',templateUrl:'oAuth/oAuth.html',controller:'OAuthCtrl'});

}]).controller('MainCtrl',['$log','$document','$scope',function($log,$document,$scope){
  $log.debug("MainCtrl::");
}]);
