from sockets import web, app
import subprocess
import os
import signal
import psutil
from log import logname

logger = logname()

if __name__ == '__main__':
    logger.info('Starting Turtle Control System... [PID:%s PPID:%s]', os.getpid(), os.getppid())
    logger.info('Checking for another server instances...')
    child = subprocess.Popen(['pgrep', '-f', "server.new.py"], stdout=subprocess.PIPE, shell=False)
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


    logger.info('Starting new server instance...')
    web.run_app(app, host='0.0.0.0', port=5000)
