import asyncio
from aiohttp import web
import socketio
import hexdump
from log import logname
from firmware import Shield
from version import version_info
import os
import subprocess

logger = logname("sockets")

class WSnamespace(socketio.AsyncNamespace):
    def __init__(self, namespace='/sockets'):
        super().__init__(namespace)
        self.sio = None
        self.hw = Shield()

    async def on_connect(self, sid, environ):
        logger.info("connected %s", sid)
        await self.sio.emit('connected', {
            'tcs_ver' : version_info,
            'firmware_ver' : self.hw.getFirmwareVersion(),
            'wifi_dongle' : self.hw.getWirelessAdapterInfo(),
            'video_devices': self.hw.getCameraInfo()
        }, namespace="/sockets")


    async def on_motors(self, sid, payload):
        self.hw.setMotors(payload)
        await self.sio.emit('response', "motors set", namespace="/sockets")

    async def on_manipulator(self, sid, payload):
        self.hw.setManipulator(payload)
        await self.sio.emit('response', 'manipulator set', namespace="/sockets")

    async def on_gripper(self, sid, payload):
        self.hw.setGripper(payload)
        await self.sio.emit('response', 'gripper set', namespace="/sockets")

    async def on_telemetry(self, sid):
        await self.sio.emit('telemetry', {
            'temperature': self.hw.getTemperature(),
            'battery': self.hw.getBattery(),
            'signal': self.hw.getSignal()
        }, namespace="/sockets")

    async def on_shutdown(self, sid):
        subprocess.run(['poweroff'])


class WSserver():
    def __init__(self, app):
        super().__init__()
        self.sio = None
        self.app = app
        self.namespace = WSnamespace('/sockets')
    
    def start(self):
        self.sio = socketio.AsyncServer(async_mode='aiohttp')
        self.sio.register_namespace(self.namespace)
        self.namespace.sio = self.sio
        self.sio.attach(self.app)

