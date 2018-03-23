from flask_socketio import emit
from server.new import socketio

@socketio.on('connection')
def connection():
    print("CONNECT")
