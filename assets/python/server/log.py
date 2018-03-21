# Create a logger object.
import logging
import coloredlogs
import os

os.environ['COLOREDLOGS_LOG_FORMAT'] ='%(asctime)s.%(msecs)03d %(name)s - %(message)s'
os.environ['COLOREDLOGS_DATE_FORMAT'] ='%H%M%S'

logger = logging.getLogger("SCSystem")
logging.getLogger("engineio").setLevel(logging.WARNING)
logging.getLogger("geventwebsocket").setLevel(logging.WARNING)

coloredlogs.install(level='DEBUG')

# Some examples.
# logger.debug("this is a debugging message")
# logger.info("this is an informational message")
# logger.warn("this is a warning message")
# logger.error("this is an error message")
# logger.critical("this is a critical message")
