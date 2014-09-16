<?php
require("../session.php");

$data = Array();
$sort = 'ORDER BY TimeStamp DESC';
$limit = '';
$what = "History.id,History.Message,History.TimeStamp,History.Device,History.Vlan,History.Link,Device,Name as Device";
$from = "History LEFT JOIN Devices ON (History.Device=Devices.id)";
$where = "";
$c = 0;
if(isset($_REQUEST['Name'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "((Devices.Name LIKE '%{$_REQUEST['Name']}%') OR (INET_NTOA(Devices.Address) LIKE '%{$_REQUEST['Name']}%')) ";
	$c += 1;
}
if(isset($_REQUEST['id'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(History.id = '{$_REQUEST['id']}') ";
	$c += 1;
}
if(isset($_REQUEST['Message'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(History.Message LIKE '%{$_REQUEST['Message']}%') ";
	$c += 1;
}
if(isset($_REQUEST['TimeStamp'])){
	$TimeStamp = strtotime($_REQUEST['TimeStamp']);
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(History.Timestamp >  '{$TimeStamp}') ";
	$c += 1;
}
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
