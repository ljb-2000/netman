<?php
$Main = true;
require("session.php");

$User = trim($_REQUEST['Username']);
$passwd = trim($_REQUEST['Password']);
$Password = md5($secret.$passwd);

$success = 'false';
$message = '';
$method = $_REQUEST['Method'];


if(isset($_REQUEST['Method']) && ($_REQUEST['Method'] == "local")){
	$sql = "SELECT count(*) as count,Users.id FROM Users WHERE Name='{$User}' AND Password='{$Password}'";
	$query = $db->query($sql);
	$count = 0;
	foreach($query as $user){
		$count = $user['count'];
		$uid = $user['id'];
	}
	if($count == 1){
		$auth = true;
		/* Setup session */
		$Address = $_SERVER['REMOTE_ADDR'];
		$Browser = $_SERVER['HTTP_USER_AGENT'];
		$KeyValue = md5($Address).md5($Browser);
		$sql = "INSERT INTO Sessions (User,Address,KeyValue,LastLogin,Cycle) VALUES ('{$uid}',INET_ATON('{$Address}'),'{$KeyValue}',UNIX_TIMESTAMP(),UNIX_TIMESTAMP())";
		$db->query($sql);
		$six_hours_ago = date("U") - (60*60*6);
		$sql = "DELETE FROM Sessions WHERE Cycle < UNIX_TIMESTAMP()-(60*60*6) AND User='$uid'";
		$db->query($sql);
		/*
		header("location: $site_url");
		*/
		$success = true;
		$message = 'Good login; loading...';
	}
	else{
		$success = false;
		$message = 'Invalid credentials';
		/*
		$loginStatus = "Invalid login";
		require("login.php");
		*/
	}
}
else{
	$success = false;
	$message = "Invalid login method";
}
echo "{ 'success': $success, 'message': '[$method] $message' }";
?>
