from github import Github
import requests
gh = Github()

organization = gh.get_organization("TurtleRover")
repository = organization.get_repo("Turtle-Rover-Mission-Control")
latest = repository.get_latest_release()

print (latest.tarball_url)
subprocess.call(["turtle", "-v"])
