donorApp.directive("lmsLayout",["$window","$log",function($window,$log){
    return{
        restrict:'E',
        replace:true,
        transclude:false,
        templateUrl:'layout/template/layoutTemplate.html',
        link:function(scope,element,attribute){
            scope.navTemplate = "layout/nav-bar.html";
            scope.footerTemplate = "layout/footer.html";
            scope.$on("navBarListener",function(event,hideNavBar){
                scope.showNavbar = hideNavBar;
                //                    (hideNavBar) ?  scope.navTemplate = "partials/mobile/nav-bar.html" :scope.navTemplate = undefined ;
            });
            scope.$on("footerListener",function(event,type){
                scope.footerTemplate = (type === true) ? "layout/footer.html" : undefined;
            });
        }
    }
}]).directive("profilePanel",["$window","$log",function($window,$log){
    return{
        restrict:'E',
        replace:true,
        transclude:false,
        templateUrl:'/app/profile/profileView.html',
        link:function(scope,element,attribute){

        }
    }
}]).directive("toolbar",["$window","$log","$location",function($window,$log,$location){
    return{
        restrict:'E',
        replace:true,
        transclude:false,
        templateUrl:'/app/layout/template/toolbarTemplate.html',
        controller:["$scope",function($scope){
            myApp.initPageMaterialTabbar = function (pageContainer,active_tab_link) {
                pageContainer = $$(pageContainer);
                var tabbar = $$(pageContainer).find('.tabbar');
                if (tabbar.length > 0 && tabbar.find('.tab-link-highlight').length != 0)
                    tabbar.find('.tab-link-highlight').remove();
                if (tabbar.length > 0 && tabbar.find('.tab-link-highlight').length === 0) {
                    tabbar.find('.toolbar-inner').append('<span class="tab-link-highlight"></span>');
                    var tabLinkWidth = 1 / tabbar.find('.tab-link').length * 100;
                    var highlightTranslate = (myApp.rtl ? - tabbar.find('#'+active_tab_link).index(): tabbar.find('#'+active_tab_link).index()) * 100;
                    tabbar.find('.tab-link-highlight')
                        .css({width: tabLinkWidth + '%',transform:'translate3d(' + highlightTranslate + '%,0,0)'})
                }
            };
            $scope.openNewsFeed = function(){
                myApp.initPageMaterialTabbar(document,"newsFeed");
                $location.path('/newsFeed');
            };
            $scope.openDonors = function(){
                myApp.initPageMaterialTabbar(document,"donors");
                $location.path('/donors');
            };
            $scope.openRequirement = function(){
                myApp.initPageMaterialTabbar(document,"requirement");
                $location.path('/requirement');
            };

        }],
        link:function(scope,element,attribute){

        }
    }
}]);