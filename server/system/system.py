from system.link_quality import Signal
import os
import glob
import pyudev
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
        return glob.glob("/dev/video*")

    def shutdown(self):
        subprocess.run(['poweroff'])