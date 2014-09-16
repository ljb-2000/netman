<?php
$a = exec("service netman-monitor status");
$b = exec("service netman-model status");
$data =	array();
$data[] = array("Name" => "netman-monitor","Status" => "$a");
$data[] = array("Name" => "netman-model","Status" =>"$b");
echo json_encode(array("data" => $data));

?>
