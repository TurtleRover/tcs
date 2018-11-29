from system.link_quality import Signal
import os
import pyudev
import re
import subprocess


class System():
    def __init__(self):
        self.context = pyudev.Context()
        self.signal = Signal()
        self.signal.start()

    def getSignal(self):
        return self.signal.strength

    def getTemperature(self):
        f = os.popen('vcgencmd measure_temp | grep -ohP "=[0-9]*" | cut -c 2-')
        return f.read()

    def getWirelessAdapterInfo(self):
        for device in self.context.list_devices(subsystem='net', DEVTYPE='wlan'):
            external_wlan_model = device.get('ID_MODEL_FROM_DATABASE')
            if external_wlan_model is not None:
                return external_wlan_model
        return None

    def getCameraInfo(self):
        try:
            output = subprocess.check_output("v4l2-ctl --list-devices 2>/dev/null", shell=True)
        except subprocess.CalledProcessError as e:
            output = e.output

        expr = r"(?P<model>.*) \(.*\):\n\t(?P<device>.*)"

        cameras = []

        for camera in re.finditer(expr, output.decode('utf-8')):
            cameras.append({
                    'model': camera.group('model'),
                    'device': camera.group('device')
                })

        return cameras

    def shutdown(self):
        subprocess.run(['poweroff'])