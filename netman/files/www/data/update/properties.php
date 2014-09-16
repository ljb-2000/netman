<?php
require('../session.php');
$json_request = file_get_contents('php://input');
$json = json_decode($json_request);
$Device = Array();
/*
$property_defaults is inherited from db file 

*/
$Deviceid = $_REQUEST['Device'];
$sql = "";

$p = $property_defaults;
$c = 0;

$s = "SELECT * FROM LocalConfig WHERE Device='{$Deviceid}'";
$results = $db->query($s);
foreach($results as $row){
	for($i = 0;$i < count($p) ; $i ++){
		$Device[$p[$i]] = $row[$p[$i]];
	}
	$c ++;
}
if($c > 0){
	error_log("There was a property before");
	$action = "update";
}
else{
	$action = "insert";
}
$usql = "UPDATE LocalConfig SET ";
$isql = "INSERT INTO LocalConfig (";
foreach($property_defaults as $a){
	$isql .= "$a,";	
}
$isql .="Device) VALUES(";
$Message = "Device configuration updated: ";
$mod = 0;
for($i = 0;$i < count($p) ; $i ++){
	$Name = $p[$i];
	if(isset($json->$p[$i])){
		$Value = $json->$p[$i];
	}
	else{
		$Value = "";
	}
	if(isset($Device[$p[$i]])){
		$OldValue = $Device[$p[$i]];
	}
	else{
		$OldValue = "";
	}
	if(($Name != "") && ($Value != $OldValue)){
		$usql .= "{$Name}='{$Value}',";
		$Message .= "[$Name:$OldValue -> $Value],";
		$mod ++;
	}
	$isql .= "'{$Value}',";
}
$usql = rtrim($usql,",");

$Message = rtrim($Message,",");
if($action == "insert"){
	$sql = $isql."'{$Deviceid}')";
}
else{
	$sql = $usql." WHERE Device='{$Deviceid}'";
}

$hsql = "INSERT INTO History (Message,User,TimeStamp,Device) VALUES('{$Message}','{$Userid}',UNIX_TIMESTAMP(),'{$Deviceid}')";

if(($mod > 0) || ($action == "insert")){
/*
	error_log($hsql);
	error_log($sql);
*/
	$db->query($sql);
	$db->query($hsql);
	
}
?>
