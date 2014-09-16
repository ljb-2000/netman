<?php
$view = "Devices";
$act = "read";
require("../session.php");
/*$property_defaults is inherited from db file */
$data = "{'data':[";
function findChild($parent){
	global $data;
	global $db;
	global $property_defaults;
	$sql = "SELECT * FROM Classes WHERE Parent='$parent' ORDER BY Name ASC";
	$c = 0;
	foreach($db->query($sql) as $row){
		$Leaf = "true";
		$data .=  "{'Name':'{$row['Name']}','id':'{$row['id']}','loaded':true,";
		foreach($property_defaults as $d){
			$data .= "'{$d}':\"{$row[$d]}\",";
		}
		$data .= "'data':[";
		if(findChild($row['id']) > 0){;
			$Leaf = "false";
		}
		$data .= "],'leaf':'{$Leaf}','expanded':'true'},";
		$c ++;
		
	}
	return $c;
}
findChild('0');
$tsql = "SELECT COUNT(*) as totalCount FROM Classes";
foreach($db->query($tsql) as $row){
	$totalCount = $row['totalCount'];
}
$data .= "],'totalCount':'$totalCount'}";
echo $data;
?>
