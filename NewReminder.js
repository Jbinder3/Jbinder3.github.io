var currentUser = null;
var g_calendarObject = null;

var remindersName = null;
var category = null;
var dueDate = null;
var recurrence = null;
var importance = null;
var shoppingSite = null;
var description = null;

window.onload = function() {
    currentUser = getCurrentUser();
    document.getElementById("imagepreview").style.visibility="hidden";
    g_calendarObject = new JsDatePick({
                                      useMode: 2,
                                      target: "DueDateTextField",
                                      cellColorScheme: "aqua",
                                      dateFormat: "%d-%M-%Y"
                                      });
    
    g_calendarObject.setOnSelectedDelegate(function(){
                                           var obj = g_calendarObject.getSelectedDay();
                                           var month = obj.month;
                                           var day = obj.day;
                                           
                                           if (month<10)
                                            month = "0" + month;
                                           if (day<10)
                                            day = "0" + day;
                                           document.getElementById("DueDateTextField").value = obj.year + "-" + month + "-" + day;
                                           });
    $('#PhotoButton').click(function(){
                          $('#imagefile').click();
                          });
    $('#imagefile').change(function(e) {
                           e.preventDefault();
                           var f = e.target.files[0];
                           if(f && window.FileReader)
                           {
                            var reader = new FileReader();
                            reader.onload = function(evt) { $('#imagepreview>img').attr('src', evt.target.result); };
                            reader.readAsDataURL(f);
                            document.getElementById("imagepreview").style.visibility="visible";
                           }
    });
}

function getCurrentUser() {
    var allcookies = document.cookie;
    // Get all the cookies pairs in an array
    cookiearray = allcookies.split(';');
    // Now take key value pair out of this array
    for(var i=0; i<cookiearray.length; i++){
        var name = cookiearray[i].split('=')[0];
        var value = cookiearray[i].split('=')[1];
        if(value.indexOf("@gmail.com")>=0)
        {
            return value;
        }
    }
    return "null";
}

function addReminder() {

    remindersName = document.getElementById("NameTextField").value;
    category = document.getElementById("CategoryInput").value;
    dueDate = document.getElementById("DueDateTextField").value;
    recurrence = document.getElementById("RecurringInput").value;
    importance = document.getElementById("ImportanceInput").value;
    shoppingSite = document.getElementById("ShoppingSiteInput").value;
    description = document.getElementById("DescriptionTextField").value;
    var photourl = 'http://i.imgur.com/5SjkkZx.png';
    var photobytes = "NULL";
    
    //alert('making photos ajax call');
    
    /*
    var photoResult = $.ajax({
                             url: 'photos.php',
                             type: 'post',
                             async: false,
                             data: {
                                'action': 'saveimage',
                                'imagefilename': photourl
                             },
                             success: function(data) {
                                photobytes = data;
                             },
                             error: function(xhr, desc, err) {
                                alert('photos saveimage failed');
                             }
    })*/
    
    alert('making add reminder call');
    
    var postResult = $.ajax({
                            url: 'http://dev.m.gatech.edu/d/tross32/w/remindme/c/api/tasks',
                            type: 'post',
                            dataType: 'json',
                            async: false,
                            data: "username="+currentUser+"&name="+remindersName+"&importance="+importance+"&category="+category+"&duedate="+dueDate+"&recurring="+recurrence+"&shoppingsite="+shoppingSite+"&description="+description+"&photo=NULL",
                            success: function(data) {
                                history.back();
                                //addCalEvent();
                            },
                            error: function(xhr, textStatus, errorThrown){
                                alert('Request failed: ' + textStatus + '; ' + errorThrown);
                            }
    });
}
/*
function addCalEvent() {
   var r = confirm("Add reminder as a Google Calendar calendar?");
    if (r == true) 
    {
      var postResult = $.ajax({
        url: '/calendar/v3/calendars/primary/events',
        type: 'POST',
        dataType: 'json',
        data: {
              "end": {
              "date": "2014-04-22"
              },
              "start": {
              "date": "2014-04-22"
              },
              "summary": "GO BANANAS",
              "recurrence": [
              "RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR",
              "",
              "",
              ""
              ]
              },
        success: function(data) {
                              history.back();
        },
        error: function(xhr, textStatus, errorThrown){
            alert('Request failed: Calendar error');
        }
    });*/

      /*
        POST https://www.googleapis.com/calendar/v3/calendars/primary/events
        {
            {
              "end": {
              "date": "2014-04-22"
              },
              "start": {
              "date": "2014-04-22"
              },
              "summary": "GO BANANAS",
              "recurrence": [
              "RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR",
              "",
              "",
              ""
              ]
              }
        }
        */
//    }
//}
