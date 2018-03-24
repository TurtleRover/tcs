import asyncio
from aiohttp import web
import socketio
import hexdump
from log import logname

logger = logname("sockets")

sio =  socketio.AsyncServer(async_mode='aiohttp')
app = web.Application()
sio.attach(app)


@sio.on('connect')
async def connect(sid, environ):
    logger.info("connected %s", sid)


@sio.on('motors')
async def test_message(sid, payload):
    print(payload)
    if payload[0] == 0x10:
        print ("motors")
    if payload[0] == 0x30:
        print ("battery")
