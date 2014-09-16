<?php
require('../session.php');
$json_request = file_get_contents('php://input');
$json = json_decode($json_request);
$Class = Array();
$success = "true";
$message = "Class Updated";
/*
$property_defaults is inherited from db file 
*/
$p = $property_defaults;
$p[] = "Name";
/*
error_log($json_request);
*/

$s = "SELECT * FROM Classes WHERE id='{$json->id}'";
foreach($db->query($s) as $row){
	for($i = 0;$i < count($p) ; $i ++){
		$Class[$p[$i]] = $row[$p[$i]];
	}
}
$sql = "UPDATE Classes SET ";
$Message = "Class settings updated: ";
$mod = 0;
for($i = 0;$i < count($p) ; $i ++){
	$Name = $p[$i];
	$Value = $json->$p[$i];
	$OldValue = $Class[$p[$i]];
	if(($Name != "") && ($Value != $OldValue)){
		if($Name == "ClassName"){
			$Name = "Class";
		}
		$sql .= "{$Name}='{$Value}'";
		$Message .= "[$Name:$OldValue -> $Value]";
		$sql .= ",";
		$Message .= ",";
		$mod ++;
	}
}
$sql = rtrim($sql,",");
$Message = rtrim($Message,",");

$sql .= " WHERE id='{$json->id}'";
$hsql = "INSERT INTO History (Message,User,TimeStamp,Class) VALUES('{$Message}','{$Userid}',UNIX_TIMESTAMP(),'{$json->id}')";

if($mod > 0){
/*
*/
	error_log($sql);
	error_log($hsql);
	$db->query($sql);
	$db->query($hsql);
	
}
echo "{ 'success': $success, 'message': '$message' }";
?>
