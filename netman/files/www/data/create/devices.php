<?php
require('../session.php');
$json_request = file_get_contents('php://input');
$json = json_decode($json_request);
$s = "INSERT INTO Devices (";
$q = "VALUES (";
/*
Need to debug:
the class field is not making it to the database, double check query with new INPUTS in form 
*/
foreach($json as $a=>$b){
	if(($a != "id") && ($a != "ClassName") && ($a != "Device")){
		$s .= "$a,";
		if($a == "Address"){
			$q .= "INET_ATON('$b'),";
		}
		elseif($a == "Alive"){
			$q .= "'2',";
		}
		else{
			$q .= "'$b',";
		}
	}
}
$s = trim($s,",");
$q = trim($q,",");
$sql = "$s) $q)";
/*
error_log($sql);
*/
$db->query($sql);
?>
