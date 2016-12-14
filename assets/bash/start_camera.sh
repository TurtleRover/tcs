#!/bin/bash
/usr/local/bin/mjpg_streamer -i "/usr/local/lib/input_uvc.so -n -f 1000 -r 1280x720" -o "/usr/local/lib/output_http.so -p 8090 -w /usr/local/www" &
