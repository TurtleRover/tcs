import asyncio
from aiohttp import web
import socketio
import hexdump
from log import logname
import frame
from hardware import Hardware
from version import version_info

logger = logname("sockets")

sio = socketio.AsyncServer(async_mode='aiohttp')
app = web.Application()
sio.attach(app)

hardware = Hardware()

@sio.on('connect')
async def connect(sid, environ):
    logger.info("connected %s", sid)
    await sio.emit('response', {
        'ws_server_ver' : version_info,
        'firmware_ver' : '0.0.0',
        'wifi_dongle' : 'Unavailable'
    })


@sio.on('motors')
async def motors(sid, payload):
    hardware.setMotors(payload)
    await sio.emit('response', "motors set")

@sio.on('manipulator')
async def motors(sid, payload):
    hardware.setManipulator(payload)
    await sio.emit('response', 'manipulator set')

@sio.on('gripper')
async def motors(sid, payload):
    hardware.setGripper(payload)
    await sio.emit('response', 'gripper set')

@sio.on('battery')
async def motors(sid):
    battery_status =  hardware.getBattery()
    await sio.emit('battery', battery_status)

@sio.on('signal')
async def signal(sid):
    signal_strength =  hardware.getSignal()
    await sio.emit('signal', signal_strength)

@sio.on('temperature')
async def signal(sid):
    temperature =  hardware.getTemperature()
    await sio.emit('temperature', temperature)

# TODO: symlink this
@sio.on('update')
async def signal(sid):
    subprocess.Popen(['python3', 'updater.py'])