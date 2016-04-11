'use strict';

donorApp.controller('DonorCtrl', ['$log','$scope',function($log,$scope) {

    $scope.initDonors = function(){
        $log.debug("initDonors");
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
        myApp.picker({
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
        myApp.picker({
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