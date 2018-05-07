from github import Github
import requests
import subprocess
import os
import zipfile
from log import logname
import time
import shutil
logger = logname("Updater")


class Updater():
    def __init__(self):
        self.latest_version = (0, 0, 0)
        self.installed_version = (0, 0, 0)

        self.organization_name = "TurtleRover"
        self.repository_name = "Turtle-Rover-Mission-Control"

        self.root_directory = "/home/pi/" + self.repository_name
        self.updates_directory = "/home/pi/updates/"
        self.backups_directory = "/home/pi/backups/"

        self.github = Github()

    def check(self):
        logger.info('Checking for new releases...')
        latest_release = self.get_latest_release(self.repository_name)
        installed_version = self.get_installed_version()

        if latest_release:
            is_new_release = self.compare(latest_release.tag_name, installed_version)
        else:
            is_new_release = None
        # is_new_release = True
        if is_new_release == True:
            logger.info('Found a new release: %s', latest_release.tag_name)
            self.update(latest_release)
        elif is_new_release == False:
            logger.info('Installed version is up-to-date: %s', installed_version[:-1])
        else:
            logger.error("Can't get latest release. Probably no internet connection")

    def get_installed_version(self):
        return subprocess.run(['turtle', '-v'], stdout=subprocess.PIPE).stdout.decode('utf-8')

    def get_latest_release(self, repository_name):
        try:
            organization = self.github.get_organization(self.organization_name)
            repository = organization.get_repo(self.repository_name)
            latest_release = repository.get_latest_release()
            return latest_release
        except BaseException as e:
            logger.error(e)
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
            logger.warn("Installed version is ahead of released one.")
            return False

    def download(self, latest_release, path):
        self.create_updates_directory()
        logger.info('Starting download...')
        r = requests.get(latest_release.zipball_url, stream=True, allow_redirects=True)
        with open(path, 'wb') as f:
            for chunk in r.iter_content(chunk_size=1024):
                if chunk:
                    f.write(chunk)
        filesize = os.path.getsize(path)
        logger.info('Downloaded: %s', self.get_human_readable_size(filesize))
        return True

    def create_updates_directory(self):
        try:
            logger.debug('Creating "updates" directory')
            os.makedirs(self.updates_directory)
        except OSError as e:
            logger.debug(e)

    # https://stackoverflow.com/a/32009595/1589989
    def get_human_readable_size(self, size, precision=2):
        suffixes = ['B', 'KB', 'MB', 'GB', 'TB']
        suffixIndex = 0
        while size > 1024 and suffixIndex < 4:
            suffixIndex += 1  # increment the index of the suffix
            size = size / 1024.0  # apply the division
        return "%.*f%s" % (precision, size, suffixes[suffixIndex])

    def build_filename(self, tag_name):
        return self.repository_name +'-' + tag_name + ".zip"

    def unpack(self, path):
        extracted = None
        logger.info("Unzipping & installing update...")
        with zipfile.ZipFile(path,"r") as zip_ref:
            zip_ref.extractall("/tmp/")
            extracted = zip_ref.namelist()[0]

        subprocess.run(['cp', '-R', '/tmp/'+extracted + '.', '/home/pi/test/'])

    def pack(self):
        logger.info("Starting backup...")
        os.chdir(os.path.dirname(self.root_directory))
        self.clean_directory(self.backups_directory)
        backup_path = self.backups_directory + str(int(time.time())) + '.zip'
        # Check if it is ok to use here try/catch
        try:
            with zipfile.ZipFile(backup_path, "w", zipfile.ZIP_DEFLATED, allowZip64=True) as zf:
                for root, _, filenames in os.walk(os.path.basename(self.root_directory)):
                    for name in filenames:
                        name = os.path.join(root, name)
                        name = os.path.normpath(name)
                        zf.write(name, name)
            logger.info("Backup saved: %s", backup_path)
            return True
        except BaseException as e:
            logger.error(e)
            return False

    def update(self, latest_release):
        path = self.updates_directory + self.build_filename(latest_release.tag_name)
        if not os.path.isdir(self.root_directory+ '/.git'):
            if not os.path.isfile(path):
                self.download(latest_release, path)
            else:
                logger.info('Already downloaded to: ' + path)

            self.unpack(path)
            self.run_postinstall()

        else:
            logger.warn('This is a development environment. Please use git instead')

    # https://stackoverflow.com/a/185941/1589989
    def clean_directory(self, directory):
        for file in os.listdir(directory):
            path = os.path.join(directory, file)
            try:
                if os.path.isfile(path):
                    os.unlink(path)
                elif os.path.isdir(path): shutil.rmtree(path)
                return True
            except Exception as e:
                logger.error(e)
                return False

    def run_postinstall(self):
        logger.info("Spawning pip3...")
        pip = subprocess.run(['sudo', 'pip3', 'install', '-r', '/home/pi/Turtle-Rover-Mission-Control/requirements.txt'])



updater = Updater()
updater.check()
