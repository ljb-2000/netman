<?php
require('../session.php');
exit();
$json_request = file_get_contents('php://input');
$json = json_decode($json_request);

$id = $json->id;
$Name = $json->Name;
$Filter = $json->Filter;
$Device = $json->Device;
$Class = $json->Class;
$Tag = $json->Tag;
$Severity = $json->Severity;
if($json->Active == 'true'){
	$Active ='1';
}
else{
	$Active ='0';
}
$sql = "UPDATE Maintenance SET Name='{$Name}',Filter='{$Filter}',Device='{$Device}',Class='{$Class}',Tag='{$Tag}',Severity='{$Severity}',Active='{$Active}' WHERE User='$Userid' AND id='$id'";
/*
$db->query($sql);
*/
error_log($sql);
?>
