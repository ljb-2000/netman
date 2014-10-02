import ConfigParser
import time, sys, os, re
import web

web.config._hasPooling = False
web.config.debug = False
web.db.printing = False


class Config:
	'''Handles configuration reading and writing'''
	def __init__(self,cfg='/etc/netman.conf',**keywords):
		'''Config class'''
		self.config = ConfigParser.ConfigParser()
		self.config.read(cfg)
		# load default configuration options
		self.loaddefaults()
		
		# load configuration file options
		self.loadconfig()
	
		# load keyword options
		self.loadkeywords(keywords)
		
		# sanity checks here
		self.logdir = self.logdir.rstrip("/")
		self.logdir = self.defaults['logdir']

		self.tftproot = self.tftproot.rstrip("/")
		if not os.path.isdir(self.tftproot):
			self.tftproot = self.defaults['logdir']
		
	def loadkeywords(self,keywords):
		'''checks for option in keywords'''
		for i in keywords:
			if i in self.defaults:
				setattr(self,i,keywords[i])
	def loadconfig(self):
		'''checks for option in config file'''
		for i in self.defaults:
			try:
				setattr(self,i,self.config.get('global',i))
			except:
				pass

	def loaddefaults(self):
		'''checks for option in default list'''
		self.defaults = {
			'debug' : '0',
			'ipcheck' : '74.125.228.41',
			'dbn': 'mysql',
			'dbhost' : 'localhost',
			'dbuser' :'netman',
			'dbpasswd' : 'password', 
			'database' : 'netman',
			'logdir' : '/var/log',
			'mailfrom': 'netman@netman.us', 
			'sitename' :  'Netman' ,
			'siteurl' : 'http://demo.netman.us' ,
			'inetaddress' : '',
			'tftproot' : '/tftproot',
			'secret': 'somesecret85hf7"#9dh1',
		}
		for a,b in self.defaults.iteritems():
			setattr(self,a,b)
	def show(self):
		for i in self.defaults:
			print "%s : %s" % (i,getattr(self,i))
