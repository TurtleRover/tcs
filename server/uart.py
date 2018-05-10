#!/usr/bin/python3

import serial
import serial.tools.list_ports
from log import logname
from time import sleep
from threading import Thread
# from events import Events

logger = logname("uart")


class Uart(Thread):
    def __init__(self):
        Thread.__init__(self)
        self.daemon = True
        # self.events = Events()
        self.BAUD = 115200
        self.TIMEOUT = None
        self.serial = None
        self.port = "AMA"

    def run(self):
        return  self.waiter()

    def send(self, data):
        print ("serial", data)
        self.serial.write(data)

    def readline(self):
        try:
            return self.serial.readline()
        except serial.SerialException as e:
            logger.error(e)
            return 0

    def waiter(self):
        while self.serial is None:
            logger.info("Waiting for serial device")
            for port in self.available_ports():
                if self.port in port.name:
                    logger.info("Found device: %s %s",
                                port.name, port.manufacturer)
                    self.connect(port.device)
            sleep(2)

    def connect(self, device):
        try:
            self.serial = serial.Serial(
                device, baudrate=self.BAUD, timeout=self.TIMEOUT)
            # self.events.on_connected()
            logger.info("Connected")
        except serial.SerialException as e:
            logger.error(e)

    def available_ports(self):
        return serial.tools.list_ports.comports()

    def stop(self):
        self.join()
