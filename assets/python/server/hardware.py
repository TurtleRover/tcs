import frame
from uart import Uart


class Hardware():
    def __init__(self):
        self.uart = Uart()

        self.uart.start()

    def setMotors(self, payload):
        print (frame.motors(payload))
        self.uart.send(frame.motors(payload))

    def setManipulator(self, payload):
        pass

    def setGripper(self, payload):
        print (frame.gripper(payload))
        # self.uart.send(frame.gripper(payload))

    def setCameraPosition(self, payload):
        pass

    def setCameraParams(self, payload):
        pass

    def getBattery(self, payload):
        pass

    def getTemperature(self, payload):
        pass
