import asyncio
from aiohttp import web
import socketio
import hexdump
sio =  socketio.AsyncServer(async_mode='aiohttp',
                           engineio_logger=True,
                           logger=True)
app = web.Application()
sio.attach(app)


@sio.on('connect')
async def test_connect(sid, environ):
    print ("connect")


@sio.on('motors')
async def test_message(sid, payload):
    print(payload)
    if payload[0] == 0x10:
        print ("motors")
    if payload[0] == 0x30:
        print ("battery")


if __name__ == '__main__':
    # sio.start_background_task(background_task)
    web.run_app(app, host='0.0.0.0', port=5000)
