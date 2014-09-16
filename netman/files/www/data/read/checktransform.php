<?php
$Message = $_REQUEST['Message'];
$Tag = $_REQUEST['Tag'];

$sql = "SELECT * FROM Transformations WHERE ((('{$Message}' REGEXP MessageFilter AND TagFilter IS NULL) OR ('{$Tag}' REGEXP TagFilter AND MessageFilter IS NULL)) OR ('{$Message}' REGEXP MessageFilter AND '{$Tag}' REGEXP TagFilter)) AND Active='1' ORDER BY Action";

echo $sql;
?>



