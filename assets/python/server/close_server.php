<?php
// 	THIS FILE STOPS WEBSOCKET SERVER
//$serverProcessPID = $_REQUEST["serverPID"];
//$mjpegStreamPID = $_REQUEST["mjpegPID"];
exec("sudo killall python3");
exec("sudo killall mjpg_streamer");
?>
