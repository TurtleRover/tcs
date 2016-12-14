<?php
// 	THIS FILE STOPS WEBSOCKET SERVER
$pid = $_REQUEST["pid"];
echo $pid;
// should using PID but currently doesn't work
exec("sudo killall python3");
exec("sudo killall mjpg_streamer");
?>
