<?php
require("db.php");
/* $secret is the salt for the password hash */
/*$secret = "thIsisMy#Se(cr11et";
*/

$auth = false;
$access = false;
$Address = $_SERVER['REMOTE_ADDR'];
$Browser = $_SERVER['HTTP_USER_AGENT'];
$KeyValue = md5($Address).md5($Browser);


$sql = "SELECT * FROM Sessions LEFT JOIN Users ON (Sessions.User=Users.id) WHERE Address=INET_ATON('{$Address}') AND KeyValue='{$KeyValue}'";
$query = $db->query($sql);
$count = 0;
foreach($query as $session){
	$auth = true;
	$Username = $session['Name'];
	$Userid = $session['User'];
	$Groupid = $session['Groupid'];
	/* Load User here */
	$USER = "var User = {
		'Uid': '{$session['id']}',
		'Name': '{$session['Name']}',
		'PasswordStamp': '{$session['PasswordStamp']}',
		'FirstName': '{$session['FirstName']}',
		'LastName': '{$session['LastName']}',
		'PageSize': '{$session['PageSize']}',
		'PortalPageSize': '{$session['PortalPageSize']}',
		'Stateful': '{$session['Stateful']}',
		'Portlets': ";
	$psql = "SELECT * FROM Portlets WHERE User='$Userid' ORDER BY Colid ASC, DisplayOrder ASC";
	$pquery = $db->query($psql);
	$portlets = Array();
	foreach($pquery as $portlet){
		$colid = $portlet['Colid'];
		$xtype = $portlet['Xtype'];
		$portlets[$colid]['data'][] = "$xtype";
	}
	$USER .= json_encode($portlets);
	$USER .= "};";
	$sql = "UPDATE Sessions SET Cycle=UNIX_TIMESTAMP() WHER Address=INET_ATON('{$Address}') AND KeyValue='{$KeyValue}' AND User='$Userid'";
	$query = $db->query($sql);
}
if((!isset($Main)) && (!$auth)){
	echo "{ 'failure': 'authorization denied'}";
	exit();
}
/* Access Control 
$Permissions = Array("0"=> "none","1" => "read","2" => "edit", "3" => "create","4" => "delete");
*/
if(!isset($permact)){
	$access = true;
}
else{
	$sql = "SELECT Permission FROM RolePermissions WHERE Role IN (SELECT Role FROM GroupRoles WHERE Groupid='{$Groupid}') And Permission='{$permact}'";
	$query = $db->query($sql);
	foreach($query as $permission){
		$access = true;
	}
}
if(!$access){
	echo "{ 'failure': 'access denied'}";
	exit();
}

?>
