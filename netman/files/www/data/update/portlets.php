<?php
require('../session.php');
$json = json_decode($_REQUEST['json']);
$sql = "DELETE FROM Portlets WHERE User='{$Userid}'";
$db->query($sql);
for($i = 0; $i < count($json); $i ++){
	for($o = 0; $o < count($json[$i]); $o ++){
		$colid = $i;
		$order = $o;
		$xtype = $json[$i][$o];
		if($xtype != ''){
			$sql = "INSERT INTO Portlets (User,Xtype,Colid,DisplayOrder) VALUES('{$Userid}','{$xtype}','{$colid}','{$order}')";
			$db->query($sql);
		}
	}
}

?>
