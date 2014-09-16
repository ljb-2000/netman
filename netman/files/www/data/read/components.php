<?php
require("../session.php");
$add = false;
if(isset($_REQUEST['class'])){
	$add = true;
	$class = $_REQUEST['class'];
}
$class = '2';

$components = Array("Name","Class","Xtype");
$data = "{'data':[";
function findChild($parent){
	global $data;
	global $db;
	global $components;
	global $class;
	global $add;
	$sql = "SELECT * FROM DeviceComponents WHERE Parent='$parent' AND Active='1' AND (Class='0' ";
	if($add){
		$sql .= "OR Class='$class' ";
	}
	$sql .= ")ORDER BY Name ASC";
	$c = 0;
	foreach($db->query($sql) as $row){
		$Leaf = "true";
		$data .=  "{'Name':'{$row['Name']}','id':'{$row['id']}','loaded':true,'xtype':'{$row['Xtype']}','class':'{$row['Class']}',";
		
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
$tsql = "SELECT COUNT(*) as totalCount FROM DeviceComponents";
foreach($db->query($tsql) as $row){
	$totalCount = $row['totalCount'];
}
$data .= "],'totalCount':'$totalCount','success':'true'}";
echo $data;
?>
