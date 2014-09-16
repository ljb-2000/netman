from distutils.core import setup

setup(
	name="netman",
	version=".01",
	description="network management framework",
	author="Micah Schaefer",
	author_email="micah@kulo.us",
	url = "none",
	packages=['netman'],
	#package_data=[],
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
)

# files to be copied in

# netman/files/init/netman-mo* -> /etc/init.d/
# - init_dir directive can overide destination

# netman/files/www/* -> /var/www/netman
# - web_dir directive can overide destination

# netman/files/netman.conf -> /etc
# - config_dir directive can overide destination
