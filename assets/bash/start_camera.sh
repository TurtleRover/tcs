#!/bin/bash
#raspistill --nopreview -w 640 -h 480 -q 5 -o /home/pi/cam_ram/camera.jpg -tl 0 -t 9999999 -th 0:0:0 &
#/usr/local/bin/mjpg_streamer -i "/usr/local/lib/input_file.so -f /home/pi/cam_ram -n camera.jpg" -o "/usr/local/lib/output_http.so -p 8090 -w /usr/local/www" &

#	CAMERA RASPBERRY
#/usr/local/bin/mjpg_streamer -i "/usr/local/lib/mjpg-streamer/input_raspicam.so -fps 30 -x 1366 -y 768 -q 10" -o "/usr/local/lib/mjpg-streamer/output_http.so -p 8090 -w /usr/local/www" &

#	CAMERA USB
/usr/local/bin/mjpg_streamer -i "/usr/local/lib/input_uvc.so -n -f 1000 -r $1" -o "/usr/local/lib/output_http.so -p 8090 -w /usr/local/www" &
