<?php
$success = 'true';
$message = 'OK';

require('../session.php');
$json_request = file_get_contents('php://input');
$json = json_decode($json_request);
$Device = Array();
$p = Array('Name','Address','Make','Model','Serial','AssetTag','Location','Rack','Layer','L2Domain','State','Class','Monitor');
$json->Class = $json->ClassName;

$s = "SELECT * FROM Devices WHERE id='{$json->id}'";
foreach($db->query($s) as $row){
	for($i = 0;$i < count($p) ; $i ++){
		$Device[$p[$i]] = $row[$p[$i]];
	}
}
$sql = "UPDATE Devices SET ";
$Message = "Device settings updated: ";
$mod = 0;
for($i = 0;$i < count($p) ; $i ++){
	$Name = $p[$i];
	/*
	error_log($Name);
	*/
	$Value = $json->$p[$i];
	$OldValue = $Device[$p[$i]];
	if(($Name != "") && ($Value != $OldValue)){
		if($Name == "Address"){
			if($Value == long2ip($OldValue)){
				continue;
			}
			$sql .= "{$Name}=INET_ATON('{$Value}')";
			$OldValue = long2ip($OldValue);
		}
		else{
			if($Name == "Class"){
				$ccc = "SELECT * FROM Classes WHERE Name='$Value'";
				foreach($db->query($ccc) as $row){
					$Value = $row['id'];
				}
			}
			$sql .= "{$Name}='{$Value}'";
		}
		$Message .= "[$Name:$OldValue -> $Value]";
		$sql .= ",";
		$Message .= ",";
		$mod ++;
	}
}
$sql = rtrim($sql,",");
$Message = rtrim($Message,",");

$sql .= " WHERE id='{$json->id}'";
$hsql = "INSERT INTO History (Message,User,TimeStamp,Device) VALUES('{$Message}','{$Userid}',UNIX_TIMESTAMP(),'{$json->id}')";

if($mod > 0){
/*
	error_log($hsql);
	error_log($sql);
*/
	$db->query($sql);
	$db->query($hsql);
	$success = 'true';
	$message = 'Device updated';
	
}
echo "{ 'success': $success, 'message': '$message' }";
?>
