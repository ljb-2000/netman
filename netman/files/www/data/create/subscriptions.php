<?php
require('../session.php');
/* blank subscription is added, must be edited */

$sql = "INSERT INTO Subscriptions (Name,Active,User) VALUES ('','0','{$Userid}')";
$db->query($sql);
?>
