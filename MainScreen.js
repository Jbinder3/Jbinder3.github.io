var pageLoaded = 0;
var arrayOfTasks = null;

var tasksTableName = 'ItemTable';
var currentUser = null;
var LINK_TO_EDITREMINDER = 'EditReminder.html';

window.onload = function() {
    pageLoaded = 1;
    loaded('ItemTable');
};

function loaded(element) {
    if (document.getElementById(element) != null) {
        currentUser = getCurrentUser();
        
        arrayOfTasks = getTasks(currentUser);
        createRows();
    } else if (!pageLoaded)
        setTimeout('loaded(\''+element+'\')',100);
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

function createRows() {
	var table = document.getElementById(tasksTableName);
    
	for (var i = 0; i < arrayOfTasks.length; i++) {
		var row = table.insertRow(i+1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		cell1.innerHTML = '<a href="'+LINK_TO_EDITREMINDER+'?id='+i+'">'+arrayOfTasks[i].Name+'</a>';
		cell2.innerHTML = arrayOfTasks[i].DueDate;
	}
}

function getTasks(username) {
    var result = $.ajax({
                        url: 'http://dev.m.gatech.edu/d/tross32/w/remindme/c/api/tasks/'+username,
                        type: 'get',
                        dataType: 'json',
                        async: false,
                        error: function (err)
                        {
                            getTasks(currentUser);
                        }
                        });
    
    var tasksArray = new Array();
    var resultText = result.responseText;
    try
    {
        var json = JSON.parse(resultText);
        return json;
    }
    catch(err)
    {
        getTasks(currentUser);
    }
}