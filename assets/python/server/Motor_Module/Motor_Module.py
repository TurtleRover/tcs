#	Module for controling motors

import numpy as np	# Library with data types

#	Add path to import functions
import sys
import time
import os
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), os.path.pardir))
from Hardware_Communication.I2C import *

#	Updates Motors PWM values
def updateMotors (PWM1, PWM2, PWM3, PWM4):
	command = [0x10]	#	Set all motors
	command.append(PWM1)
	command.append(PWM2)
	command.append(PWM3)
	command.append(PWM4)
	sendI2C(command)
	#	Read data from Arduino
	return readI2C(0x20)

#	Read battery voltage (actualy, not the voltage but ADC reading)
def readBatteryVoltage():
	command = [0x30]
	sendI2C(command)
	return readI2C()