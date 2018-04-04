from killer import kill
from log import logname
import os

logger = logname()

if __name__ == '__main__':
    logger.info(
        'Starting Turtle Control System... [PID:%s PPID:%s]', os.getpid(), os.getppid())
    kill()

    logger.info('Starting new server instance...')
    # logger.info('Battery: %s', frame.readBatteryVoltage())
    try:
        from sockets import web, app
        import frame
        web.run_app(app, host='0.0.0.0', port=5000)
    except OSError as e:
        logger.error(e)
