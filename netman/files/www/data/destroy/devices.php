<?php
require('../session.php');
$json_request = file_get_contents('php://input');
$json = json_decode($json_request);
if(count($json) > 1){
	foreach($json as $Device){
		destroyDevice($Device->id);
	}
}
else{
	destroyDevice($json->id);
}
function destroyDevice($id){
	global $db;
	$Tables = Array("Events","History","Addresses","DataSources","Graphs","LocalConfig","Maintenance","Models","Subscriptions");
	/* Purge database of device */
	foreach($Tables as $Table){
		$sql = "DELETE FROM {$Table} WHERE Device='{$id}'";
		/*
		error_log($sql);
		*/
		$db->query($sql);
	}
	$sql = "DELETE FROM Bookmarks WHERE Type='Device' AND ObjectId='{$id}'";
	/*
	error_log($sql);
	*/
	$db->query($sql);
	/* Perform device deletion */
	$sql = "DELETE FROM Devices WHERE id='{$id}'";
	/*
	error_log($sql);
	*/
	$db->query($sql);
}
?>
