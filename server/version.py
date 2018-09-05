import json
import os

with open(os.path.join( os.path.dirname( __file__ ), '..' )+'/package.json') as f:
    data = json.load(f)

version_info = data["version"]
