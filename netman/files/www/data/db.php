<?php
/* database settings */
$cfg = "/etc/netman.conf";
$ssl = 0;
/* Do not edit below this line */
if($handle = fopen($cfg,"r")){
	$data = fread($handle,filesize($cfg));
	$rows = preg_split("/\n|\r|\r\n/",$data);
	foreach($rows as $line){
		if(preg_match("/^dbn/",$line)){
			$a = preg_split("/\=/",$line);
			$dbdriver = trim($a[1]);
		}
		if(preg_match("/^dbuser/",$line)){
			$a = preg_split("/\=/",$line);
			$dbuser = trim($a[1]);
		}
		if(preg_match("/^sitename/",$line)){
			$a = preg_split("/\=/",$line);
			$site_name = trim($a[1]);
		}
		if(preg_match("/^ssl/",$line)){
			$a = preg_split("/\=/",$line);
			$ssl = trim($a[1]);
		}
		if(preg_match("/^siteurl/",$line)){
			$a = preg_split("/\=/",$line);
			$site_url = trim($a[1]);
		}
		if(preg_match("/^database/",$line)){
			$a = preg_split("/\=/",$line);
			$database = trim($a[1]);
		}
		if(preg_match("/^dbhost/",$line)){
			$a = preg_split("/\=/",$line);
			$dbhost = trim($a[1]);
		}
		if(preg_match("/^dbpasswd/",$line)){
			$a = preg_split("/\=/",$line);
			$dbpasswd = trim($a[1]);
		}
		if(preg_match("/^secret/",$line)){
			$a = preg_split("/\=/",$line);
			$secret = trim($a[1]);
		}
	}
}
if(preg_match("/true|1|enabled/",$ssl)){
	$ssl = 1;
}
/* check for force ssl */
if(preg_match("/https/",$site_url)){
	$ssl = 1;
}
/* check for protocol */
if(!preg_match("/http(s)?\:\/\//",$site_url)){
	if($ssl){
		$site_url = "https://{$site_url}";
	}
	else{
		$site_url = "http://{$site_url}";
	}
}
if(!preg_match("/\/$/",$site_url)){
	$site_url = "{$site_url}/";
}

try{
	$db = new PDO("$dbdriver:dbname=$database;host=$dbhost",$dbuser,$dbpasswd);
}
catch(PDOException $e){
	$error_msg = $e->getMessage();
	include("error.php");
	exit();
}
/* defaults that are used in multiple scripts */
$property_defaults = Array('SNMP_ENABLED','SNMP_VERSION','SNMP_USER','SNMP_READ_COMMUNITY','SNMP_WRITE_COMMUNITY','SNMP_AUTHTYPE','SNMP_PRIVTYPE','SNMP_AUTHKEY','SNMP_PRIVKEY','SNMP_TIMEOUT','SSH_USER','SSH_PASSWD','SSH_ENABLE_PASSWD','SSH_TIMEOUT','SSH_ENABLED','BACKUP_SCRIPT');

?>
