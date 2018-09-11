#!/bin/sh

sudo pip3 install --default-timeout=100 -r /opt/turtlerover/tcs/requirements.txt
sudo ln -sf /opt/turtlerover/tcs/tcs /usr/bin/tcs

sudo cp /opt/turtlerover/tcs/server/turtlerover-tcs.service /etc/systemd/system
sudo systemctl enable turtlerover-tcs
sudo systemctl start turtlerover-tcs
