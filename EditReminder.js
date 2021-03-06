var pageLoaded = 0;

var currentUser = null;
var taskId = null;
var index = null;

var g_calendarObject = null;
var arrayOfTasks = null;

window.onload = function() {
    pageLoaded = 1;
    index = getValue('id');
    document.getElementById("imagepreview").style.visibility="hidden";
    loaded();
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

function loaded() {
    if (document.getElementById('NameTextField') != null) {
        currentUser = getCurrentUser();
        arrayOfTasks = getTasks(currentUser);
        taskId = arrayOfTasks[index].TaskID;
        loadPage();
    } else if (!pageLoaded)
        setTimeout('loaded(\''+element+'\')',100);
}

function loadPage() {
    document.getElementById("NameTextField").value = arrayOfTasks[index].Name;
    //document.getElementById("CategoryInput").selectedIndex = document.getElementById('CI_'+arrayOfTasks[index].Category).index;
    setIndexOf(document.getElementById("CategoryInput"), 'CI', arrayOfTasks[index].Category);
    document.getElementById("DueDateTextField").value = arrayOfTasks[index].DueDate;
    setIndexOf(document.getElementById("RecurringInput"), 'RI', arrayOfTasks[index].Recurring);
    setIndexOf(document.getElementById("ImportanceInput"), 'II', arrayOfTasks[index].Importance);
    setIndexOf(document.getElementById("ShoppingSiteInput"), 'SSI', arrayOfTasks[index].ShoppingSite);
    document.getElementById("DescriptionTextField").value = arrayOfTasks[index].Description;
    
    if (arrayOfTasks[index].Photo != "NULL") {
        
    }
}

function setIndexOf(element, initials, inputItem) {
    var dropdownIndex = null;
    
    if (document.getElementById(initials+'_'+inputItem))
        dropdownIndex = document.getElementById(initials+'_'+inputItem).index;
    else
        dropdownIndex = -1;
    
    if (dropdownIndex == -1)
        element.selectedIndex = element.length - 1;
    else
        element.selectedIndex = dropdownIndex;
}

function getValue(VarSearch){
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for(var i = 0; i < VariableArray.length; i++){
        var KeyValuePair = VariableArray[i].split('=');
        if(KeyValuePair[0] == VarSearch){
            return KeyValuePair[1];
        }
    }
}

function getTasks(username) {
    var result = $.ajax({
                        url: 'http://dev.m.gatech.edu/d/tross32/w/remindme/c/api/tasks/'+username,
                        type: 'get',
                        dataType: 'json',
                        async: false
                        });
    
    var tasksArray = new Array();
    var resultText = result.responseText;
    var json = JSON.parse(resultText);
    
    return json;
}

function editReminder() {
    var remindersName = document.getElementById("NameTextField").value;
    var category = document.getElementById("CategoryInput").value;
    var dueDate = document.getElementById("DueDateTextField").value;
    var recurrence = document.getElementById("RecurringInput").value;
    var importance = document.getElementById("ImportanceInput").value;
    var shoppingSite = document.getElementById("ShoppingSiteInput").value;
    var description = document.getElementById("DescriptionTextField").value;
    var photobytes = "NULL";
    
    var postResult = $.ajax({
                            url: 'http://dev.m.gatech.edu/d/tross32/w/remindme/c/api/updateTask',
                            type: 'post',
                            dataType: 'json',
                            data: "taskid="+taskId+"&username="+currentUser+"&name="+remindersName+"&importance="+importance+"&category="+category+"&duedate="+dueDate+"&recurring="+recurrence+"&shoppingsite="+shoppingSite+"&description="+description+"&photo="+photobytes,
                            success: function(data) {
                                window.location = 'MainScreen.html'
                            }
    });
}

function deleteReminder() {
    var postResult = $.ajax({
                            url: 'http://dev.m.gatech.edu/d/tross32/w/remindme/c/api/deleteTask',
                            type: 'post',
                            dataType: 'json',
                            data: "taskid="+taskId,
                            success: function(data) {
                                window.location = 'MainScreen.html'
                            }
    });
}
