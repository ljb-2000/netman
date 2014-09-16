<?php
require("../session.php");

$data = Array();
$sort = '';
$limit = '';
$what = "Subscriptions.id,Subscriptions.Name,Subscriptions.Description,Subscriptions.Severity,Subscriptions.Filter,Subscriptions.Active,Devices.Name as Device,Classes.Name as Class,Subscriptions.Tag ";
$from = "Subscriptions LEFT JOIN Devices ON (Subscriptions.Device=Devices.id) LEFT JOIN Classes ON (Subscriptions.Class=Classes.id) ";
$where = "User='{$Userid}' ";
$c = 1;
if(isset($_REQUEST['sort'])){
	$filters = json_decode($_REQUEST['sort']);
	$sort = "ORDER BY ".$filters[0]-> property." ".$filters[0]-> direction;
}
if(isset($_REQUEST['start'])){
	$s = $_REQUEST['start'];
	$l = $_REQUEST['limit'];
	$limit = "LIMIT $s,$l";
}
if($c >0){
	$where = "WHERE ".$where;
}

$sql = "SELECT $what FROM $from $where $sort $limit";

foreach($db->query($sql) as $row){
	$data[] = $row;
}
$tsql = "SELECT COUNT(*) as totalCount FROM $from $where";
foreach($db->query($tsql) as $row){
	$totalCount = $row['totalCount'];
}
echo json_encode(Array("data"=>$data,"totalCount"=>$totalCount));
?>
