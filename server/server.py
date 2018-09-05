from killer import kill
from log import logname
import os
import argparse
import sys
from version import version_info
logger = logname()

def start_server():
    logger.info('Turtle Control Software v' + version_info)
    logger.info('[PID:%s PPID:%s]', os.getpid(), os.getppid())
    kill()
    logger.info('Starting new server instance...')
    try:
        from sockets import WSserver
        from http_server import HTTPserver

        http_server = HTTPserver()
        ws_server = WSserver(http_server.app)
        ws_server.start()
        http_server.start()
    except OSError as e:
        logger.error(e)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='This is the Turtle WebSocket Server.')
    parser.add_argument('-v', action='version', version=version_info,help='Show the version number and exit')
    parser.add_argument('start', nargs='?', help='Start the server')

    args = parser.parse_args()

    if args.start is None:
        start_server()
