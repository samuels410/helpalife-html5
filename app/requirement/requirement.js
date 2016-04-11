'use strict';
donorApp.controller('RequirementCtrl', ['$log','$scope','$window',function($log,$scope,$window) {

    $scope.requirementStyle = {'height':$window.innerHeight +'px','overflow-y': 'auto','-webkit-overflow-scrolling': 'touch'};
    $log.debug($window.innerHeight);

    $scope.initRequirement = function(){
        $log.debug("initDonors");
        var calendarDefault = myApp.calendar({
            input: '#calendar-default',
            closeOnSelect:true,
            monthPickerTemplate:monthPickerTemplate,
            yearPickerTemplate:yearPickerTemplate,
            footerTemplate:calendarFooterTemplate,
            onOpen: onPickerOpenCallBack
        });
        var pickerBloodGroup = myApp.picker({
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
        var pickerState = myApp.picker({
            input: '#picker-state',
            toolbarTemplate:popupToolBar,
            cols: [
                {
                    textAlign: 'center',
                    values: ["TamilNadu","Delhi"]
                }
            ],
            onOpen: onPickerOpenCallBack
        });
        var pickerDistrict = myApp.picker({
            input: '#picker-district',
            toolbarTemplate:popupToolBar,
            cols: [
                {
                    textAlign: 'center',
                    values: ["Chennai","KK"]
                }
            ],
            onOpen: onPickerOpenCallBack
        });

    }
}]);