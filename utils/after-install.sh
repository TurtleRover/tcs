#!/bin/sh

sudo pip3 install -r /opt/turtlerover/tcs/requirements.txt
sudo ln -sf /opt/turtlerover/tcs/tcs /usr/bin/tcs

# Sorry for this T.T

# Backup original apache configuration
sudo mv /etc/apache2/apache2.conf /etc/apache2/apache2.conf.ORIG
sudo mv /etc/apache2/sites-available /etc/apache2/sites-available.ORIG
sudo mv /etc/apache2/sites-enabled /etc/apache2/sites-enabled.ORIG

# Symlink custom apache configuration file
sudo ln -sf /opt/turtlerover/tcs/apache_conf/apache2.conf /etc/apache2/apache2.conf
sudo ln -sf /opt/turtlerover/tcs/apache_conf/sites-available /etc/apache2/sites-available
sudo ln -sf /opt/turtlerover/tcs/apache_conf/sites-enabled /etc/apache2/sites-enabled
