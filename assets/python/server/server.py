#!/usr/bin/python3

###############################################################################
#
# The MIT License (MIT)
#
# Copyright (c) Tavendo GmbH
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#
###############################################################################

from autobahn.asyncio.websocket import WebSocketServerProtocol, \
    WebSocketServerFactory

#	Import Hardware Communication modules
import sys
import os
import hexdump
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from Hardware_Communication.turtleSerial import *
from Motor_Module.Motor_Module import *

class MyServerProtocol(WebSocketServerProtocol):

    def onConnect(self, request):
        print("Client connecting: {0}".format(request.peer))

    def onOpen(self):
        print("WebSocket connection open.")

	#	Messages received from JavaScript (client)
    def onMessage(self, payload, isBinary):
       # received = None;

        if isBinary:
            print("Binary message received from client: {0} bytes: ".format(len(payload)) + hexdump.dump(payload, sep=" "))
            
            try:
                if payload[0] == 0x10:
                    received = updateMotors(payload[1], payload[2], payload[3], payload[4])
                elif payload[0] == 0x30:
                    received = readBatteryVoltage()
                elif payload[0] == 0x40:
                    f = os.popen('iwconfig wlan1 | grep -i signal | grep -ohP "Signal level=[0-9]*" | grep -ohP "[0-9]*"')
                    signal = f.read()
                    signal = signal[:len(signal)-1]
                    received = [0x41, int(signal)]
                '''elif payload[0] == 0x84:
                    setNewServoPosition(payload[1], payload[2], payload[3])
                    result = [0x85, 0x00]
                    #   add CRC
                    received = buildCommand(result)'''

                print("Received from Motor Module: " + hexdump.dump(bytes(received), sep=" "))
            except OSError:
                received = None
                print("Communication error has occured")

        else:
            print("Text message received: {0}".format(payload.decode('utf8')))
        
        # echo back message verbatim
        if received != None:
            self.sendMessage(bytes(received), True)
        else:
            self.sendMessage(bytes(0x00), False)

    def onClose(self, wasClean, code, reason):
        print("WebSocket connection closed: {0}".format(reason))


if __name__ == '__main__':

    try:
        import asyncio
    except ImportError:
        # Trollius >= 0.3 was renamed
        import trollius as asyncio
	
    print("Working")
    factory = WebSocketServerFactory(u"ws://127.0.0.1:8080")
    factory.protocol = MyServerProtocol

    loop = asyncio.get_event_loop()
    coro = loop.create_server(factory, '0.0.0.0', 8080)
    server = loop.run_until_complete(coro)

    try:
        loop.run_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.close()
        loop.close()
