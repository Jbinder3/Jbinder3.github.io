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
        alert(document.cookie);
        currentUser
        
        arrayOfTasks = getTasks(currentUser);
        createRows();
    } else if (!pageLoaded)
        setTimeout('loaded(\''+element+'\')',100);
}

function createRows() {
	var table = document.getElementById(tasksTableName);
    
	for (var i = 0; i < arrayOfTasks.length; i++) {
		var row = table.insertRow(i+1);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		cell1.innerHTML = '<a href="'+LINK_TO_EDITREMINDER+'?user='+currentUser+'&id='+i+'">'+arrayOfTasks[i].Name+'</a>';
		cell2.innerHTML = arrayOfTasks[i].DueDate;
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