#	Add path to import functions
import sys
import time
import os
from Hardware_Communication.turtleSerial import *

sys.path.append(os.path.join(os.path.dirname(
    os.path.abspath(__file__)), os.path.pardir))

#	Updates Motors PWM values
MOTORS_PREFIX = 0x10  # Set all motors
POSTFIX = [0x0D, 0x0A]


def motors(data):
    print (data)
    command = [MOTORS_PREFIX]
    command.extend(data)
    command.extend(POSTFIX)
    return command

#	Read battery voltage (actualy, not the voltage but ADC reading)


def readBatteryVoltage():
    command = [0x30]
    command.append(0x00)
    command.append(0x00)
    command.append(0x00)
    command.append(0x00)
    command.append(0x0D)
    command.append(0x0A)
    # sendSerial(command)
    data = [0x31, 0]
    byte_read = ser.read(1)
    data[1] = int.from_bytes(byte_read, byteorder='big', signed=False)
    print("Battery value: " + str(data))
    return data

#	Set servo values


def setNewGripperPosition(msb, lsb):
    command = [0x94]
    command.append(msb)
    command.append(lsb)
    command.append(0x00)
    command.append(0x00)
    command.append(0x0D)
    command.append(0x0A)
    sendSerial(command)


def setNewCameraPosition(msb, lsb):
    command = [0xA4]
    command.append(msb)
    command.append(lsb)
    command.append(0x00)
    command.append(0x00)
    command.append(0x0D)
    command.append(0x0A)
    sendSerial(command)

#	Set servo values


def setNewManiPosition(axis_1_msb, axis_1_lsb, axis_2_msb, axis_2_lsb):
    command = [0x84]
    command.append(axis_1_msb)
    command.append(axis_1_lsb)
    command.append(axis_2_msb)
    command.append(axis_2_lsb)
    command.append(0x0D)
    command.append(0x0A)
    sendSerial(command)
