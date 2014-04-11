var currentUser = 'awong';
var g_calendarObject = null;

window.onload = function() {
    document.getElementById("imagefile").style.visibility="hidden";
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
                                history.back()
                            }
    });
}
