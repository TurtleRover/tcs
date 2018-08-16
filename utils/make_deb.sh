#!/bin/sh

rm *.deb

fpm --input-type dir \
	--output-type deb \
	--maintainer "Kell ideas Ltd. <contact@turtlerover.com>" \
	--name "turtlerover-tcs" \
	--vendor "Kell ideas Ltd." \
	--license "MIT" \
	--url "https://github.com/TurtleRover/tcs" \
	--version "0.12.2" \
	--iteration 7 \
	--architecture all \
	--deb-no-default-config-files \
	--exclude node_modules \
    --exclude .git \
    --exclude .cache \
	--deb-dist stretch \
	--verbose \
	--depends "python3 (>= 3.5.3-1)" \
	--depends "apache2" \
	--depends "wiringpi" \
	--depends "libapache2-mod-php" \
	--depends "php" \
	--prefix /opt/turtlerover/tcs \
	--description "Turtle Rover Control Software" \
	--after-install utils/after-install.sh \
	--after-remove utils/after-remove.sh \
	.
