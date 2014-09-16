<?php
require("../session.php");

$data = Array();
$sort = '';
$limit = '';
$what = "Devices.Name as DeviceName, Devices.id AS Device, Nodes.Interface, Nodes.Vlan,Nodes.MacAddress,Nodes.Address,Nodes.Name, Nodes.FirstSeen,Nodes.LastSeen ";
$from = "Nodes LEFT JOIN Devices ON (Nodes.Device=Devices.id) ";
$where = "";
$c = 0;
if(isset($_REQUEST['query'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "((Name LIKE '%{$_REQUEST['query']}%') OR (INET_NTOA(Address) LIKE '%{$_REQUEST['query']}%')) ";
	$c += 1;
}
if(isset($_REQUEST['DeviceName'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Devices.Name LIKE '%{$_REQUEST['DeviceName']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Interface'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Nodes.Interface LIKE '%{$_REQUEST['Interface']}%') ";
	$c += 1;
}
if(isset($_REQUEST['MacAddress'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Nodes.MacAddress LIKE '%{$_REQUEST['MacAddress']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Address'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(INET_NTOA(Nodes.Address) LIKE '%{$_REQUEST['Address']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Name'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Nodes.Name LIKE '%{$_REQUEST['Name']}%') ";
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
