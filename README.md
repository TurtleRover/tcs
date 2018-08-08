<p align="center">
  <a href="http://turtlerover.com" alt="Turtle Rover"><img src="https://avatars3.githubusercontent.com/u/36553642?s=84&v=4" alt="Turtle Rover" /></a>
</p>
<h1 align="center">Turtle Control Software</h1>
<h4 align="center">A client-server application based on WebSocket technology to control Turtle Rover remotely
</h4>

<p align="center">
  <a href="https://travis-ci.org/TurtleRover/tcs">
    <img src="https://travis-ci.org/TurtleRover/tcs.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://github.com/TurtleRover/tcs/releases">
    <img src="https://img.shields.io/github/release/TurtleRover/tcs.svg" alt="Release"></a>
  <a href="https://github.com/TurtleRover/tcs/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/TurtleRover/tcs.svg">
  </a>
  <a href="https://twitter.com/TurtleRover">
    <img src="https://img.shields.io/twitter/follow/TurtleRover.svg?style=social&label=Follow">
  </a>
</p>
<p align="center">
  <a href="http://turtlerover.com" alt="Website">Website</a> |
  <a href="https://www.facebook.com/TurtleRover/" alt="Facebook">Facebook</a> |
  <a href="https://www.youtube.com/channel/UCxukvEct3wP0S5FACa3uelA" alt="YouTube">YouTube</a>
</p>

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

