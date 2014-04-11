var MILLISEC_IN_MIN = 60000;
var MIN_IN_YEAR = 525949;
var MIN_IN_MONTH = 43829;
var MIN_IN_WEEK = 10080;
var MIN_IN_DAY = 1440;
var MIN_IN_HOUR = 60;

function diffDates(date) {
    var currentDate = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
    var parsedDate = $.datepicker.parseDate('yyyy-mm-dd', date);
    var parsedCurrentDate = $.datepicker.parseDate('yyyy-mm-dd', currentDate);
    var difference = parsedDate.getTime() - parsedCurrentDate.getTime();
    var diffInMinutes = difference/MILLISEC_IN_MIN;
    
    var pasedDifference = null;
    
    if (diffInMinutes >= MIN_IN_YEAR) {
        parsedDifference = (diffInMinutes/MIN_IN_YEAR) + "years";
    } else if (diffInMinutes >= MIN_IN_MONTH) {
        parsedDifference = (diffInMinutes/MIN_IN_MONTH) + "months";
    } else if (diffInMinutes >= MIN_IN_WEEK) {
        parsedDifference = (diffInMinutes/MIN_IN_WEEK) + "weeks";
    } else if (diffInMinutes >= MIN_IN_DAY) {
        parsedDifference = (diffInMinutes/MIN_IN_DAY) + "days";
    } else {
        parsedDifference = (diffInMinutes/MIN_IN_HOUR) + "hours";
    }
    
    return parsedDifference;
}