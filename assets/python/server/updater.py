from github import Github
# import requests
import subprocess


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
        print(is_new_release)

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


updater = Updater()
updater.check()
