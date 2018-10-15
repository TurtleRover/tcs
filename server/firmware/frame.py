#	Add path to import functions
import sys
import time
import os

sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), os.path.pardir))

MOTORS_PREFIX = 0x10  # Set all motors
GRIPPER_PREFIX = 0x94
MANIPULATOR_PREFIX = 0x84
FIRMWARE_VER_PREFIX = 0x99
POSTFIX = [0x0D, 0x0A]

class Frame():

    def firmware_ver(self):
        command = bytearray()
        command.append(FIRMWARE_VER_PREFIX)
        command.append(0x00)
        command.append(0x00)
        command.append(0x00)
        command.append(0x00)
        command.append(0x0D)
        command.append(0x0A)
        return command


    def motors(self, payload):
        command = bytearray()
        command.append(MOTORS_PREFIX)
        command.extend(payload)
        command.extend(POSTFIX)
        return command

    #	Read battery voltage (actualy, not the voltage but ADC reading)

    def battery(self):
        command = [0x30]
        command.append(0x00)
        command.append(0x00)
        command.append(0x00)
        command.append(0x00)
        command.append(0x0D)
        command.append(0x0A)
        return command

    #	Set servo values
    def gripper(self, payload):
        command = bytearray()
        command.append(GRIPPER_PREFIX)
        command.extend(payload)
        command.append(0x00)
        command.append(0x00)
        command.extend(POSTFIX)
        return command


    #	Set servo values
    def manipulator(self, payload):
        command = bytearray()
        command.append(MANIPULATOR_PREFIX)
        command.extend(payload)
        command.append(0x0D)
        command.append(0x0A)
        return command
