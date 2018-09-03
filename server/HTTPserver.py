from Singleton import Singleton
from aiohttp import web
import os

class HTTPserver(metaclass=Singleton):
    def __init__(self):
        self.SERVER_DIR = os.path.dirname(os.path.abspath(__file__))
        self.PROJECT_DIR = os.path.join( os.path.dirname( __file__ ), '..' )
    
        self.app = web.Application()
        

    async def index(self, request):
        with open(self.PROJECT_DIR+'/client/dist/index.html') as f:
            return web.Response(text=f.read(), content_type='text/html')

    def start(self):
        self.app.router.add_get('/', self.index)
        self.app.router.add_static('/', self.PROJECT_DIR+'/client/dist', show_index=True)
        web.run_app(self.app, port=80)
