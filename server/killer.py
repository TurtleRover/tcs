import subprocess
import os
import signal
import psutil
from log import logname

logger = logname()

def kill():
    logger.info('Checking for another server instances...')
    child = subprocess.Popen(
        ['pgrep', '-f', "server.py"], stdout=subprocess.PIPE, shell=False)
    pids = child.communicate()[0].split()
    for pid in pids:
        if int(pid) != os.getppid() and int(pid) != os.getpid():
            logger.warn("Killing...%s", int(pid))
            try:
                os.kill(int(pid), signal.SIGKILL)
            except psutil.NoSuchProcess:
                logger.info('No other server instance...')
