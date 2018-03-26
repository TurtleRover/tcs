from sockets import web, app
from log import logname
import os
from instaces_checker import check_for_another_instances
logger = logname()

if __name__ == '__main__':
    logger.info('Starting Turtle Control System... [PID:%s PPID:%s]', os.getpid(), os.getppid())
    check_for_another_instances()
    
    logger.info('Starting new server instance...')
    web.run_app(app, host='0.0.0.0', port=5000)
