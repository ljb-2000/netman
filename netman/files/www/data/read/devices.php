<?php
$permact = "View Device";
require("../session.php");

$recurse = 0;

$data = Array();
$sort = '';
$limit = '';
$what = "Devices.id,Devices.Class,Devices.Name,Devices.Address,Devices.Make,Devices.Model,Devices.Rack,Devices.Location,Devices.State,Devices.Layer,Devices.L2Domain,Devices.Serial,Devices.AssetTag,Devices.FirstSeen,Devices.LastSeen,Devices.Alive,Devices.Monitor,Devices.SnmpName,Devices.SnmpLocation,Devices.SnmpContact,Devices.SnmpDescription,Devices.DnsName,Devices.LastUp,Devices.LastDown,Devices.LastModeled,Devices.SnmpAssetTag,Devices.SnmpSerial,Devices.SSH_ALIVE,Devices.SSH_ENABLE_ALIVE, Classes.Name as ClassName";
$from = "Devices LEFT JOIN Classes ON (Devices.Class = Classes.id)";
$where = "";
$c = 0;
if(isset($_REQUEST['Alive'])){
	if($c > 0){
		$where .= "AND ";
	}
	if(is_array($_REQUEST['Alive'])){
		$where .= "(";
		$lc = 0;
		foreach($_REQUEST['Alive'] as $Alive){
			if(($lc > 0) && $lc < count($_REQUEST['Alive'])){
				$where .= "OR ";
			}
			$where .= "(Devices.Alive = '$Alive') ";
			$lc += 1;
		}
		$where .= ") ";
	}
	else{
		$where .= "(Devices.Alive = '{$_REQUEST['Alive']}') ";
	}
	$c += 1;
}
if(isset($_REQUEST['SSH_ALIVE'])){
	if($c > 0){
		$where .= "AND ";
	}
	if(is_array($_REQUEST['SSH_ALIVE'])){
		$where .= "(";
		$lc = 0;
		foreach($_REQUEST['SSH_ALIVE'] as $SSH_ALIVE){
			if(($lc > 0) && $lc < count($_REQUEST['SSH_ALIVE'])){
				$where .= "OR ";
			}
			$where .= "(Devices.SSH_ALIVE = '$SSH_ALIVE') ";
			$lc += 1;
		}
		$where .= ") ";
	}
	else{
		$where .= "(Devices.SSH_ALIVE = '{$_REQUEST['SSH_ALIVE']}') ";
	}
	$c += 1;
}
if(isset($_REQUEST['SSH_ENABLE_ALIVE'])){
	if($c > 0){
		$where .= "AND ";
	}
	if(is_array($_REQUEST['SSH_ENABLE_ALIVE'])){
		$where .= "(";
		$lc = 0;
		foreach($_REQUEST['SSH_ENABLE_ALIVE'] as $SSH_ENABLE_ALIVE){
			if(($lc > 0) && $lc < count($_REQUEST['SSH_ENABLE_ALIVE'])){
				$where .= "OR ";
			}
			$where .= "(Devices.SSH_ENABLE_ALIVE = '$SSH_ENABLE_ALIVE') ";
			$lc += 1;
		}
		$where .= ") ";
	}
	else{
		$where .= "(Devices.SSH_ENABLE_ALIVE = '{$_REQUEST['SSH_ENABLE_ALIVE']}') ";
	}
	$c += 1;
}
if(isset($_REQUEST['Monitor'])){
	if($c > 0){
		$where .= "AND ";
	}
	if(is_array($_REQUEST['Monitor'])){
		$where .= "(";
		$lc = 0;
		foreach($_REQUEST['Monitor'] as $Monitor){
			if(($lc > 0) && $lc < count($_REQUEST['Monitor'])){
				$where .= "OR ";
			}
			$where .= "(Devices.Monitor = '$Monitor') ";
			$lc += 1;
		}
		$where .= ") ";
	}
	else{
		$where .= "(Devices.Monitor = '{$_REQUEST['Monitor']}') ";
	}
	$c += 1;
}
if(isset($_REQUEST['State'])){
	if($c > 0){
		$where .= "AND ";
	}
	if(is_array($_REQUEST['State'])){
		$where .= "(";
		$lc = 0;
		foreach($_REQUEST['State'] as $State){
			/* Build SQL */
			if(($lc > 0) && $lc < count($_REQUEST['State'])){
				$where .= "OR ";
			}
			$where .= "(Devices.State = '$State') ";
			$lc += 1;
		}
		$where .= ") ";
	}
	else{
		$where .= "(Devices.State = '{$_REQUEST['State']}') ";
	}
	$c += 1;
}
if(isset($_REQUEST['Name'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Devices.Name LIKE '%{$_REQUEST['Name']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Address'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(INET_NTOA(Devices.Address) LIKE '%{$_REQUEST['Address']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Make'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Devices.Make LIKE '%{$_REQUEST['Make']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Model'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Devices.Model LIKE '%{$_REQUEST['Model']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Rack'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Devices.Rack LIKE '%{$_REQUEST['Rack']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Location'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Devices.Location LIKE '%{$_REQUEST['Location']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Layer'])){
	if($c > 0){
		$where .= "AND ";
	}
	if(is_array($_REQUEST['Layer'])){
		$where .= "(";
		$lc = 0;
		foreach($_REQUEST['Layer'] as $Layer){
			/* Build SQL */
			if(($lc > 0) && $lc < count($_REQUEST['Layer'])){
				$where .= "OR ";
			}
			$where .= "(Devices.Layer = '$Layer') ";
			$lc += 1;
		}
		$where .= ") ";
	}
	else{
		$where .= "(Devices.Layer = '{$_REQUEST['Layer']}') ";
	}
	$c += 1;
}
if(isset($_REQUEST['L2Domain'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Devices.L2Domain LIKE '%{$_REQUEST['L2Domain']}%') ";
	$c += 1;
}
if(isset($_REQUEST['Serial'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Devices.Serial LIKE '%{$_REQUEST['Serial']}%') ";
	$c += 1;
}
if(isset($_REQUEST['AssetTag'])){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Devices.AssetTag LIKE '%{$_REQUEST['AssetTag']}%') ";
	$c += 1;
}
if((isset($_REQUEST['ClassName'])) && ($_REQUEST['ClassName'] != "/")){
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "((Classes.Name ='{$_REQUEST['ClassName']}') OR (Classes.id IN (SELECT Classes.id FROM Classes WHERE Parent=(SELECT id FROM Classes WHERE Classes.Name='{$_REQUEST['ClassName']}'))) OR (Classes.id IN (SELECT id FROM Classes WHERE Classes.Parent IN((SELECT Classes.id FROM Classes WHERE Parent=(SELECT id FROM Classes WHERE Classes.Name='{$_REQUEST['ClassName']}')))))) ";
	$c += 1;
	$recurse = 1;
}
if(isset($_REQUEST['FirstSeen'])){
	$FirstSeen = strtotime($_REQUEST['FirstSeen']);
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Devices.FirstSeen >  '{$FirstSeen}') ";
	$c += 1;
}
if(isset($_REQUEST['LastSeen'])){
	$LastSeen = strtotime($_REQUEST['LastSeen']);
	if($c > 0){
		$where .= "AND ";
	}
	$where .= "(Devices.LastSeen >  '{$LastSeen}') ";
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
if($recurse > 0){
	/* Run same query for all parents */
}
$tsql = "SELECT COUNT(*) as totalCount FROM $from $where";
foreach($db->query($tsql) as $row){
	$totalCount = $row['totalCount'];
}
echo json_encode(Array("data"=>$data,"totalCount"=>$totalCount));
?>
