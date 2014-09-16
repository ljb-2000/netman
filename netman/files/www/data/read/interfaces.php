<?php
require("../session.php");

$data = Array();
$sort = 'ORDER BY SUBSTR(Interfaces.Name,3)+1,SUBSTR(Interfaces.Name,5)+1,IfIndex ';
$limit = '';
$what = "Devices.id as DeviceId,Devices.Name as DeviceName,Devices.LastModeled as LastModeled,Interfaces.id,Interfaces.IfIndex,Interfaces.Name,Interfaces.Description,Interfaces.Location,Interfaces.Cable,Interfaces.Vlan,Interfaces.MacNotify,Interfaces.VoiceVlan,Interfaces.User,Interfaces.UserComment,Interfaces.UserCommentStamp,Interfaces.FirstSeen,Interfaces.LastUp,Interfaces.LastDown ";
$from = "Interfaces LEFT JOIN Devices ON (Interfaces.Device = Devices.id)";
$where = "";
$c = 0;
/*
$LastModeled = date("U") - 60*60*1;
$lu = "SELECT * FROM Devices WHERE id='{$_REQUEST['Device']}'";
foreach($db->query($lu) as $row){
	$LastModeled = $row['LastModeled'] - 60*15;
}
*/

if(isset($_REQUEST['Device'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Device = '{$_REQUEST['Device']}') ";
	$c += 1;
}
if(isset($_REQUEST['DeviceName'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Devices.Name LIKE  '%{$_REQUEST['DeviceName']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Name'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Interfaces.Name LIKE '%{$_REQUEST['Name']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Description'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Interfaces.Description LIKE '%{$_REQUEST['Description']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Vlan'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Vlan LIKE '%{$_REQUEST['Vlan']}%') ";
	$c += 1;
}
if(isset($_REQUEST['VoiceVlan'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(VoiceVlan LIKE '%{$_REQUEST['VoiceVlan']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Location'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Location LIKE '%{$_REQUEST['Location']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Cable'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Cable LIKE '%{$_REQUEST['Cable']}%') ";
	$c += 1;
}
if(isset($_REQUEST['User'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(User LIKE '%{$_REQUEST['User']}%') ";
	$c += 1;
}
if(isset($_REQUEST['UserComment'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(UserComment LIKE '%{$_REQUEST['UserComment']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Status'])){
	if(count($_REQUEST['Status'] == 1)){
		if($c > 0){
			$where .= "AND ";
		}
		if($_REQUEST['Status'][0] == "Up"){
			$where .= "(Interfaces.LastUp >  Devices.LastModeled) ";
		}
		if($_REQUEST['Status'][0] == "Down"){
			$where .= "(Interfaces.LastDown >  Devices.LastModeled) ";
		}
		$c += 1;
	}
}
if(isset($_REQUEST['sort'])){
	$filters = json_decode($_REQUEST['sort']);
	if($filters[0]-> property == "Status"){
		$filters[0]-> property = "Interfaces.LastUp";
	}
	if($filters[0]-> property == "Name"){
		$filters[0]-> property = "SUBSTR(Interfaces.Name,3)+1,SUBSTR(Interfaces.Name,5)+1,IfIndex";
	}
	$sort = "ORDER BY ".$filters[0]-> property." ".$filters[0]-> direction;
}
if(isset($_REQUEST['start'])){
	$s = $_REQUEST['start'];
	$l = $_REQUEST['limit'];
	$limit = "LIMIT $s,$l";
}
if($c > 0){
	$where = "WHERE ".$where;
}
$sql = "SELECT $what FROM $from $where $sort $limit";

foreach($db->query($sql) as $row){
	if($row['LastUp'] > $row['LastModeled']){
		$row['Status'] = 'true';
	}
	else{
		$row['Status'] = 'false';
	}
	$data[] = $row;
}
$tsql = "SELECT COUNT(*) as totalCount FROM $from $where";
foreach($db->query($tsql) as $row){
	$totalCount = $row['totalCount'];
}
echo json_encode(Array("data"=>$data,"totalCount"=>$totalCount));
?>
