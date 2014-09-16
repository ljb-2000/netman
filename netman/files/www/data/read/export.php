<?php
require('../session.php');

/* Before creating new file, deletes user's last export  ( only stores one at a time )*/
$dir = "../export/";

/*** cycle through all files in the directory ***/
foreach (glob($dir."*{$Username}*") as $file) {
	    unlink($file);
}


$data = urldecode($_REQUEST['headers'])."\r\n".urldecode($_REQUEST['data']);

$mydate = date("Y-m-d-h-ms");
$myname = "{$mydate}-{$Username}-export.csv";


$myfilename = ("../export/{$myname}");
$myfile = fopen($myfilename,'w');
fwrite($myfile,$data);
fclose($myfile);

echo "<a href='data/export/{$myname}' target='_blank'>{$myname}</a>";

?>
