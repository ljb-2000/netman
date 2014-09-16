<?php
require("../session.php");
$data = "{'data':[";

$tsql = "SELECT COUNT(*) as totalCount FROM Classes";
foreach($db->query($tsql) as $row){
	$totalCount = $row['totalCount'];
}
$data .= "],'totalCount':'$totalCount'}";
/*
echo $data;
*/
?>
{
    "success": true,
    "data": [
	{"Name":"df-aplnis"},
	{"Name":"asa-edge"},
	{"Name":"aplnis-117"},
	{"Name":"aplnis-1325"},
	{"Name":"aplnis-mp612"},
	{"Name":"aplnis-sector"},
	{"Name":"aplnis-oob"},
    ]    
}
