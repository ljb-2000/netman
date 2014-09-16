<?php
require("../session.php");
$Action = trim($_REQUEST['action']);
$Comment = trim($_REQUEST['comment']);
$E = explode(',',$_REQUEST['events']);
$sql = "UPDATE Events SET Status='{$Action}', User='{$Userid}',UserCommentStamp=UNIX_TIMESTAMP(),UserComment='{$Comment}' WHERE ";
for($i = 0; $i < count($E); $i ++){
	$sql .= "id='{$E[$i]}' ";
	if($i < count($E) - 1 ){
		$sql .= "OR ";
	}
}
$db->query($sql);

?>
