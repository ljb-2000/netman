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
	{"Name":"Production"},
	{"Name":"Pre-Production"},
	{"Name":"Testing"},
	{"Name":"Discovered"},
	{"Name":"De-comissioned"},
    ]    
}
