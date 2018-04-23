# Create a logger object.
import logging
import coloredlogs
import os

os.environ['COLOREDLOGS_LOG_FORMAT'] ='%(asctime)s.%(msecs)03d %(name)s - %(message)s'
os.environ['COLOREDLOGS_DATE_FORMAT'] ='%H:%M:%S'

logging.getLogger("engineio").setLevel(logging.WARNING)
logging.getLogger("aiohttp").setLevel(logging.WARNING)
logging.getLogger("requests").setLevel(logging.WARNING)
logging.getLogger("github").setLevel(logging.WARNING)
logging.getLogger("urllib3").setLevel(logging.WARNING)
coloredlogs.install(level='DEBUG')

def logname(name='Turtle'):
    return logging.getLogger(name)

# Some examples.
# logger.debug("this is a debugging message")
# logger.info("this is an informational message")
# logger.warn("this is a warning message")
# logger.error("this is an error message")
# logger.critical("this is a critical message")
