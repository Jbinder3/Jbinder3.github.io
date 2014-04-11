include 'db_helper.php';

function listUsers() {
	$dbQuery = sprintf(“
		SELECT * 
		FROM Users
	”);
	$result = getDBResultsArray($dbQuery);
	header(“Content-type: application/json”);
	echo json_encode($result);
}

function verifyUser($Username, $Password) {
	$dbQuery = sprintf(“
		SELECT COUNT(Username) 
		FROM Users 
		WHERE Username = ‘%s’
		AND Password = ‘%s’
		”, mysql_real_escape_string($Username)
		mysql_real_escape_string($Password)
	);
	$result = getDBResultRecord($dbQuery);
	header(“Content-type: application/json”);
	echo json_encode($result);	
}

function getUser($Username) {
	$dbQuery = sprintf(“
		SELECT * 
		FROM Users 
		WHERE Username = ‘%s’”, 
		mysql_real_escape_string($Username)
	);
	$result = getDBResultRecord($dbQuery);
	header(“Content-type: application/json”);
	echo json_encode($result);
}

function addUser($Username, $Password, $FirstName, $LastName, $Email) {
	$dbQuery = sprintf("
		INSERT INTO Users (Username, Password, FirstName, LastName, Email) 
		VALUES (‘%s’, ‘%s’, ‘%s’, ‘%s’, ‘%s’)
		", mysql_real_escape_string($Username)
		, mysql_real_escape_string($Password)
		, mysql_real_escape_string($FirstName)
		, mysql_real_escape_string($LastName)
		, mysql_real_escape_string($Email));
	$result = getDBResultInserted($dbQuery, “Username”);
	header("Content-type: application/json");
	echo json_encode($result);
}

function updatePassword($Username, $Password) {
	$dbQuery = sprintf("
		UPDATE Users 
		SET Password = ‘%s’ 
		WHERE Username = ‘%s’”, 
		mysql_real_escape_string($Password), 
		mysql_real_escape_string($Username)
	);
	$result = getDBResultAffected($dbQuery);
	header("Content-type: application/json");
	echo json_encode($result);
}

function updateEmail($Username, $Email) {
	$dbQuery = sprintf("
		UPDATE Users 
		SET Email = ‘%s’ 
		WHERE Username = ‘%s’”, 
		mysql_real_escape_string($Email), 
		mysql_real_escape_string($Username)
	);
	$result = getDBResultAffected($dbQuery);
	header("Content-type: application/json");
	echo json_encode($result);
}

function deleteUser($Username) {
	$dbQuery = sprintf("
		DELETE FROM Users 
		WHERE Username = ‘%s’“, 
		mysql_real_escape_string($Username)
	);
	$result = getDBResultAffected($dbQuery);
	header("Content-type: application/json");
	echo json_encode($result);
}