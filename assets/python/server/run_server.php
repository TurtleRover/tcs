<?php
    // THIS FILE STARTS WEBSOCKET SERVER
    $pidPythonServer = exec("sudo python3 server.py > /dev/null 2>&1 & echo $!");
	$pidPythonServer = exec("pidof python3");
    //$pidMjpegStream = exec("sudo sh ../../bash/start_camera.sh > /dev/null 2>&1 & echo $!");
	sleep(1);
	//$pidMjpegStream = exec("pidof mjpg_streamer");
    echo $pidPythonServer;
    echo "\r\n";
    //echo $pidMjpegStream;
    echo "0";
?>