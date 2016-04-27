'use strict';
donorApp.directive('requirement',["$log","$window",function($log,$window) {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: 'requirement/requirementTemplate.html',
        controller: ["$scope", function ($scope) {
            $scope.$on("orientation", function (event) {
                $scope.requirementStyle = {
                    'height': ($window.innerHeight-104) + 'px',
                    'overflow-y': 'auto',
                    '-webkit-overflow-scrolling': 'touch'
                };
            });
            $scope.findMonth = function(_month){
                var monthNamesArr = ('January February March April May June July August September October November December').split(' ');
                return monthNamesArr[_month];
            }
        }],
        link: function (scope, element, attr) {
            scope.$emit("orientation");
            var today = new Date();
            /*var calendarDefault = myApp.calendar({
             input: '#calendar-default',
             closeOnSelect:true,
             monthPickerTemplate:monthPickerTemplate,
             yearPickerTemplate:yearPickerTemplate,
             footerTemplate:calendarFooterTemplate,
             onOpen: onPickerOpenCallBack
             });*/
            myApp.picker({
                input: '#calendar-default',
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
                rotateEffect: true,
                value: [today.getMonth(), today.getDate(), today.getFullYear(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
                cols: [
                    // Months
                    {
                        values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
                        displayValues: ('January February March April May June July August September October November December').split(' '),
                        textAlign: 'left'
                    },
                    // Days
                    {
                        values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
                    },
                    // Years
                    {
                        values: (function () {
                            var arr = [];
                            for (var i = 1950; i <= 2030; i++) { arr.push(i); }
                            return arr;
                        })()
                    },
                    // Space divider
                    {
                        divider: true,
                        content: '&nbsp;&nbsp;'
                    },
                    // Hours
                    {
                        values: (function () {
                            var arr = [];
                            for (var i = 0; i <= 23; i++) { arr.push(i); }
                            return arr;
                        })()
                    },
                    // Divider
                    {
                        divider: true,
                        content: ':'
                    },
                    // Minutes
                    {
                        values: (function () {
                            var arr = [];
                            for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                            return arr;
                        })()
                    }
                ],
                onChange: function (picker, values, displayValues) {
                    var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
                    if (values[1] > daysInMonth) {
                        picker.cols[1].setValue(daysInMonth);
                    }
                },
                formatValue: function (p, values, displayValues) {
                    return ((displayValues[0]!= undefined)? displayValues[0]: scope.findMonth(values[0])) + ' ' + values[1] + ', ' + values[2] + ' ' + values[3] + ':' + values[4];
                },
                onOpen: onPickerOpenCallBack
            });
            myApp.picker({
                input: '#picker-blood-group',
                toolbarTemplate:popupToolBar,
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