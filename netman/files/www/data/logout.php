<?php
require("session.php");
$Address = $_SERVER['REMOTE_ADDR'];
$Browser = $_SERVER['HTTP_USER_AGENT'];
$KeyValue = md5($Address).md5($Browser);


$sql = "DELETE FROM Sessions WHERE Address=INET_ATON('{$Address}') AND KeyValue='{$KeyValue}'";
$query = $db->query($sql);
?>
