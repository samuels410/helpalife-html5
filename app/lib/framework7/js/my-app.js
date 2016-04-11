// Initialize your app
var myApp = new Framework7({
    swipePanel: 'left',
    material:true,
    materialPageLoadDelay:0,
    fastClicksDelayBetweenClicks:10
});
var popupToolBar = '<div class="toolbar">' +
    '<div class="toolbar-inner">' +
    '<div class="left">' +
    '</div>' +
    '<div class="right">' +
    '<a href="javascript:void(0)" class="link close-picker">Done</a>' +
    '</div>' +
    '</div>' +
    '</div>';
var monthPickerTemplate =
    '<div class="picker-calendar-month-picker">' +
    '<a href="javascript:void(0)" class="link icon-only picker-calendar-prev-month"><i class="icon icon-prev"></i></a>' +
    '<span class="current-month-value"></span>' +
    '<a href="javascript:void(0)" class="link icon-only picker-calendar-next-month"><i class="icon icon-next"></i></a>' +
    '</div>';
var yearPickerTemplate =
    '<div class="picker-calendar-year-picker">' +
    '<a href="javascript:void(0)" class="link icon-only picker-calendar-prev-year"><i class="icon icon-prev"></i></a>' +
    '<span class="current-year-value"></span>' +
    '<a href="javascript:void(0)" class="link icon-only picker-calendar-next-year"><i class="icon icon-next"></i></a>' +
    '</div>';
var calendarFooterTemplate =
    '<div class="picker-footer">' +
    '<a href="javascript:void(0)" class="button close-picker">Done</a>' +
    '</div>';

var onPickerOpenCallBack = function(picker){
    picker.container.find('.close-picker').on('click', function () {
        picker.close();
    });
};
// Export selectors engine
var $$ = Dom7;

$$('.open-left-panel').on('click', function (e) {
    // 'left' position to open Left panel
    myApp.openPanel('left');
});

$$('.open-right-panel').on('click', function (e) {
    // 'right' position to open Right panel
    myApp.openPanel('right');
});
myApp.onPageInit('donors', function (page) {
   console.log("donors init()::");
// Blood Group Picker

});