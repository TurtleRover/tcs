from firmware.frame import Frame
from firmware.uart import Uart
import asyncio

class Shield():
    def __init__(self):
        self.frame = Frame()

        self.uart = Uart()
        self.uart.start()

    def setMotors(self, payload):
        self.uart.send(self.frame.motors(payload))

    def setManipulator(self, payload):
        self.uart.send(self.frame.manipulator(payload))

    def setGripper(self, payload):
        self.uart.send(self.frame.gripper(payload))

    def getBattery(self):
        self.uart.send(self.frame.battery())
        status = self.uart.serial.read(1)
        battery_status = int.from_bytes(status, byteorder='big', signed=False)
        return battery_status


    def getFirmwareVersion(self):
        print (self.frame.firmware_ver())
        return '0.0.0'
        # self.uart.send(frame.firmware_ver())
        # firmaware_version = self.uart.serial.read(5)
        # return int.from_bytes(firmaware_version, byteorder='big', signed=False)
        # return firmaware_version