<?php
    // THIS FILE STARTS WEBSOCKET SERVER

    //  receive the parameters
    $resolution = $_GET['resolution'];

    $numberOfClients = exec("netstat -n | grep 192.168.10.1:8090 | wc -l");
    echo $numberOfClients;
    echo "\r\n";

    //  run processes only if nobody is connected
    if ($numberOfClients >= 0) {
		//	restart STM
		exec ("sudo gpio mode 1 out");
		exec ("sudo gpio write 1 0");
        //  kill old processes
        exec ("sudo killall python3 > /dev/null 2>&1");
        exec ("sudo killall mjpg_streamer > /dev/null 2>&1");
        exec ("sudo ifconfig wlan0 down");
		sleep(0.25);
		exec ("sudo gpio write 1 1");
		#sleep(1);
        $pidPythonServer = exec("sudo python3 server.py > /dev/null 2>&1 & echo $!");
        sleep(0.5);
        $pidPythonServer = exec("pidof python3");
		#sleep(1);
        #$command = "sudo sh ../../bash/start_camera.sh " . $resolution . " > /dev/null 2>&1 & echo $!";
        #$pidMjpegStream = exec($command);
        #sleep(1.5);
        #$pidMjpegStream = exec("pidof mjpg_streamer");
        echo $pidPythonServer;
        echo "\r\n";
        #echo $pidMjpegStream;
        echo 0;
		echo "\r\n";
    }
    echo "0";
?>
