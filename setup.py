from distutils.core import setup
import os
defaults = {
	'config_dir' : '/etc/',
	'www_dir' : '/var/www/netman',
	'init_dir':'/etc/init.d',
}

def accept(text):
	answer = raw_input(text)
	if "y" in answer:
		return True
	return False
def get(text):
	answer = raw_input(text)
	if answer != "":
		return answer
	else:
		return text

def netset():
	# before setup run these checks
	
	# check for previous config
	try:
		os.path.isfile(defaults['config_dir'] + "netman.conf")
		if accept("do you want to preserve your previous configuration[y/n]?"):
			print "OK"
			configsave = True
			# copy old configuration 
		else:
			print "fine then"
	except:
		pass
	
	# check for defaults
	for name,default in defaults.iteritems():
		defaults[name] = get(name + "[" + default + "]?")


# ask to back up previous version if exists

__version__ = ".0102"

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
	package_data={
		'netman': ['netman/files/'],
	},
	
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
		(defaults['config_dir'],'/etc/netman/',[
			'netman/files/netman.conf'
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
