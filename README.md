# Turtle Control Software

This is a client-server application based on WebSocket technology. It allows to control Turtle Rover remotely.

## How it works (simplified)

**Web Application** --_WebSockets_--> **Server** --_Serial_--> **Firmware**

Also static files are served by Apache web server.

## Requirements
 * Apache web server to serve static files
 * uv4l to send video stream
 * Working UART
 * Python and JavaScript requirements

## How to install
 * Unpack archive with prebuilt frontend to a directory which is served by Apache
 * Install Python dependencies: run `sudo pip3 -r requirements.txt` in _tcs_ directory
 * Symlink tcs script: `sudo ln -sf /home/pi/tcs/tcs /usr/bin/tcs`

## How to run
 * Run `tcs`
 * Open in browser http://\*.\*.\*.\*/client/dist

## How to build
 * Run `yarn install`
 * Run `npm run build`
 
http://turtlerover.com

https://www.youtube.com/channel/UCxukvEct3wP0S5FACa3uelA

https://www.facebook.com/TurtleRover/
