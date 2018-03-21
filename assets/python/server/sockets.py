# from sockets import sockets
# from server.log import logger

import asyncio
import datetime
import random
import websockets

import socket
import fcntl
import struct

import logging
logger = logging.getLogger('websockets')
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())
# use network manager
def get_ip_address(ifname):
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    return socket.inet_ntoa(fcntl.ioctl(
        s.fileno(),
        0x8915,  # SIOCGIFADDR
        struct.pack('256s', bytes(ifname[:15], 'utf-8'))
    )[20:24])

async def time(websocket, path):
    while True:
        now = datetime.datetime.utcnow().isoformat() + 'Z'
        await websocket.send(now)
        await asyncio.sleep(random.random() * 3)

async def onConnect(self, request):
    print("Client connecting: {0}".format(request.peer))

async def onOpen(self):
    print("WebSocket connection open.")

start_server = websockets.serve(time, get_ip_address('wlan0'), 8080)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
