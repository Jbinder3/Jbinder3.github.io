var pageLoaded = 0;
var arrayOfTasks = null;

var tasksTableName = 'ItemChart';
var currentUser = null;
var LINK_TO_EDITREMINDER = 'EditReminder.html';
var temp = 0;
var arrayOfTasks2 = null;

window.onload = function() {
    pageLoaded = 1;
    loaded('ItemChart');
};

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

function loaded(element) {
    if (document.getElementById(element) != null) {
        currentUser = getCurrentUser();
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
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        if(temp == 0)
        {
            arrayOfTasks2 = jQuery.extend(true, {}, arrayOfTasks);
            cell1.innerHTML = '<a href="'+LINK_TO_EDITREMINDER+'?user='+currentUser+'&id='+i+'">'+arrayOfTasks[i].Name+'</a>';
        }
        else
        {
            for(var j = 0; j < arrayOfTasks2.length; j++)
            {
                if(arrayOfTasks[i].Name == arrayOfTasks2[j].Name && arrayOfTasks[i].DueDate == arrayOfTasks2[j].DueDate && arrayOfTasks[i].Importance == arrayOfTasks2[j].Importance && arrayOfTasks[i].Category == arrayOfTasks2[j].Category)
                {
                    cell1.innerHTML = '<a href="'+LINK_TO_EDITREMINDER+'?user='+currentUser+'&id='+j+'">'+arrayOfTasks[i].Name+'</a>';
                    break;
                }
            }
        }
		cell2.innerHTML = arrayOfTasks[i].DueDate;
        cell3.innerHTML = arrayOfTasks[i].Importance;
        cell4.innerHTML = arrayOfTasks[i].Category;
        temp++;
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

function deleteRows()
{
    for(var i = 0; i < arrayOfTasks.length; i++)
    {
        //document.getElementById(tasksTableName).row(1).removeAttribute("href");
        document.getElementById(tasksTableName).deleteRow(1);
    }
}

function FilterItem()
{
    deleteRows();
    arrayOfTasks.sort(function(a,b)
    {
        if(a.Name < b.Name) return -1;
        if(a.Name > b.Name) return 1;
        return 0;
    });
    createRows();
}

function FilterDate()
{
    deleteRows();
    arrayOfTasks.sort(function(a,b)
    {
        if(a.DueDate < b.DueDate) return -1;
        if(a.DueDate > b.DueDate) return 1;
        return 0;
    });
    createRows();
}

function FilterImportance()
{
    deleteRows();
    arrayOfTasks.sort(function(a,b)
    {
        if(a.Importance < b.Importance) return -1;
        if(a.Importance > b.Importance) return 1;
        return 0;
    });
    createRows();
}

function FilterCategory()
{
    deleteRows();
    arrayOfTasks.sort(function(a,b)
    {
        if(a.Category < b.Category) return -1;
        if(a.Category > b.Category) return 1;
        return 0;
    });
    createRows();
}