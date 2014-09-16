<?php
require('../session.php');

$success = 'fail';
$message = '';

$Password = trim($_REQUEST['Password']);
$NewPassword = trim($_REQUEST['NewPassword']);
$RePassword =  trim($_REQUEST['RePassword']);
if($NewPassword != $RePassword){
	$success = 'fail';
	$message = 'Passwords do not match';
}
else{
	$Password = md5($secret.$Password);
	$NewPassword = md5($secret.$NewPassword);
	$sql = "SELECT count(*) as count,Users.id FROM Users WHERE id='{$Userid}' AND Password='{$Password}'";
	$query = $db->query($sql);
	$count = 0;
	foreach($query as $user){
		$count = $user['count'];
	}
	if($count == 1){
		$sql = "UPDATE Users SET Password='{$NewPassword}',PasswordStamp=UNIX_TIMESTAMP() WHERE id='{$Userid}'";
		$query = $db->query($sql);
		$message = 'Your password has been updated.';
		$success = 'success';
	}
	else{
		$message = 'Invalid password';
		$success = 'fail';
	}
}

echo "{ 'success': '$success', 'message': '$message' }";
?>
