<?php
require("../session.php");

$data = Array();
$sort = '';
$limit = '';
$what = "*";
$from = "Graphs";
$where = "";
$c = 0;
if(isset($_REQUEST['Device'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Device = '{$_REQUEST['Device']}') ";
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
