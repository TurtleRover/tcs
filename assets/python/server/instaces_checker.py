import subprocess
import os
import signal
import psutil
from log import logname

logger = logname()

def check_for_another_instances():
    logger.info('Checking for another server instances...')
    child = subprocess.Popen(
        ['pgrep', '-f', "server.new.py"], stdout=subprocess.PIPE, shell=False)
    pids = child.communicate()[0].split()
    for pid in pids:
        if int(pid) != os.getppid():
            parent = psutil.Process(int(pid))
            children = parent.children(recursive=True)
            for process in children:
                logger.warn("Killing...%s", int(pid))
                try:
                    process.kill()
                except psutil.NoSuchProcess:
                    logger.info('No another server instance...')
