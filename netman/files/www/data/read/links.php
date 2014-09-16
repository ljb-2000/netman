<?php
require("../session.php");

$data = Array();
$sort = '';
$limit = '';
$what = "*";
$from = "Links";
$where = "";
$c = 0;
if(isset($_REQUEST['query'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "((Name LIKE '%{$_REQUEST['query']}%') OR (INET_NTOA(Address) LIKE '%{$_REQUEST['query']}%')) ";
	$c += 1;
}
if(isset($_REQUEST['Name'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Name LIKE '%{$_REQUEST['Name']}%') ";
	$c += 1;
}
if(isset($_REQUEST['User'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(User LIKE '%{$_REQUEST['User']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Requestor'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Requestor LIKE '%{$_REQUEST['Requestor']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Status'])){
	if($c > 0){
		$where .= "AND ";
	}
	if(is_array($_REQUEST['Status'])){
		$where .= "(";
		$lc = 0;
		foreach($_REQUEST['Status'] as $Status){
			/* Build SQL */
			if(($lc > 0) && $lc < count($_REQUEST['Status'])){
				$where .= "OR ";
			}
			$where .= "(Links.Status = '$Status') ";
			$lc += 1;
		}
		$where .= ") ";
	}
	else{
		$where .= "(Links.Status = '{$_REQUEST['Status']}') ";
	}
	$c += 1;
}
if(isset($_REQUEST['Function'])){
	if($c > 0){
		$where .= "AND ";
	}
	if(is_array($_REQUEST['Function'])){
		$where .= "(";
		$lc = 0;
		foreach($_REQUEST['Function'] as $Function){
			/* Build SQL */
			if(($lc > 0) && $lc < count($_REQUEST['Function'])){
				$where .= "OR ";
			}
			$where .= "(Links.Function = '$Function') ";
			$lc += 1;
		}
		$where .= ") ";
	}
	else{
		$where .= "(Links.Function = '{$_REQUEST['Function']}') ";
	}
	$c += 1;
}
if(isset($_REQUEST['Type'])){
	if($c > 0){
		$where .= "AND ";
	}
	if(is_array($_REQUEST['Type'])){
		$where .= "(";
		$lc = 0;
		foreach($_REQUEST['Type'] as $Type){
			/* Build SQL */
			if(($lc > 0) && $lc < count($_REQUEST['Type'])){
				$where .= "OR ";
			}
			$where .= "(Links.Type = '$Type') ";
			$lc += 1;
		}
		$where .= ") ";
	}
	else{
		$where .= "(Links.Type = '{$_REQUEST['Type']}') ";
	}
	$c += 1;
}
if(isset($_REQUEST['Classification'])){
	if($c > 0){
		$where .= "AND ";
	}
	if(is_array($_REQUEST['Classification'])){
		$where .= "(";
		$lc = 0;
		foreach($_REQUEST['Classification'] as $Classification){
			/* Build SQL */
			if(($lc > 0) && $lc < count($_REQUEST['Classification'])){
				$where .= "OR ";
			}
			$where .= "(Links.Classification = '$Classification') ";
			$lc += 1;
		}
		$where .= ") ";
	}
	else{
		$where .= "(Links.Classification = '{$_REQUEST['Classification']}') ";
	}
	$c += 1;
}
if(isset($_REQUEST['Encryption'])){
	if($c > 0){
		$where .= "AND ";
	}
	if(is_array($_REQUEST['Encryption'])){
		$where .= "(";
		$lc = 0;
		foreach($_REQUEST['Encryption'] as $Encryption){
			/* Build SQL */
			if(($lc > 0) && $lc < count($_REQUEST['Encryption'])){
				$where .= "OR ";
			}
			$where .= "(Links.Encryption = '$Encryption') ";
			$lc += 1;
		}
		$where .= ") ";
	}
	else{
		$where .= "(Links.Encryption = '{$_REQUEST['Encryption']}') ";
	}
	$c += 1;
}
if(isset($_REQUEST['Rooms'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "((Room1 LIKE '%{$_REQUEST['Rooms']}%') OR (Room2 LIKE '%{$_REQUEST['Rooms']}%'))";
	$c += 1;
}
if(isset($_REQUEST['sort'])){
	$filters = json_decode($_REQUEST['sort']);
	if(($filters[0]-> property != "Rooms") && ($filters[0]-> property != "Devices")){
		$sort = "ORDER BY ".$filters[0]-> property." ".$filters[0]-> direction;
	}
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
