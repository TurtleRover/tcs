import frame
from uart import Uart
from link_quality import Signal
import asyncio
import os

class Hardware():
    def __init__(self):
        self.uart = Uart()
        self.signal = Signal()

        self.uart.start()
        self.signal.start()

    def setMotors(self, payload):
        print (frame.motors(payload))
        self.uart.send(frame.motors(payload))

    def setManipulator(self, payload):
        print (frame.manipulator(payload))
        self.uart.send(frame.manipulator(payload))

    def setGripper(self, payload):
        print (frame.gripper(payload))
        self.uart.send(frame.gripper(payload))

    def setCameraPosition(self, payload):
        pass

    def setCameraParams(self, payload):
        pass

    def getBattery(self):
        self.uart.send(frame.battery())
        status = self.uart.serial.read(1)
        battery_status = int.from_bytes(status, byteorder='big', signed=False)
        return battery_status

    def getSignal(self):
        return self.signal.strength

    def getTemperature(self):
        f = os.popen('vcgencmd measure_temp | grep -ohP "=[0-9]*" | cut -c 2-')
        return f.read()
