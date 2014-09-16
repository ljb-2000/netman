<?php
$permact = "Admin";
#require("../session.php");
$data = Array();
$s = Array('netman-monitor','netman-model','dns-monitor');
foreach($s as $service){
	exec("service $service status",$output,$status);
	if($status == 0){
		$status = "OK";
	}
	else{
		$status = "Not Running";
	}
	$data[] = Array("Name" => "$service","Status" => "$status");
	
}
$totalCount = count($data);
echo json_encode(Array("data"=>$data,"totalCount"=>$totalCount));
?>
