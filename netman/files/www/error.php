<?php
/* Error Page */
if(!isset($error_msg)){
	$error_msg = "unknown";
}
?>
<html>
	<head>
		<title>NetMan: Built-in error page</title>
		<link href='error.css' rel='stylesheet' type='text/css'/>
	</head>
	<body>
		<h1>There was an error loading the page</h2>
		<p>The specific error message was: <?php echo $error_msg;?></p>
		<p>For more help on this specific error, please check the Netman documentation or refer to the system administrator.</p>
	</body>
</html>
