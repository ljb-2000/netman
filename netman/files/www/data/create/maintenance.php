<?php
require('../session.php');
$json_request = file_get_contents('php://input');
$json = json_decode($json_request);
if(is_array($json)){
	error_log("Array_ness");
	foreach($json as $j){
		$Device = $j->DeviceId;
		$StartTime = $j->StartTime;
		$EndTime = $j->EndTime;
		$User = $Userid;
		$UserComment = $j->UserComment;
		
		$sql = "INSERT INTO Maintenance (Device,User,UserComment,StartTime,EndTime,TimeStamp) VALUES('{$Device}','{$User}','{$UserComment}','{$StartTime}','{$EndTime}',UNIX_TIMESTAMP())";
		/*
		error_log($sql);
		*/
		$db->query($sql);
	}
}	
else{
	$Device = $json->DeviceId;
	$StartTime = $json->StartTime;
	$EndTime = $json->EndTime;
	$User = $Userid;
	$UserComment = $json->UserComment;
	
	$sql = "INSERT INTO Maintenance (Device,User,UserComment,StartTime,EndTime,TimeStamp) VALUES('{$Device}','{$User}','{$UserComment}','{$StartTime}','{$EndTime}',UNIX_TIMESTAMP())";
	/*
	error_log($sql);
	*/
	$db->query($sql);
}
?>
