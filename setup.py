from distutils.core import setup

setup(
	name="netman",
	version=".0101",
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
	package_data={
		'netman': ['netman/files/'],
	},
	
	data_files=[
		('/etc/init.d/',[
			'netman/files/init/netman-monitor',
			'netman/files/init/netman-model',
			]
		),
		('/var/www/netman/',[
			'netman/files/www/*'
			]
		),
		('/etc/',[
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
