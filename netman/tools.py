import ping as pong
import pexpect
from gevent import socket
import time, sys, os, re

def ping(ip,retry=3,timeout=2,pkt_size=10):
	for x in range(int(retry)):
		try:
			if pong.do_one(ip,int(timeout),int(pkt_size)):
				return True
		except IOError,e:
			return False
		except:
			return False
	return False
def sshTest(ip):
	try:
		child = pexpect.spawn('ssh -l user %s'% ip,timeout=7)
		i = child.expect([pexpect.TIMEOUT, SSH_NEWKEY,'assword',COMMAND_PROMPT])
		if i > 0:
			return True
		else:
			return False
	except:
		return False
def host(host):
	try:
		# Try by IP Address
		ip = re.search("[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$",host).group(0)	
		h = socket.gethostbyaddr(ip)
		return h[0].strip()
	except:
		try:
			#Try by hostname
			ip = socket.gethostbyname(host)
			return ip.strip()
			
		except:
			return None
