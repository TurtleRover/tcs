#	Add path to import functions
import sys
import time
import os

sys.path.append(os.path.join(os.path.dirname(
    os.path.abspath(__file__)), os.path.pardir))

#	Updates Motors PWM values
MOTORS_PREFIX = 0x10  # Set all motors
GRIPPER_PREFIX = 0x94
MANIPULATOR_PREFIX = 0x84
POSTFIX = [0x0D, 0x0A]


def motors(payload):
    command = bytearray()
    command.append(MOTORS_PREFIX)
    command.extend(payload)
    command.extend(POSTFIX)
    return command

#	Read battery voltage (actualy, not the voltage but ADC reading)

def battery():
    command = [0x30]
    command.append(0x00)
    command.append(0x00)
    command.append(0x00)
    command.append(0x00)
    command.append(0x0D)
    command.append(0x0A)
    return command

def readBatteryVoltage():

    # sendSerial(command)
    payload = [0x31, 0]
    byte_read = ser.read(1)
    payload[1] = int.from_bytes(byte_read, byteorder='big', signed=False)
    print("Battery value: " + str(payload))
    return payload

#	Set servo values


def gripper(payload):
    command = bytearray()
    command.append(GRIPPER_PREFIX)
    command.extend(payload)
    command.append(0x00)
    command.append(0x00)
    command.extend(POSTFIX)
    return command


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


def manipulator(payload):
    command = bytearray()
    command.append(MANIPULATOR_PREFIX)
    command.extend(payload)
    command.append(0x0D)
    command.append(0x0A)
    return command
