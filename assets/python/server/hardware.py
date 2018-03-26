import frame
import uart

class Hardware():
    def setMotors(self, payload):
        uart.send(frame.motors(payload))

    def setManipulator(self, payload):
        pass

    def setGripper(self, payload):
        pass

    def setCameraPosition(self, payload):
        pass

    def setCameraParams(self, payload):
        pass

    def getBattery(self, payload):
        pass

    def getTemperature(self, payload):
        pass
