#	Module for controling motors

import numpy as np	# Library with data types

#	Add path to import functions
import sys
import time
import os
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), os.path.pardir))
from Hardware_Communication.turtleSerial import *

#	Updates Motors PWM values
def updateMotors (PWM1, PWM2, PWM3, PWM4):
	command = [0x10]	#	Set all motors
	command.append(PWM1)
	command.append(PWM2)
	command.append(PWM3)
	command.append(PWM4)
	command.append(0x0D)
	command.append(0x0A)
	sendSerial(command)
	#	Read data from Arduino
	return command

#	Read battery voltage (actualy, not the voltage but ADC reading)
def readBatteryVoltage():
	command = [0x40]
	command.append(0x0D)
	command.append(0x0A)
	sendSerial(command)
	data = ser.read(2)
	print("Battery value: " + data)
	return 0

#	Set servo values
def setNewServoPosition(servo, msb, lsb):
	'''command = [0x84]
	command.append(servo)
	command.append(msb)
	command.append(lsb)

	sendI2C(command)'''