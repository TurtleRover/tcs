from github import Github
import urllib2

gh = Github()

organization = gh.get_organization("PyGithub")
# organization = gh.get_organization("TurtleRover")
repository = organization.get_repo("PyGithub")
# repository = organization.get_repo("Turtle-Rover-Mission-Control")
latest = repository.get_latest_release()

print (latest.tarball_url)
