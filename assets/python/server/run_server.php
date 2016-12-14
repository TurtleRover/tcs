<?php
    // THIS FILE STARTS WEBSOCKET SERVER
    $pid = exec("sudo python3 server.py > /dev/null 2>&1 & echo $!");
    exec("sudo sh ../../bash/start_camera.sh $");
    sleep(2);
    echo $pid;
?>
