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

## Requirements
 * uv4l to send video stream
 * Working UART

## How to install
 * [Download latest package](https://github.com/TurtleRover/tcs/releases)
 * `sudo apt install ./turtlerover-tcs_*_all.deb`

## How to run
 * Open in browser http://10.0.0.1/ (for more detailed network configuration look at [Turtle OS repo](https://github.com/TurtleRover/turtleos))

## How to build
 * Run `yarn install`
 * Run `yarn build` to build productional files. There is also `yarn watch` command, it will watch for any changes in files and rebuild project
 * Run `utils/make_deb.sh`
 * Install Python dependencies `sudo pip3 install -r requirements.txt`

## How streaming works
Streaming is done with [UV4L](https://www.linux-projects.org/uv4l/) drivers and [WebRTC streaming server](https://www.linux-projects.org/uv4l/webrtc-extension/). UV4L comes preinstalled with [TurtleOS](https://github.com/TurtleRover/TurtleOS).
### Stream troubleshooting
There are still some problems with streaming and we are working to fix them. If stream doesn't work on your device, you may try to experiment with `/etc/uv4l/uv4l-uvc.conf`, especially with `webrtc-enable-hw-codec` option and [`force_hw_vcodec`](https://github.com/TurtleRover/tcs/blob/984120b8469f603650f3c6f979bfc96e2dcbbbde/client/src/js/core/stream.js#L72) in `core/stream.js`. If you find any solution to your problem with streaming - please let us know or create a pull request.

