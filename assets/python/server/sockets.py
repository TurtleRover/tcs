import asyncio
from aiohttp import web
import socketio
import hexdump
from log import logname
import frame
from hardware import Hardware

logger = logname("sockets")

sio = socketio.AsyncServer(async_mode='aiohttp')
app = web.Application()
sio.attach(app)
hardware = Hardware()

@sio.on('connect')
async def connect(sid, environ):
    logger.info("connected %s", sid)


@sio.on('motors')
async def motors(sid, payload):
    hardware.setMotors(payload)
    await sio.emit('response', "motors set")

@sio.on('manipulator')
async def motors(sid, payload):
    print(payload)
    # if payload[0] == 0x84:
    #     setNewManiPosition(payload[1], payload[2], payload[3], payload[4])
    #     received = [0x85, 0x00]
    #     await sio.emit('response', received)

@sio.on('gripper')
async def motors(sid, payload):
    hardware.setGripper(payload)
    # if payload[0] == 0x94:
    #     setNewGripperPosition(payload[1], payload[2])
    #     received = [0x95, 0x00]
    #     await sio.emit('response', received)
