var currentUser = null;
var g_calendarObject = null;

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
    cookiearray  = allcookies.split(';');
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
    var remindersName = document.getElementById("NameTextField").value;
    var category = document.getElementById("CategoryInput").value;
    var dueDate = document.getElementById("DueDateTextField").value;
    var recurrence = document.getElementById("RecurringInput").value;
    var importance = document.getElementById("ImportanceInput").value;
    var shoppingSite = document.getElementById("ShoppingSiteInput").value;
    var description = document.getElementById("DescriptionTextField").value;
    
    var postResult = $.ajax({
                            url: 'http://dev.m.gatech.edu/d/tross32/w/remindme/c/api/tasks',
                            type: 'post',
                            dataType: 'json',
                            data: "username="+currentUser+"&name="+remindersName+"&importance="+importance+"&category="+category+"&duedate="+dueDate+"&recurring="+recurrence+"&shoppingsite="+shoppingSite+"&description="+description,
                            success: function(data) {
                                addCalEvent();
                                history.back()
                            },
                            error: function(xhr, textStatus, errorThrown){
                                alert('Request failed: ' + textStatus + '; ' + errorThrown);
                            }
    });
}

function addCalEvent() {
    var r = confirm("Add reminder as a Google Calendar calendar?");
    /*
    if (r == true) {
        var remindersName = document.getElementById("NameTextField").value;
        var dueDate = document.getElementById("DueDateTextField").value;
        dueDate.replace('-', '');
        var recurrence = document.getElementById("RecurringInput").value;
        
        // Create the calendar service object
        var calendarService = new google.gdata.calendar.CalendarService('GoogleInc-jsguide-1.0');
        
        // The default "private/full" feed is used to insert event to the
        // primary calendar of the authenticated user
        var feedUri = 'https://www.google.com/calendar/feeds/default/private/full';
        
        // Create an instance of CalendarEventEntry representing the new event
        var entry = new google.gdata.calendar.CalendarEventEntry();
        
        // Set the title of the recurring event
        entry.setTitle(google.gdata.Text.create(remindersName));
        
        // Set up the recurring details using an ical string (RFC 2445 http://www.ietf.org/rfc/rfc2445.txt)
        var recurrence = new google.gdata.Recurrence();
        var icalBreak = '\r\n';
        var recurrenceString = 'DTSTART;TZID=America/New_York:'+dueDate+'T080000' + icalBreak +
        'DTEND;TZID=America/New_York:'+dueDate+'T090000' + icalBreak +
        'RRULE:FREQ=WEEKLY;UNTIL=20211230T230000Z;';
        recurrence.setValue(recurrenceString);
        entry.setRecurrence(recurrence);
        
        // This callback method that will be called after a successful insertion from insertEntry()
        var callback = function(result) {
            alert('Event created!');
        }
        
        // Error handler will be invoked if there is an error from insertEntry()
        var handleError = function(error) {
            alert(error);
        }
        
        // Submit the request using the calendar service object
        calendarService.insertEntry(feedUri, entry, callback, 
                                    handleError, google.gdata.calendar.CalendarEventEntry);
    }
    */
}
