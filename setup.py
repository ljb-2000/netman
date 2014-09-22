from distutils.core import setup

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
		('/etc/init.d/netman/',[
			'netman/files/init/netman-monitor',
			'netman/files/init/netman-model',
			]
		),
		('/var/www/',[
			'netman/files/netman-www.tar'
			]
		),
		('/etc/netman/',[
			'netman/files/netman.conf'
			]
		),
	
	],
)

# files to be copied in

# netman/files/init/netman-mo* -> /etc/init.d/
# - init_dir directive can overide destination

# netman/files/www/* -> /var/www/netman
# - web_dir directive can overide destination

# netman/files/netman.conf -> /etc
# - config_dir directive can overide destination
