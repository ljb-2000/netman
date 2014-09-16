<?php
require('../session.php');
$success = 'true';
$message = 'OK';

$json_request = file_get_contents('php://input');
$json = json_decode($json_request);

$id = $json->id;
$Name = $json->Name;
$Filter = $json->Filter;
$Device = $json->Device;
if( ($Device != "" ) && (!is_int($Device))){
	$q = "SELECT * FROM Devices WHERE Name='{$Device}' OR id='{$Device}'";
	$tsql = "SELECT COUNT(*) as totalCount FROM Devices WHERE Name='{$Device}' OR id='{$Device}'";
	foreach($db->query($tsql) as $row){
		$totalCount = $row['totalCount'];
	}
	if($totalCount == 1){
		foreach($db->query($q) as $row){
			$Device = $row['id'];
		}
	}
	else{
		$success = 'false';
		$message = "The specified device {$Device} can not be found";
	}
}

$Class = $json->Class;
if( ($Class != "" ) && (!is_int($Class))){
	$q = "SELECT * FROM Classes WHERE Name='{$Class}'";
	$tsql = "SELECT COUNT(*) as totalCount FROM Classes WHERE Name='{$Class}'";
	foreach($db->query($tsql) as $row){
		$totalCount = $row['totalCount'];
	}
	if($totalCount == 1){
		foreach($db->query($q) as $row){
			$Class = $row['id'];
		}
	}
	else{
		$success = 'false';
		$message = "The specified class {$Class} can not be found";
	}
}
$Tag = $json->Tag;
$Severities = Array(
	'' => '0',
	'Critical' => '1',
	'Error' => '2',
	'Warning' => '3',
	'Info' => '4',
	'Debug' => '5'
);
$Severity = $Severities[$json->Severity];
if($json->Active == 'true'){
	$Active ='1';
}
else{
	$Active ='0';
}
$sql = "UPDATE Subscriptions SET Name='{$Name}',Filter='{$Filter}',Device='{$Device}',Class='{$Class}',Tag='{$Tag}',Severity='{$Severity}',Active='{$Active}' WHERE User='$Userid' AND id='$id'";
/*
error_log($sql);
*/
if($success == 'true'){
	$db->query($sql);
	$message = "The subscription has been updated.";
}
echo "{ 'success': $success, 'message': '$message' }";
?>
