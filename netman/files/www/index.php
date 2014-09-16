<?php
$Main = true;
/* Check session here */
require("data/session.php");

/* two way ssl gurantee 
* - if configured for ssl, will force
* - if not configured for ssl, will force standard HTTP
*/
if ((empty($_SERVER['HTTPS'])) && ($ssl)) {
	print "Redirecting to SSL";
	header("Location: {$site_url}");
	exit();
}
if ((isset($_SERVER['HTTPS'])) && (!$ssl)) {
	print "Redirecting to NON SSL";
	header("Location: {$site_url}");
	exit();
}
if(!$auth){
	require("resources/html/login.html");
	exit();
}
if(isset($_REQUEST['url'])){
	header("Location: {$_REQUEST['url']}");
}
?>
<html>
<head>
	<title><?php echo $site_name;?></title>

	<link rel="stylesheet" type="text/css" href="<?php echo $site_url;?>/extjs/resources/css/ext-all-gray.css"
	<link rel="stylesheet" type="text/css" href="<?php echo $site_url;?>/resources/css/splash.css">
	<link rel="stylesheet" type="text/css" href="<?php echo $site_url;?>/resources/css/netman.css">
	<link rel="stylesheet" type="text/css" href="<?php echo $site_url;?>/resources/css/portal.css">
	<base href="<?php echo $site_url;?>">
	<script type="text/javascript">
		<?php echo $USER;?>
		var mainnav = "<ul class='main_nav'><li class='title'><a href=''><?php echo $site_name;?></a></li><li><a href='devices'>Devices</a></li><li><a href='vlans'>Vlans</a></li><li><a href='links'>Links</a></li><li><a href='events'>Events</a></li></ul>";
		var site_url = '<?php echo $site_url;?>';
		var ssl = '<?php echo $ssl;?>';
	</script>
	<script type="text/javascript" src="<?php echo $site_url;?>/extjs/ext-all.js"></script>
	<script type="text/javascript" src="<?php echo $site_url;?>/app/plugins/Netman.js"></script>
<?php
flush();
/*  decide what to load based on incoming url */
if((isset($_REQUEST['Application']) && ($_REQUEST['Application'] != "") && ($_REQUEST['Application'] != "data" ))){
	$Application = trim($_REQUEST['Application']);
}
else{
	$Application = "dashboard";
}
echo "<script type='text/javascript' src='{$site_url}/app/{$Application}.js'></script>";
	
?>
</head>
<body>
<?php
	echo "
		Please wait while {$site_name} is loading...<hr/>
		If you still see this message after a few seconds, try clicking here ---> <a href='{$site_url}'>{$site_name}</a>
		If you are having issues accessing the system, please contact an adminstrator<hr/>";
?>
</body>
</html>
