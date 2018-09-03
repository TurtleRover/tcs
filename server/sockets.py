import asyncio
from aiohttp import web
import socketio
import hexdump
from log import logname
import frame
from hardware import Hardware
from version import version_info
import os
from HTTPserver import HTTPserver

logger = logname("sockets")


# http_server = HTTPserver()
# http_server.start()
# app = http_server.app
sio = socketio.AsyncServer(async_mode='aiohttp')

hardware = Hardware()

class BaseSocketsNamespace(socketio.AsyncNamespace):

    async def on_connect(self, sid, environ):
        logger.info("connected %s", sid)
        await sio.emit('connected', {
            'tcs_ver' : version_info,
            'firmware_ver' : hardware.getFirmwareVersion(),
            'wifi_dongle' : hardware.getWirelessAdapterInfo(),
            'video_devices': hardware.getCameraInfo()
        }, namespace="/sockets")


    async def on_motors(self, sid, payload):
        hardware.setMotors(payload)
        await sio.emit('response', "motors set", namespace="/sockets")

    async def on_manipulator(self, sid, payload):
        hardware.setManipulator(payload)
        await sio.emit('response', 'manipulator set', namespace="/sockets")

    async def on_gripper(self, sid, payload):
        hardware.setGripper(payload)
        await sio.emit('response', 'gripper set', namespace="/sockets")

    async def on_battery(self, sid):
        battery_status =  hardware.getBattery()
        await sio.emit('battery', battery_status, namespace="/sockets")

    async def on_signal(self, sid):
        signal_strength =  hardware.getSignal()
        await sio.emit('signal', signal_strength, namespace="/sockets")

    async def on_temperature(self, sid):
        temperature =  hardware.getTemperature()
        await sio.emit('temperature', temperature, namespace="/sockets")

    async def on_system_shutdown(self, sid):
        os.system('poweroff') 
