<?php
require('../session.php');
$json_request = file_get_contents('php://input');
$json = json_decode($json_request);
$sql = "UPDATE Users SET ";
foreach($json as $field){
	foreach($field as $name => $value){
		if(($name != "id") && ($name != "PasswordStamp") && ($name != "GroupName")){
			$sql .= "$name='$value'";
			$sql .= ",";
		}
	}
}
$sql = rtrim($sql,",");
$sql .= " WHERE id='$Userid'";
/*
error_log($sql);
*/
$db->query($sql);
?>
