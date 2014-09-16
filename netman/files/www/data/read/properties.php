<?php
require("../session.php");

/*
$property_defaults is inherited from db file 
*/
$Properties = Array();
$Device = $_REQUEST['Device'];
$Classid = $_REQUEST['Class'];
$depth = 0;

function findParent($child){
	global $Properties;
	global $property_defaults;
	global $db;
	global $depth;
	
	if(!isset($Properties[$depth])){
		$Properties[$depth] = Array();
	}
	$sql = "SELECT * FROM Classes WHERE id='$child'";
	$Parent = 0;
	foreach($db->query($sql) as $row){
		foreach($property_defaults as $d){
			$Properties[$depth][$d] = $row[$d];
		}
		$Parent = $row['Parent'];
	}
	$depth ++;
	if($Parent > 0){
		findParent($Parent);
	}
}
findParent($Classid);

$Real = Array();
$Properties = array_reverse($Properties);

foreach($Properties as $Class => $P){
	foreach($property_defaults as $d){
		/*print "{$d}={$P[$d]}<br/>";*/
		if(isset($P[$d])){
			if($P[$d] != ""){
				$Real[$d] = $P[$d];
			}
		}
	}
}
$sql = "SELECT * FROM LocalConfig WHERE Device='{$Device}'";
foreach($db->query($sql) as $row){
	foreach($property_defaults as $d){
		if(isset($row[$d])){
			if($row[$d] != ""){
				$Real[$d] = $row[$d];
			}
		}
	}
}
$data = Array("data"=>$Real);
echo json_encode($data);
	
?>
