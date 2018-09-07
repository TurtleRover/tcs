#!/bin/sh

sudo rm /usr/bin/tcs

sudo rm /etc/systemd/system/turtlerover-tcs.service
sudo systemctl stop turtlerover-tcs
sudo systemctl disable turtlerover-tcs
