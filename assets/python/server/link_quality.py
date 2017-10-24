'''
Created on Oct 18, 2017

@author: marcin
'''

import subprocess
import sys
import asyncio

MOVING_AVERAGE_LEN = 5
LIST_DEFAULT_VAL = 1

def fillList(lenght, val):
    arr = []
    for i in range(lenght):
        arr.append(val)
    
    return arr

@asyncio.coroutine
def pingToGetLinkQuality():
    process = subprocess.Popen(['ping', '-i', '0.2', '192.168.10.11', '-f'], stdout=subprocess.PIPE)
    
    #    Fill the moving average with 100 %
    dots = fillList(MOVING_AVERAGE_LEN, LIST_DEFAULT_VAL)
    backspaces = fillList(MOVING_AVERAGE_LEN, LIST_DEFAULT_VAL)
    
    output_hex = hex(0x00)
    prev_output_hex = output_hex
    start_counting = False
    
    i = 0
    
    while True:
        yield from asyncio.sleep(0)
        output = process.stdout.read(1)
        if output.decode('utf-8') == '' and process.poll() is not None:
            break
        if output:
            prev_output_hex = output_hex
            output_hex = hex(ord(output))
            if output_hex == hex(0x08) and prev_output_hex == hex(0x2e):
                backspaces.pop(0)
                backspaces.append(1)
            elif output_hex == hex(0x2e):
                if prev_output_hex == hex(0xa):
                    start_counting = True
                if start_counting == True and prev_output_hex == hex(0x2e):
                    backspaces.pop(0)
                    backspaces.append(0)
                if start_counting == True:
                    dots.pop(0)
                    dots.append(1)
            elif output_hex == hex(0xa):
                start_counting = False
            
            i += 1
                
            if (i >= 100):
                print("link quality: ", sum(backspaces) / sum(dots) * 100, " %")
                i = 0
        
    rc = process.poll()
    