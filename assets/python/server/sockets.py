import asyncio
from aiohttp import web
import socketio
import hexdump
from log import logname
from frame import updateMotors

logger = logname("sockets")

sio = socketio.AsyncServer(async_mode='aiohttp')
app = web.Application()
sio.attach(app)


@sio.on('connect')
async def connect(sid, environ):
    logger.info("connected %s", sid)


@sio.on('motors')
async def motors(sid, payload):
    if payload[0] == 0x10:
        received = updateMotors(payload[1], payload[2], payload[3], payload[4])
