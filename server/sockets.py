import asyncio
from aiohttp import web
import socketio
import hexdump
from log import logname
import frame
from hardware import Hardware
from version import version_info
import os

logger = logname("sockets")

SERVER_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.join( os.path.dirname( __file__ ), '..' )

sio = socketio.AsyncServer(async_mode='aiohttp')
app = web.Application()
sio.attach(app)

async def index(request):
    with open(PROJECT_DIR+'/client/dist/index.html') as f:
        return web.Response(text=f.read(), content_type='text/html')

app.router.add_get('/', index)
app.router.add_static('/', PROJECT_DIR+'/client/dist', show_index=True)

hardware = Hardware()

@sio.on('connect')
async def connect(sid, environ):
    logger.info("connected %s", sid)
    await sio.emit('connected', {
        'tcs_ver' : version_info,
        'firmware_ver' : hardware.getFirmwareVersion(),
        'wifi_dongle' : hardware.getWirelessAdapterInfo(),
        'video_devices': hardware.getCameraInfo()
    })


@sio.on('motors')
async def motors(sid, payload):
    hardware.setMotors(payload)
    await sio.emit('response', "motors set")

@sio.on('manipulator')
async def manipulator(sid, payload):
    hardware.setManipulator(payload)
    await sio.emit('response', 'manipulator set')

@sio.on('gripper')
async def gripper(sid, payload):
    hardware.setGripper(payload)
    await sio.emit('response', 'gripper set')

@sio.on('battery')
async def battery(sid):
    battery_status =  hardware.getBattery()
    await sio.emit('battery', battery_status)

@sio.on('signal')
async def signal(sid):
    signal_strength =  hardware.getSignal()
    await sio.emit('signal', signal_strength)

@sio.on('temperature')
async def temperature(sid):
    temperature =  hardware.getTemperature()
    await sio.emit('temperature', temperature)

@sio.on('shutdown')
async def system_shutdown(sid):
    os.system('poweroff') 
