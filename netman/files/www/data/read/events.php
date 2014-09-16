<?php
require("../session.php");

$data = Array();
$sort = 'ORDER BY LastSeen DESC';
$limit = '';
$what = "Events.id,Events.Device,Events.Message,Events.Severity,Events.Facility,Events.Tag,Events.Reported,Events.FirstSeen,Events.LastSeen,Events.Status,Events.Count,Events.UserComment,Events.UserCommentStamp,Events.Source,Events.Cleared,Events.ClearedBy,Devices.Name,Classes.Name as ClassName, Users.Name as User ";
$from = "Events LEFT JOIN Devices ON (Events.Device=Devices.id) LEFT JOIN Classes ON (Devices.Class=Classes.id) LEFT JOIN Users ON (Events.User=Users.id) ";
$where = "";
$c = 0;
if(isset($_REQUEST['Status'])){
	if($c > 0){
		$where .= "AND ";
	}
	if(is_array($_REQUEST['Status'])){
		$where .= "(";
		$lc = 0;
		foreach($_REQUEST['Status'] as $Status){
			/* Build SQL */
			if(($lc > 0) && ($lc < count($_REQUEST['Status']))){
				$where .= "OR ";
			}
			$where .= "(Events.Status = '$Status') ";
			$lc += 1;
		}
		$where .= ") ";
	}
	else{
		if($c > 0){
			$where .= "AND ";
		}
		$where .= "(Events.Status = '{$_REQUEST['Status']}') ";
	}
	$c += 1;
}
if(isset($_REQUEST['Severity'])){
	if($c > 0){
		$where .= "AND ";
	}
	if(is_array($_REQUEST['Severity'])){
		$where .= "(";
		$lc = 0;
		foreach($_REQUEST['Severity'] as $Severity){
			/* Build SQL */
			if(($lc > 0) && $lc < count($_REQUEST['Severity'])){
				$where .= "OR ";
			}
			if($Severity == "5"){
				$where .= "(Events.Severity > '4') ";
			}
			else{
				$where .= "(Events.Severity = '$Severity') ";
			}
			$lc += 1;
		}
		$where .= ") ";
	}
	else{
		if($c > 0){
			$where .= "AND ";
		}
		$where .= "(Events.Severity = '{$_REQUEST['Severity']}') ";
	}
	$c += 1;
}
if(isset($_REQUEST['Name'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "((Devices.Name LIKE '%{$_REQUEST['Name']}%') OR (INET_NTOA(Devices.Address) LIKE '%{$_REQUEST['Name']}%')) ";
	$c += 1;
}
if(isset($_REQUEST['ClassName'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Classes.Name LIKE '%{$_REQUEST['ClassName']}%') ";
	$c += 1;
}
if(isset($_REQUEST['id'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Events.id = '{$_REQUEST['id']}') ";
	$c += 1;
}
if(isset($_REQUEST['Message'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Events.Message LIKE '%{$_REQUEST['Message']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Tag'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Events.Tag LIKE '%{$_REQUEST['Tag']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Facility'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Events.Facility LIKE '%{$_REQUEST['Facility']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Count'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Events.Count = '{$_REQUEST['Count']}') ";
	$c += 1;
}
if(isset($_REQUEST['Reported'])){
	$Reported = strtotime($_REQUEST['Reported']);
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Events.Reported >  '{$Reported}') ";
	$c += 1;
}
if(isset($_REQUEST['FirstSeen'])){
	$FirstSeen = strtotime($_REQUEST['FirstSeen']);
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Events.FirstSeen >  '{$FirstSeen}') ";
	$c += 1;
}
if(isset($_REQUEST['LastSeen'])){
	$LastSeen = strtotime($_REQUEST['LastSeen']);
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Events.LastSeen >  '{$LastSeen}') ";
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
