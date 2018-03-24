from sockets import web, app

if __name__ == '__main__':
    # sio.start_background_task(background_task)
    web.run_app(app, host='0.0.0.0', port=5000)
