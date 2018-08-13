#!/bin/sh

fpm --input-type dir \
	--output-type deb \
	--maintainer "Kell ideas Ltd. <contact@turtlerover.com>" \
	--name "tcs" \
	--vendor "Kell ideas Ltd." \
	--url "some url" \
	--license "MIT" \
	--version "0.12.2" \
	--iteration 1 \
	--architecture all \
	--deb-no-default-config-files \
	--exclude node_modules \
    --exclude .git \
    --exclude .cache \
	--deb-dist stretch \
	--verbose \
	--url "https://github.com/TurtleRover/tcs" \
	--depends "python3 (>= 3.5.3-1)" \
	--depends "apache2" \
	--prefix /opt/turtle/tcs \
	--description "Turtle Rover Control Software" \
	--after-install utils/after-install.sh \
	--after-remove utils/after-remove.sh \
	.
