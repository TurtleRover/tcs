'''
Created on Oct 18, 2017

@author: marcin
'''

import subprocess
import asyncio
import socket
import fcntl
import struct
from threading import Thread

from log import logname
logger = logname("signal")

class Signal(Thread):
    def __init__(self):
        Thread.__init__(self)
        self.daemon = True
        self.strength = 0
        self.MOVING_AVERAGE_LEN = 40
        self.LIST_DEFAULT_VAL = 1

        self.dots = self.fillList(self.MOVING_AVERAGE_LEN, self.LIST_DEFAULT_VAL)
        self.backspaces = self.fillList(self.MOVING_AVERAGE_LEN, self.LIST_DEFAULT_VAL)

        self.output_hex = hex(0x00)
        self.prev_output_hex = self.output_hex
        self.start_counting = False

        self.i = 0

        self.process = subprocess.Popen(['ping', '-i', '0.05', self.getIP(), '-f'], stdout=subprocess.PIPE)

    def getIP(self, ifname="wlan0"):
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        return socket.inet_ntoa(fcntl.ioctl(s.fileno(), 0x8915, struct.pack('256s', bytes(ifname[:15], 'utf-8')) )[20:24])

    def fillList(self, lenght, val):
        arr = []
        for self.i in range(lenght):
            arr.append(val)
        return arr

    def run(self):
        while True:
            output = self.process.stdout.read(1)
            if output.decode('utf-8') == '' and self.process.poll() is not None:
                break
            if output:
                self.prev_output_hex = self.output_hex
                self.output_hex = hex(ord(output))
                if self.output_hex == hex(0x08) and self.prev_output_hex == hex(0x2e):
                    self.backspaces.pop(0)
                    self.backspaces.append(1)
                elif self.output_hex == hex(0x2e):
                    if self.prev_output_hex == hex(0xa):
                        self.start_counting = True
                    if self.start_counting == True and self.prev_output_hex == hex(0x2e):
                        self.backspaces.pop(0)
                        self.backspaces.append(0)
                    if self.start_counting == True:
                        self.dots.pop(0)
                        self.dots.append(1)
                elif self.output_hex == hex(0xa):
                    self.start_counting = False

                self.i += 1

                if (self.i >= self.MOVING_AVERAGE_LEN):
                    self.strength = sum(self.backspaces) / sum(self.dots) * 100
                    # logger.debug("link quality: %d", self.strength)
                    self.i = 0
