import asyncio
from aiohttp import web
import socketio
import hexdump
from log import logname
import frame
from Hardware_Communication.turtleSerial import *

logger = logname("sockets")

sio = socketio.AsyncServer(async_mode='aiohttp')
app = web.Application()
sio.attach(app)

@sio.on('connect')
async def connect(sid, environ):
    logger.info("connected %s", sid)


@sio.on('motors')
async def motors(sid, payload):
    received = frame.motors(payload)
    await sio.emit('response', received)

@sio.on('manipulator')
async def motors(sid, payload):
    if payload[0] == 0x84:
        setNewManiPosition(payload[1], payload[2], payload[3], payload[4])
        received = [0x85, 0x00]
        await sio.emit('response', received)

@sio.on('gripper')
async def motors(sid, payload):
    if payload[0] == 0x94:
        setNewGripperPosition(payload[1], payload[2])
        received = [0x95, 0x00]
        await sio.emit('response', received)
