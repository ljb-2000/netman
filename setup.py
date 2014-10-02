from distutils.core import setup
import sys

__version__ = ".0107"


defaults = {
	'config_dir' : '/etc/',
	'www_dir' : '/var/www/netman/',
	'init_dir' : '/etc/init.d/',
	'sysconfig_dir' : '/etc/sysconfig/',
}

def accept(text):
	answer = raw_input(text)
	if "y" in answer:
		return True
	return False
def get(text):
	answer = raw_input("[%s]? " % text)
	if answer != "":
		return answer
	else:
		return text
def print_settings():
	'''prints settings'''
	for name,default in defaults.iteritems():
		print "%s=%s" % (name,default)

def netset():
	print '''Preparing to install...

Verify configuration options:
'''

	# check for defaults
	for name,default in defaults.iteritems():
		print name,
		defaults[name] = get(default)

	from os import path
	import shutil
	# check for previous config
	try:
		print defaults['config_dir']
		if path.isfile(defaults['config_dir'] + "netman.conf"):
			if accept("do you want to preserve your previous configuration[y/n]?"):
				dest = "/tmp"
				dest = get("backup to: [%s]?" % dest)
				try:
					shutil.copy(defaults['config_dir'] + "netman.conf",dest)
				except:
					print "Unable to copy file, please manually backup and try again."
					sys.exit()
	except:
		pass
	

if "install" in sys.argv:
	netset()

# ask to back up previous version if exists


setup(
	name="netman",
	version=__version__,
	description="network management framework",
	author="Micah Schaefer",
	author_email="micah@kulo.us",
	url = "none",
	packages=['netman'],
	scripts=[
		'netman-monitor',
		'netman-model',
		'netman-poller',
		'netman-logger',
	],
	long_description='',
	install_requires=[
		'pysnmp',
		'python-ping',
		'webpy',
		'gping',
		'ConfigParser'
	],
	# can't seem to get the data files into the distribution tar file yet
	data_files=[
		(defaults['init_dir'],[
			'netman/files/init/netman-monitor',
			'netman/files/init/netman-model',
			]
		),
		(defaults['www_dir'],[
			'netman/files/netman-www.zip'
			]
		),
		(defaults['config_dir'],[
			'netman/files/netman.conf'
			]
		),
		(defaults['sysconfig_dir'],[
			'netman/files/sysconfig/netman-model',
			'netman/files/sysconfig/netman-monitor',
			]
		),
	
	],
)

# files to be copied in

# netman/files/init/netman-mo* -> /etc/init.d/
# - init_dir directive can overide destination

# netman/files/www/* -> /var/www/netman-www.zip
# - web_dir directive can overide destination

# netman/files/netman.conf -> /etc
# - config_dir directive can overide destination
