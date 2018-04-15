# from github import Github
# import requests
import subprocess

# gh = Github()
#
# organization = gh.get_organization("TurtleRover")
# repository = organization.get_repo("Turtle-Rover-Mission-Control")
# latest = repository.get_latest_release()

# print (latest.tarball_url)

def get_current_release():
    return subprocess.run(['turtle', '-v'], stdout=subprocess.PIPE).stdout.decode('utf-8')
def convert_to_tuple(version):
    return (int(version[0]), int(version[2]), int(version[4]))


version = get_current_release()

print (convert_to_tuple(version))
# print (version)
