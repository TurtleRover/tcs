from github import Github
import requests
import subprocess
import os

class Updater():
    def __init__(self):
        self.latest_version = (0, 0, 0)
        self.installed_version = (0, 0, 0)

        self.organization_name = "TurtleRover"
        self.repository_name = "Turtle-Rover-Mission-Control"

        self.github = Github()

    def check(self):
        latest_release = self.get_latest_release(self.repository_name)
        installed_version = self.get_installed_version()
        is_new_release = self.compare(latest_release.tag_name, installed_version)
        if True:
            self.download(latest_release.zipball_url)
        else:
            print("Up-to-date")

    def get_installed_version(self):
        return subprocess.run(['turtle', '-v'], stdout=subprocess.PIPE).stdout.decode('utf-8')

    def get_latest_release(self, repository_name):
        try:
            organization = self.github.get_organization(self.organization_name)
            repository = organization.get_repo(self.repository_name)
            latest_release = repository.get_latest_release()
            return latest_release
        except BaseException as e:
            print(e)
            return None

    def convert_to_tuple(self, version):
        return (int(version[0]), int(version[2]), int(version[4]))

    def compare(self, latest_version, installed_version):
        latest_version_tuple = self.convert_to_tuple(latest_version)
        installed_version_tuple = self.convert_to_tuple(installed_version)
        if latest_version_tuple > installed_version_tuple:
            return True
        elif latest_version_tuple == installed_version_tuple:
            return False
        else:
            print("Installed version is ahead of released one.")
            return False

    def download(self, url):
        directory = "/home/pi/updates/"
        filename = "turtle-server-"+ url.split('/')[-1] + ".zip"
        # setting parameter stream=True
        r = requests.get(url, stream=True, allow_redirects=True)
        self.create_updates_directory(directory)
        with open(directory + filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=1024):
                if chunk:
                    f.write(chunk)
        filesize = os.path.getsize(directory + filename)
        print(self.get_human_readable_size(filesize))
        return True
        
    def create_updates_directory(self, directory):
        try:
            os.makedirs(directory)
        except OSError as e:
            if e.errno != errno.EEXIST:
                raise

    # https://stackoverflow.com/a/32009595/1589989
    def get_human_readable_size(self, size, precision=2):
        suffixes=['B','KB','MB','GB','TB']
        suffixIndex = 0
        while size > 1024 and suffixIndex < 4:
            suffixIndex += 1 #increment the index of the suffix
            size = size/1024.0 #apply the division
        return "%.*f%s"%(precision,size,suffixes[suffixIndex])

updater = Updater()
updater.check()
