<?php
/* Error Page */
if(!isset($error_msg)){
	$error_msg = "unknown";
}
?>
<html>
	<head>
		<title>NetMan: Built-in error page</title>
	</head>
	<body>
		<h1>There was an error</h2>
		<p>The specific error message was: <?php echo $error_msg;?></p>
	</body>
</html>
