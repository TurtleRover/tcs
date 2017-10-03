from Hardware_Communication.turtleSerial import *
from Motor_Module.Motor_Module import *
import numpy as np
import time

MAX = 127
#   length in seconds, speed in percents
def move(speedRight, speedLeft, length) :
    for i in range(0, int(length*10)) :
        updateMotors(speedLeft, speedRight, speedLeft, speedRight)
        time.sleep(0.1)
    time.sleep(0.2)

def forward(length, speed) :
    speed = int(speed/100 * MAX)
    move(speed,speed,length)
    return

def backward(length, speed) :
    speed = np.uint8(speed/100 * MAX + 0b10000000)
    move(speed,speed,length)
    return

def right(length, speed) :
    speedRight = np.uint8(speed/100 * MAX + 0b10000000)
    speedLeft = np.uint8(speed/100 * MAX)
    move(speedRight, speedLeft, length)
    return

def left(length, speed) :
    speedLeft = np.uint8(speed/100 * MAX + 0b10000000)
    speedRight = np.uint8(speed/100 * MAX)
    move(speedRight, speedLeft, length)
    return