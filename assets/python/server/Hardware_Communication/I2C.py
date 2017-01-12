#!/usr/bin/python3

#	This script is responsible for I2C communication

import numpy as np	# Library with data types

#	Add path to import functions
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from CRC import *

#	Configure I2C
import smbus
import time
bus = smbus.SMBus(1)
address = 0x0A

def sendI2C (message):
	message = [int(i) for i in message]	# Convert to integers
	message = buildCommand(message)
	message = [int(i) for i in message]	# As above convert to integers

	bus.write_i2c_block_data(address, message.pop(0), message)
	
	return

def readI2C (readCommand, lenght):
	#	Reads data from Arduino
	return bus.read_i2c_block_data(address, readCommand, lenght)
