'use strict';

donorApp.directive('donor',["$log","$window",function($log,$window){
    return{
        replace:true,
        restrict:'E',
        templateUrl:'donors/donorTemplate.html',
        controller:["$scope",function($scope){
            $scope.$on("orientation",function(event) {
                $scope.DonorStyle = {
                    'height': $window.innerHeight + 'px',
                    'overflow-y': 'auto',
                    '-webkit-overflow-scrolling': 'touch'
                };
                $log.debug($window.innerHeight);
            });
        }],
        link:function(scope,element,attr){
            scope.$emit("orientation");
            myApp.picker({
                input: '#picker-blood-group',
                toolbarTemplate:
                    '<div class="toolbar">' +
                    '<div class="toolbar-inner">' +
                    '<div class="left">' +
                    '</div>' +
                    '<div class="right">' +
                    '<a href="javascript:void(0)" class="link close-picker">Done</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>',
                cols: [
                    {
                        textAlign: 'center',
                        values: ["A1+","A1-","A2+","A2-","B+","B-","A1B+","A1B-","A2B+","A2B-","AB+","AB-","O+","O-","A+","A-"]
                    }
                ],
                onOpen: onPickerOpenCallBack
            });
            myApp.autocomplete({
                input: '#picker-state',
                openIn: 'dropdown',
                preloader: true, //enable preloader
                valueProperty: 'abbr', //object's "value" property name
                textProperty: 'name', //object's "text" property nameondo
                limit: 20, //limit to 20 results
                dropdownPlaceholderText: 'Try "Tamil Nadu"',
                source: function (autocomplete, query, render) {
                    var results = [];
                    $log.debug(query);
                    if (query.length === 0) {
                        render(results);
                        return;
                    }
                    // Show Preloader
                    autocomplete.showPreloader();
                    // Do Ajax request to Autocomplete data
                    $$.ajax({
                        url: 'http://services.groupkt.com/state/search/IND',
                        method: 'GET',
                        dataType: 'json',
                        //send "query" to server. Useful in case you generate response dynamically
                        data: {
                            text: query
                        },
                        success: function (data) {
                            var temp = data.RestResponse.result;
                            // Find matched items
                            for (var i = 0; i < temp.length; i++) {
                                if (temp[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(temp[i]);
                            }
                            $log.debug(results);
                            // Hide Preoloader
                            autocomplete.hidePreloader();
                            // Render items by passing array with result items
                            render(results);
                        }
                    });
                }
            });
            myApp.autocomplete({
                input: '#picker-district',
                openIn: 'dropdown',
                preloader: true, //enable preloader
                valueProperty: 'id', //object's "value" property name
                textProperty: 'name', //object's "text" property name
                limit: 20, //limit to 20 results
                dropdownPlaceholderText: 'Try "Chennai"',
                source: function (autocomplete, query, render) {
                    var results = [];
                    if (query.length === 0) {
                        render(results);
                        return;
                    }
                    // Show Preloader
                    autocomplete.showPreloader();
                    // Do Ajax request to Autocomplete data
                    $$.ajax({
                        url: 'json/district-list.json',
                        method: 'GET',
                        dataType: 'json',
                        //send "query" to server. Useful in case you generate response dynamically
                        data: {
                            query: query
                        },
                        success: function (data) {
                            // Find matched items
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].name.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(data[i]);
                            }
                            // Hide Preoloader
                            autocomplete.hidePreloader();
                            // Render items by passing array with result items
                            render(results);
                        }
                    });
                }
            });
        }
    }
}]);