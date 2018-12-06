import asyncio
from aiohttp import web
import socketio
import hexdump
from log import logname
from firmware import Shield
from system import System
from version import version_info

logger = logname("sockets")

class WSnamespace(socketio.AsyncNamespace):
    def __init__(self, namespace='/sockets'):
        super().__init__(namespace)
        self.sio = None
        self.shield = Shield()
        self.system = System()

    async def on_connect(self, sid, environ):
        logger.info("connected %s", sid)
        await self.sio.emit('connected', {
            'tcs_ver' : version_info,
            'firmware_ver' : self.shield.getFirmwareVersion(),
            'wifi_dongle' : self.system.getWirelessAdapterInfo(),
            'video_devices': self.system.getCameraInfo()
        }, namespace="/sockets")


    async def on_motors(self, sid, payload):
        self.shield.setMotors(payload)
        await self.sio.emit('response', "motors set", namespace="/sockets")

    async def on_manipulator(self, sid, payload):
        self.shield.setManipulator(payload)
        await self.sio.emit('response', 'manipulator set', namespace="/sockets")

    async def on_gripper(self, sid, payload):
        self.shield.setGripper(payload)
        await self.sio.emit('response', 'gripper set', namespace="/sockets")

    async def on_telemetry(self, sid):
        await self.sio.emit('telemetry', {
            'temperature': self.system.getTemperature(),
            'battery': self.shield.getBattery(),
            'signal': self.system.getSignal()
        }, namespace="/sockets")

    async def on_clupi(self, sid, payload):
        self.shield.setClupi(payload['angle'], payload['transl'])
        await self.sio.emit('response', 'clupi set', namespace="/sockets")


    async def on_shutdown(self, sid):
        self.system.shutdown()    
        
    async def on_reboot(self, sid):
        self.system.reboot()


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

