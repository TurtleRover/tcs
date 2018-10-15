from firmware.frame import Frame
from firmware.uart import Uart
from link_quality import Signal
import asyncio
import os
import pyudev
import glob

class Shield():
    def __init__(self):
        self.frame = Frame()

        self.uart = Uart()
        self.signal = Signal()

        self.uart.start()
        self.signal.start()

        self.context = pyudev.Context()

    def setMotors(self, payload):
        print (''.join(format(x, '02x') for x in self.frame.motors(payload)))
        self.uart.send(self.frame.motors(payload))

    def setManipulator(self, payload):
        print (self.frame.manipulator(payload))
        self.uart.send(self.frame.manipulator(payload))

    def setGripper(self, payload):
        print (self.frame.gripper(payload))
        self.uart.send(self.frame.gripper(payload))

    def getBattery(self):
        self.uart.send(self.frame.battery())
        status = self.uart.serial.read(1)
        battery_status = int.from_bytes(status, byteorder='big', signed=False)
        return battery_status

    def getSignal(self):
        return self.signal.strength

    def getTemperature(self):
        f = os.popen('vcgencmd measure_temp | grep -ohP "=[0-9]*" | cut -c 2-')
        return f.read()

    def getFirmwareVersion(self):
        print (self.frame.firmware_ver())
        return '0.0.0'
        # self.uart.send(frame.firmware_ver())
        # firmaware_version = self.uart.serial.read(5)
        # return int.from_bytes(firmaware_version, byteorder='big', signed=False)
        # return firmaware_version

    def getWirelessAdapterInfo(self):
        for device in self.context.list_devices(subsystem='net', DEVTYPE='wlan'):
            external_wlan_model = device.get('ID_MODEL_FROM_DATABASE')
            if external_wlan_model is not None:
                return external_wlan_model
        return None

    def getCameraInfo(self):
        return glob.glob("/dev/video*")