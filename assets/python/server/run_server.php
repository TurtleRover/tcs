<?php
    // THIS FILE STARTS WEBSOCKET SERVER

    //  receive the parameters
    $resolution = $_GET['resolution'];

    //  kill old processes
    exec ("sudo killall python3");
    exec ("sudo killall mjpeg_streamer");
    sleep(0.5);

    $pidPythonServer = exec("sudo python3 server.py > /dev/null 2>&1 & echo $!");
    sleep(0.5);
	$pidPythonServer = exec("pidof python3");
    $command = "sudo sh ../../bash/start_camera.sh " . $resolution . " > /dev/null 2>&1 & echo $!";
    $pidMjpegStream = exec($command);
	sleep(1);
	$pidMjpegStream = exec("pidof mjpg_streamer");
    echo $pidPythonServer;
    echo "\r\n";
    echo $pidMjpegStream;
    echo "\r\n";
    echo "0";
?>