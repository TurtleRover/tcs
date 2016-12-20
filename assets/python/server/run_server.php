<?php
    // THIS FILE STARTS WEBSOCKET SERVER
    $pidPythonServer = exec("sudo python3 server.py > /dev/null 2>&1 & echo $!");
    $pidMjpegStream = exec("sudo sh ../../bash/start_camera.sh > /dev/null 2>&1 & echo $!");
    sleep(1);
    echo $pidPythonServer;
    echo "\r\n";
    echo $pidMjpegStream;
?>
