#!/usr/bin/env python
from gevent import socket
import struct
import config
import event
import time, sys, os, re
from pysnmp.entity.rfc3413.oneliner import cmdgen
from pysnmp.proto import rfc1902
import pexpect
import glob,shutil,pwd,grp

SERVICE = "MODELER"

### To Do 
# the basic model factory is done
# work out commnand line switches and how 
# the program will actually be run
# gets snmp system information
# retrieves model functions and runs them , such as Interfaces, etc. 
# 
# need to add specific outgoing address if configured

# SNMP Constants
AuthProtocols = {
        'md5' : cmdgen.usmHMACMD5AuthProtocol,
        'sha' : cmdgen.usmHMACSHAAuthProtocol,
        ''    : cmdgen.usmNoAuthProtocol
}
PrivProtocols = {
        'des' : cmdgen.usmDESPrivProtocol,
        'aes128' : cmdgen.usmAesCfb128Protocol,
        '3des' : cmdgen.usm3DESEDEPrivProtocol,
        'aes192' : cmdgen.usmAesCfb192Protocol,
        'aes256' : cmdgen.usmAesCfb256Protocol,
        '' : cmdgen.usmNoPrivProtocol
}
debuglevel = 0


Config = config.Config()
db = config.web.database(dbn=Config.dbn,host=Config.dbhost,user=Config.dbuser,pw=Config.dbpasswd,db=Config.database)
def log(msg,level):
	'''logs messages'''
	if int(level) <= int(debuglevel):
		sys.stdout.write("[%s] %s[%s]: %s\n" % (time.ctime(),SERVICE,os.getpid(),msg))
		sys.stdout.flush()

def device(Device,**keywords):
	'''device modeler factory'''
	sql = "SELECT * FROM Devices WHERE Devices.Name='%s' OR Devices.Address=INET_ATON('%s')" % (Device,Device)
	dq = db.query(sql)
	if len(dq) < 1:
		log("No device: %s found!" % Device,0)
	else:
		# found device
		for i in dq:
			id = i['id']
			classid = i['Class']
			keywords['Name'] = i['Name']
		# get models
		sql = "SELECT * FROM Models WHERE Device='%s' OR Class='%s'" % (id,classid)
		m = db.query(sql)
		if len(m) > 0:
			# has models
			for model in m:
				Model = model['Name']
	try:
		# try keywords first
		dir(keywords['Model'])
		log("Starting %s modeler" % keywords['Model'],2)
		keywords['Modeller'] = keywords['Model']
		#return globals()[keywords['Model']](keywords)
		LOADME = keywords['Model']
	except:
		# if no keywords, go with assigned models
		try:
			dir(Model)
			log("Starting %s modeler" % Model,2)
			keywords['Modeller'] = Model
			#return globals()[Model](keywords)
			LOADME = Model
			
		except:
			# this would be where we use the generic model, or attempt to identify a more specific model
			log("Starting built-in generic modeler",2)
			keywords['Modeller'] = 'Generic'
			#return globals()['Device'](keywords)
			LOADME = 'Device'
		# load only one model
		return globals()[LOADME](keywords)

class Device:
	def __init__(self,keywords):
		'''default class initialization'''
		self.SSH_ENABLE_ALIVE = 0
		self.SSH_ALIVE = 0
		self.saved = 0
		# fix this below 
		self.pattr = ["SNMP_ENABLED","SNMP_VERSION","SNMP_READ_COMMUNITY","SNMP_WRITE_COMMUNITY","SNMP_USER","SNMP_AUTHTYPE","SNMP_PRIVTYPE","SNMP_AUTHKEY","SNMP_PRIVKEY","SNMP_TIMEOUT","SSH_ENABLE_PASSWD","SSH_TIMEOUT","SSH_USER","SSH_PASSWD","SSH_TIMEOUT","SSH_ENABLED","BACKUP_SCRIPT"]
		self.properties = []
		self.pd = 0
		self.attr = ['id','Name','Address','Make','Model','State','Layer','L2Domain','L3Domain','Serial','Contract','Location','Rack','Contact','AssetTag','FirstSeen','LastSeen','LastUp','LastDown','Alive','Class','SnmpName','SnmpLocation','SnmpContact','SnmpDescription','DnsName','SnmpAssetTag','SnmpSerial','SSH_ALIVE','SSH_ENABLE_ALIVE']
		self.Modeller = keywords['Modeller']

		# set blank attributes
		for i in self.attr:
			setattr(self,i,'')
		# set attributes from keywords
		for i in keywords:
			# has to be valid attribute
			if i in self.attr:
				setattr(self,i,keywords[i])
		# check for Device keyword which could be Name or Address
		try:
			self.Name = keywords['Device']
			self.Address = keywords['Device']
		except:
			pass
		if self.load():
		# Test SSH 
			self.SSH_ALIVE = 0
			self.SSH_ENABLE_ALIVE = 0
			if self.SSH_ENABLED:
				self.sshTest()
			if self.SSH_ALIVE and self.SSH_ENABLE_ALIVE:
				extensions = ['.doc','-running-config','-conf','-confg']
				lm = 0
				for ext in extensions:
					self.tftpfile = Config.tftproot + "/" + self.stripDomain(self.Name) + ext
					self.configfilename = self.stripDomain(self.Name) + ext
					try:
						(mode, ino, dev, nlink, uid, gid, size, atime, mtime, ctime) = os.stat(self.tftpfile)
						lm = int(mtime)
						break
					except:
						pass
						

				now = int(time.time())
				diff = now - lm
				# last modified is less than 12 hours
				if diff > 60 * 60 * 12:
					log("Backing up to %s" % self.tftpfile,1)
					self.sshConfigBackup()
					# should check again for last modified time of file
					try:
						(mode, ino, dev, nlink, uid, gid, size, atime, mtime, ctime) = os.stat(self.tftpfile)
						lm = int(mtime)
					except:
						m = 0
					if time.time() - lm > 60*60*12:
						log("Backup failed, file time is %s" % time.ctime(int(lm)),0)
					else:
						YEAR=time.strftime('%Y')
						MONTH=time.strftime('%B')
						DAY=time.strftime('%d')
						DAY_DIR=Config.tftproot + "/" + YEAR + '/' + MONTH + '/' + DAY
						newfile = Config.tftproot + "/" + YEAR + '/' + MONTH + '/' + DAY + "/" + self.configfilename

						if not os.path.exists(DAY_DIR):
        						log("creating directory %s" % DAY_DIR,1)
        						os.makedirs(DAY_DIR,0777)
							os.chown(DAY_DIR,pwd.getpwnam("nobody").pw_uid,grp.getgrnam("nobody").gr_gid)

						log("Copying %s to %s" % (self.tftpfile,newfile),1)
						if os.path.isfile(self.tftpfile):
							shutil.copy(self.tftpfile,newfile)
							os.chown(newfile,pwd.getpwnam("nobody").pw_uid,grp.getgrnam("nobody").gr_gid)
						else:
							log("File does not exist, not copying",1)
				
			if self.SNMP_ENABLED:
				if self.snmpinfo():
					try:
						self.run()
					except:
						log("general failure",0)
				else:
					log("snmpinfo failed",0)
					event.Event("%s is not responding to snmp at %s via snmp version %s" % (self.Name,self.ipAddress(self.Address),self.SNMP_VERSION),Address=self.Address,Source="NETMAN-MODEL",Tag="SNMP-FAIL",Severity=3)
			self.save()
			self.closedb()
			#return 1
		else:
			log("trouble loading device",0)
			self.closedb()
			#return 0
	def closedb(self):
		return True
		try:
			db.ctx.db.close()
		except:
			pass
			
	def waitPrompt(self,timeout=120):
		timeouter = timeout
		while True:
			try:
				prompt = self.shell.expect(['[>]','[#]','[?]','[[]?]','assword:','denied'],timeout=timeouter)
			except:
				log('Error in waitPrompt, probably timeout',1)
				return False
			if prompt == 0:
				return False
			if prompt == 1: 
				if self.SSH_ENABLE_ALIVE != 1:
					log("Priveleged Access",1)
				self.SSH_ENABLE_ALIVE = 1
				return False
			if prompt == 2:
				return False
			if prompt == 3:
				return False
			if prompt == 4:
				try:
					self.shell.sendline(self.SSH_ENABLE_PASSWD)
					self.waitPrompt()
					self.shell.sendline('\n')
					return True
				except:
					return False
			else:
				return True
			if prompt == 5:
				log('ACCESS DENIED',3)
	def ssh_login(self):
		#self.shell.sendline('\n')
		while True:
			prompt = self.shell.expect(['(yes/no)','assword:','[>]','[#]','[$]','@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @'])
			if prompt == 0:
				log('accepting rsa keys',2)
				self.shell.sendline('yes')
			if prompt == 1:
				log('sending ssh password',2)
				self.shell.sendline(self.SSH_PASSWD)
			if prompt == 2:
				try:
					log('Trying SSH ENABLE',1)
					log("SEND 'ena'",3)
					self.shell.sendline('enable')
					self.waitPrompt()
					return True
				except:
					log('FAILED OUT',1)
					return False
			if prompt == 3:
				self.SSH_ENABLE_ALIVE = 1
				log("Priveleged Access",1)
				return False
			if prompt == 4:
				return False
			if prompt == 5:
				log('SSH Key Change, deleting key file',0)
				try:
					tor = os.path.expanduser("~") + "/.ssh/known_hosts"
					os.remove(tor)
				except:
					pass
				return False
	def sshTest(self):
		try:
			# open a shell connection
			get_shell = 'ssh '+self.SSH_USER+'@'+ self.ipAddress(self.Address)
			self.shell = pexpect.spawn(get_shell)
			# Where the output goes
			if int(debuglevel) > 2:
				self.shell.logfile_read = sys.stdout
		except:
			log('Could not open SSH shell',1)
		try:
			self.ssh_login()
			log('SSH Successful login',1)
			self.SSH_ALIVE = 1
			return True
		except:
			log('Errors while logging in with SSH as %s:%s' % (self.SSH_USER,self.SSH_PASSWD),1)
			if debuglevel > 2:
				self.ssh_login()
			self.SSH_ALIVE = 0
			return False

	def getdeviceconfig(self):
		'''retrieves device configuration'''
		self.findparentclass(self.Class)
		#log('properties:',3)
		#log(self.properties,3)
		for i in self.pattr:
			setattr(self,i,"")
		for Class in reversed(self.properties):
			for Set in Class:
				#log(Class[Set],3)
				for Row in Class[Set]:
					for Name,Value in Row.iteritems():
						if Value != None:
							#log("%s=%s" % (Name,Value),3)
							setattr(self,Name,self.VarRep(Value))
		lc = db.select("LocalConfig",where="Device='%s'" % self.id)
		for device in lc:
			for property in self.pattr:
				if device[property] != "":
					setattr(self,property,self.VarRep(device[property]))
		if debuglevel > 1:
			log("Configuration:",0)
			self.printproperties()
	def stripDomain(self,string):
		return re.sub("\.[a-z|A-Z|0-9].+\.(com|edu|net|org|us|)$","",string)
	def printproperties(self):
		'''prints configured properties'''
		for i in self.pattr:
			log("%s=%s" % (i,getattr(self,i)),0)
	def findparentclass(self,child):
		'''Identifies parent class'''
		aas = []
		log("Looking up parent class of %s " % child,2)
		c = db.select("Classes",where="id='%s'" % child)
		for i in c:
			log("Name: %s id: %s Parent: %s" % (i['Name'],i['id'],i['Parent']),2)
			
			for p in self.pattr:
				aas.append({p:i[p]})
			self.properties.append({self.pd:aas})
			self.pd += 1
			if i['Parent'] > 0:
				self.findparentclass(i['Parent'])
		
		
		
	def snmpsetup(self):
		if not self.SNMP_ENABLED:
			return False
		'''creates AuthData attribute'''
		try:
			self.cmdGen = cmdgen.AsynCommandGenerator()
			mpm = 0
			log("snmp version %s" % self.SNMP_VERSION,3)
			if self.SNMP_AUTHTYPE in AuthProtocols:
			        self.AuthProto = AuthProtocols[self.SNMP_AUTHTYPE]
			else:
			        self.AuthProto = cmdgen.usmNoAuthProtocol
			if self.SNMP_PRIVTYPE in PrivProtocols:
			        self.PrivProto = PrivProtocols[self.SNMP_PRIVTYPE]
			else:
			        self.PrivProto = cmdgen.usmNoPrivProtocol
			if '3' in str(self.SNMP_VERSION):
        			self.AuthData = cmdgen.UsmUserData( self.SNMP_USER, authKey=self.SNMP_AUTHKEY, privKey=self.SNMP_PRIVKEY, authProtocol=self.AuthProto, privProtocol=self.PrivProto )
			else:
			        if '1' in str(self.SNMP_VERSION):
			                mpm = 0
			        elif '2' in str(self.SNMP_VERSION):
			                mpm = 1
			        self.AuthData = cmdgen.CommunityData(self.SNMP_READ_COMMUNITY,mpModel=mpm)	
			log("SNMP Auth Data:",3)
			log(self.AuthData,3)
			self.SnmpResult = {}
			return True
		except:
			raise
			return False


	def load(self):
		'''load information from data store'''
		# for now...
		# needs to come from device properties
		r = False

		if self.Name == '' and self.Address == '':
			log("A device Name or Address must be specified",0)
			sys.exit()
		sql = "SELECT * FROM Devices WHERE Name='%s' OR Address=INET_ATON('%s')" % (self.Name,self.Address)
		query = db.query(sql)
		# load device information from data store into object
		for device in query:
			r = True
			for i in device:
				setattr(self,i,getattr(device,(i)))
		log("%s loaded [model=%s]" % (self.Name,self.Modeller),1)
		self.getdeviceconfig()
		self.SnmpPort = '161'
		if self.SNMP_ENABLED:
			if not self.snmpsetup():
				log("Unable to setup SNMP for device, please verify configuration",0)
				self.printproperties()
				return False
		if r:
			return True
		else:
			return False
	def VarRep(self,findstring):
		'''Replaces variables in self properties'''
		try:
			int(findstring)
		except:
			findstring = re.sub("{HOST}",self.stripDomain(self.Name),findstring)
			findstring = re.sub("{ADDRESS}",self.ipAddress(self.Address),findstring)
		finally:
			return findstring
			
	def save(self):
		'''save information to data store'''
		sql = "UPDATE Devices SET "
		c = 0
		for i in self.attr:
			if getattr(self,i) is None:
				setattr(self,i,'')
		for i in self.attr:
			sql += "%s='%s'," % (i,getattr(self,i))
			c = c + 1
		if c < 1:
			sql += ","
		sql += "  LastModeled='%s' WHERE id='%s'" % (int(time.time()),self.id)
		log(sql,2)
		db.query(sql)
		log("All changes have been saved",1)
		self.saved = 1
	def sshConfigBackup(self):
		'''Runs commands to backup configuration'''
		log('Running ssh backup',1)
		self.shell.sendline('\n')
		self.shell.sendline('copy run start')
		self.shell.sendline('\n')
		self.waitPrompt()
		self.ssh(self.BACKUP_SCRIPT)
		self.shell.sendline('\n')
		self.waitPrompt()
		#self.shell.sendline('exit')

		
		

	def snmpget(self,varName):
		'''performs snmpget'''
		try:
			self.cmdGen.getCmd(self.AuthData, cmdgen.UdpTransportTarget((self.ipAddress(self.Address), self.SnmpPort)),(varName,),(self.snmpresult, None))
			self.cmdGen.snmpEngine.transportDispatcher.runDispatcher()
		except:
			log("snmpget failed for %s" % varName,1)
		return true
		
	def snmpset(self,**keywords):
		'''performs snmpset'''
	def snmpwalk(self,varName,**keywords):
		'''performs snmpwalk'''
		cmdGen = cmdgen.CommandGenerator()
		try:
			'3' not in self.SNMP_VERSION
			keywords['Community']
			log('Setting community to %s' % keywords['Community'],2)
			cmdgen.CommunityData(keywords['Community'],mpModel=1)
		except:
			pass
		try:
			keywords['Context']
			log("Setting context to '%s'" % keywords['Context'],2)
			errorIndication, errorStatus, errorIndex, varBindTable = cmdGen.nextCmd(
				self.AuthData,
				cmdgen.UdpTransportTarget(
					(self.ipAddress(self.Address),
					 self.SnmpPort)),
				varName,
				contextName=rfc1902.OctetString(keywords['Context'])
			)
		except:
			errorIndication, errorStatus, errorIndex, varBindTable = cmdGen.nextCmd(self.AuthData,cmdgen.UdpTransportTarget((self.ipAddress(self.Address), self.SnmpPort)),varName)

		if errorIndication:
			log((errorIndication),4)
			return
		else:
		    if errorStatus:
		        log(('%s at %s' % (errorStatus.prettyPrint(),errorIndex and varBindTable[-1][int(errorIndex)-1] or '?')),5)
			return
		    else:
			result = {}
		        for varBindTableRow in varBindTable:
		            for name, val in varBindTableRow:
		                log( ('%s = %s' % (name.prettyPrint(), val)),4)
				try:
					keywords['PrettyVal']
					result[name.prettyPrint()] = val.prettyPrint()
				except:
					result[name.prettyPrint()] = val
			return result

	def snmpresult(self,sendRequestHandle, errorIndication, errorStatus, errorIndex, varBinds, cbCtx):
		'''parses snmp results'''
		try:
        		if errorIndication:
        		        log((errorIndication),4)
        		        return
        		if errorStatus:
        		        log(('%s at %s' % (errorStatus.prettyPrint(),errorIndex and varBinds[int(errorIndex)-1] or '?')),4)
        		        return
        		for oid, val in varBinds:
        		        if val is not None:
        		                log(('%s = %s' % (oid.prettyPrint(), val)),4)
        		                #self.SnmpResult[oid.prettyPrint()] = val
					return {oid.prettyPrint(): val}
		except:
			log("snmpresult failed!",1)
	def cleanmac(self,mac):
		'''returns a clean mac address from any input format'''
		mac = mac.upper().strip()
		if re.search("([0-9|A-F]i+\:)+[0-9|A-F]i+",mac):
			macAddress =  mac
		elif re.search("([0-9|A-F]i+\-)+[0-9|A-F]i+",mac):
			macAddress = re.sub("\-",":",mac)
		elif re.search("([0-9|A-F]i+\.)[0-9|A-F]i+",mac):
			s = mac.replace(".","")
			macAddress = ':'.join([s[x:x+2] for x in xrange(0, len(s), 2)])
		elif re.search("0x",mac):
			s = mac.replace("0x","")
			macAddress = ':'.join([s[x:x+2] for x in xrange(0, len(s), 2)])
		elif re.search("0X",mac):
			s = mac.replace("0X","")
			macAddress = ':'.join([s[x:x+2] for x in xrange(0, len(s), 2)])
		else:
			macAddress = mac
		return macAddress
	def ipcheck(self,ip):
		'''checks string for valid ip address'''
	def ssh(self,action):
		'''performs remote ssh functions, against array 'action' '''
		try:
			# open a shell connection
			get_shell = 'ssh '+self.SSH_USER+'@'+ self.ipAddress(self.Address)
			self.shell = pexpect.spawn(get_shell)
			# Where the output goes
			if int(debuglevel) > 2:
				self.shell.logfile_read = sys.stdout
		except:
			log('Could not open SSH shell',1)
		try:
			self.ssh_login()
			log('SSH Successful login',1)
			for line in action.split('\n'):
				self.shell.sendline(line)
				self.waitPrompt()
			return True
		except:
			log('Errors while logging in with SSH as %s:%s' % (self.SSH_USER,self.SSH_PASSWD),1)

	def nslookup(self,Address):
		'''performs dns query'''
		try:
			return socket.gethostbyaddr(Address)[0].lower()
		except:
			return Address
	def log(self,message):
		'''logs message'''
	def history(self):
		'''logs history message in data store'''
	def run(self):
		'''override class for main functions'''
		return ""
	def snmpinfo(self):
		'''get snmp system information'''
		try:
			walk = self.snmpwalk('1.3.6.1.2.1.1')
		except:
			return False
		#self.snmpget('1.3.6.1.4.1.9.3.6.3.0')
		#self.snmpget('1.3.6.1.4.1.9.5.1.2.19.0')
		try:
			for name,value in walk.iteritems():
				if '1.3.6.1.2.1.1.1' in name:
					self.SnmpDescription = value
				elif '1.3.6.1.2.1.1.4' in name:
					self.SnmpContact = value
				elif '1.3.6.1.2.1.1.5' in name:
					self.SnmpName = value
				elif '1.3.6.1.2.1.1.6' in name:
					self.SnmpLocation = value
				elif '1.3.6.1.4.1.9.3.6.3' in name:
					self.SnmpAssetTag = value
				elif '1.3.6.1.4.1.9.5.1.2.19' in name:
					self.SnmpSerial = value
		except:
			return False

		self.DnsName = self.nslookup(self.ipAddress(self.Address))
		if self.SnmpName != '':
			if self.SnmpName != self.DnsName or self.SnmpName != self.Name or self.Name != self.DnsName:
				event.Event("Name mismatch: Configured: %s,DNS: %s, SNMP: %s" % (self.Name,self.DnsName,self.SnmpName),Address=self.Address,Source="NETMAN-MODEL",Tag="NAME-MISMATCH",Severity=3)
				#try:
				#except:
				#	log("Could not create Event",1)
		return True
				
	def ipAddress(self,Address):
		'''returns self.Address in ip address format'''
		if Address == '':
			return ''
		try:
			return socket.inet_ntoa(struct.pack("!I", Address))
		except:
			return Address
	def intAddress(self,Address):
		'''returns ip address in integer format'''
		if Address == '':
			return ''
		try:
			return struct.unpack("!I", socket.inet_aton(Address))[0]
		except:
			return Address
class Cisco(Device):
	'''Cisco devices'''
	SnmpSerialOid = '1.3.6.1.4.1.9.5.1.2.19'
	SnmpAssetTagOid = '1.3.6.1.4.1.9.3.6.3'
	def run(self):
		'''main functions'''
		#log("polling interfaces",1)
		#self.interfaceScan()
		#log("found %s interfaces" % len(self.interfaces),1)
		#log("polling vlans",1)
		#self.vlanScan()
		#log("found %s vlans" % len(self.vlans),1)
		#log("polling nodes",1)
		#self.nodeScan()
		#log("found %s nodes" % len(self.macs),1)
		return True
	def interfaceScan(self):
		'''Cisco MIBII Interfaces with Vlan'''
		self.interfaces = {}
		ifOper = {
			1 :' up',
			2 : 'down',
			3 : 'testing',
			4 : 'unknown',
			5 : 'dormant',
			6 : 'notPresent',
			7 : 'lowerLayerDown'
		}
		ifNames = {}
		ifStatus = {}
		ifDescr = {}
		vlans = {}
		voice = {}
		notify = {}
		ic = 0
		# Walk ifNames 
		p1 = self.snmpwalk('1.3.6.1.2.1.31.1.1.1.1')
		p2 = self.snmpwalk('1.3.6.1.2.1.2.2.1.8')
		p3 = self.snmpwalk('1.3.6.1.4.1.9.9.68.1.2.2.1.2')
		p4 = self.snmpwalk('1.3.6.1.2.1.31.1.1.1.18')
		p5 = self.snmpwalk('1.3.6.1.4.1.9.9.68.1.5.1.1.1')
		for oid,value in p1.iteritems():
			index = re.search("[0-9]+$",oid).group(0)
			ifNames[index] = value
		# Walk interface operational status
		for oid,value in p2.iteritems():
			index = re.search("[0-9]+$",oid).group(0)
			ifStatus[index] = value
		# Walk Cisco vmVlans
		for oid,value in p3.iteritems():
			index = re.search("[0-9]+$",oid).group(0)
			vlans[index] = value
		# Walk ifdescriptions
		for oid,value in p4.iteritems():
			index = re.search("[0-9]+$",oid).group(0)
			ifDescr[index] = value
		# Walk voice vlans
		for oid,value in p5.iteritems():
			index = re.search("[0-9]+$",oid).group(0)
			voice[index] = value
		# Correlate
		for oid, ifName in ifNames.iteritems():
			index = re.search("[0-9]+$",oid).group(0)
			# I want physical only
			if not re.match("[V[0-9]|Vl|EO|Nu|CPP|Voice|Foreign|SPAN|Span]",str(ifName)):
				try:
					int(voice[index]) < 4094
					voice[index] > 0
					if int(voice[index]) == 4096:
						voice[index] = ''
				except:
					voice[index] = ''
				try:
					int(vlans[index]) > 0
					
				except:
					vlans[index] = ''
				try:
					notify[index]
				except:
					notify[index] = 0
				try:
					ifDescr[index]
				except:
					ifDescr[index] = ''

				try:
					if ifStatus[index] == 1:
						last = 'LastUp'
					else:
						last = 'LastDown'	
				except:
					last = "LastDown"

				

				#log("%s %s %s %s %s" % (ifName,ifOper[ifStatus[index]],vlans[index],ifDescr[index],voice[index]),2)
				inter = db.select("Interfaces",where="Name='%s' AND Device='%s'" % (ifName,self.id))
				if len(inter) < 1:
					sql = "INSERT INTO Interfaces (Device,IfIndex,Name,Description,Vlan,MacNotify,VoiceVlan,FirstSeen,%s) VALUES('%s','%s','%s','%s','%s','%s','%s','%s','%s')" % (last,self.id,index,ifName,ifDescr[index],vlans[index],notify[index],voice[index],int(time.time()),int(time.time()))
				else:
					#check for update
					sql = "UPDATE Interfaces SET IfIndex='%s',Description='%s',Vlan='%s',MacNotify='%s',VoiceVlan='%s',%s='%s' WHERE Device='%s' AND Name='%s'" % (index,ifDescr[index],vlans[index],notify[index],voice[index],last,int(time.time()),self.id,ifName)
				# save on device fo
				self.interfaces[int(index)] = ifName
				log(sql,2)
				db.query(sql)

	def cdpScan(self):
		'''gathers cdp neighbor information and commits to store'''
	def entScan(self):
		'''gathers entity hardware information and commits to store'''
	def vlanScan(self):
		'''gathers vlans on device'''
		# poll vtpVlanState to identify vlans, or exit 
		# 1.3.6.1.4.1.9.9.46.1.3.1.1.2
		self.vlans = []
		v = self.snmpwalk('1.3.6.1.4.1.9.9.46.1.3.1.1.2')
		for oid,value in v.iteritems():
			index = re.search("[0-9]+$",oid).group(0)
			if int(index) not in range(1001,1024):
				self.vlans.append(index)
				log("Vlan: %s" % index,2)
				#context = "vlan-%s" % index
				#self.snmpwalk('1.3.6.1.2.1.17.4.3.1.2',Context=context)

	def nodeScan(self):
		'''gathers mac addresses of connected devices'''
		try:
			self.vlans
		except:
			self.vlanScan()
		try:
			self.interfaces
		except:
			self.interfaceScan()
		results = {}
		ifNames = {}
		bridges = {}
		indexes = {}
		trunks = {}
		found = 0
		ports = {}
		self.macs = {}
		# instead of polling vlans now, do it after interfaces and reuse that information

		# instead of polling ifnames, reuse from interfaces polling

		# poll vlanTrunkPortDynamicStatus for trunking state
		# 1.3.6.1.4.1.9.9.46.1.6.1.1.14
		
		p = self.snmpwalk('1.3.6.1.4.1.9.9.46.1.6.1.1.14')
		
		for oid,value in p.iteritems():
			index = re.search("[0-9]+$",oid).group(0)
			trunks[int(index)] = value
		for vlan in self.vlans:
			p = self.snmpwalk('1.3.6.1.2.1.17.4.3.1.2',Context='vlan-%s' % vlan)
			if p  is not None:
				pi = self.snmpwalk('1.3.6.1.2.1.17.1.4.1.2',Context='vlan-%s' % vlan)
				m = self.snmpwalk('1.3.6.1.2.1.17.4.3.1.1',Context='vlan-%s' % vlan,PrettyVal=True)
				# poll dot1dTpFdbPort for each vlan to identify bridge address
				for oid,value in p.iteritems():
					address = re.search("[0-9]+.[0-9]+.[0-9]+.[0-9]+.[0-9]+.[0-9]+$",oid).group(0)
					bridges[address] = value
					# gets an address of bridgeport to bridgeport reference mapping
				#poll bridgePort -> ifIndex mappings
				for oid,value in pi.iteritems():
					index = re.search("[0-9]+$",oid).group(0)
					indexes[int(index)] = int(value)
					# gets a bridgeport reference to ifindex mapping
				#print indexes
				# poll dot1dTpFdbAddress for mac addresses, which map to bridge port
				for oid,value in m.iteritems():
					bridge = re.search("[0-9]+.[0-9]+.[0-9]+.[0-9]+.[0-9]+.[0-9]+$",oid).group(0)
					# gets a bridge address to mac address mapping
					mac = self.cleanmac(value)
					#print "Bridge: %s" % bridge
					#print "Mac: %s" % mac
					try:
						bridgeport = bridges[bridge]
					except:
						continue
					try:
						ifindex = indexes[bridgeport]
					except:
						continue
					#print "BridgePort: %s " % bridgeport
					if bridgeport in indexes:
						ifindex = indexes[bridgeport]
						#print "IfIndex: %s" % ifindex
						#print self.interfaces[ifindex]
						# only care about non-trunking
						try:
							trunks[ifindex]
						except:
							trunks[ifindex] = 0

						if trunks[ifindex] == 2:
							try:
								self.macs[mac]
							except:
								self.macs[mac] = {}
							self.macs[mac] = {'ifname': self.interfaces[ifindex] ,'vlan' : vlan}
			else:
				log("%s unable to read context" % self.Name ,0)
				return False
		#print self.macs
		current = {}
		c = db.select("Nodes",where="Device='%s'" % self.id)
		for i in c:
			current[i.MacAddress] = {'ifname': i.Interface,'vlan': i.Vlan}
		for mac in self.macs:
		#	print mac
			ifname = self.macs[mac]['ifname']
		#	print ifname
			q = ''
			#for ifname in mac:
			vlan = int(self.macs[mac]['vlan'])
			# check against current nodes on device
			if len(current) > 0:
				if mac in current:
					if current[mac]['vlan'] == vlan:
						# simple update of timestamp
						q = "UPDATE Nodes SET LastSeen='{Now}'  WHERE Device='{Device}' AND MacAddress='{Mac}'".format(
							Now=int(time.time()),
							Device=self.id,
							Mac=mac
						)
					else:
						# update vlan
						q = "UPDATE Nodes SET LastSeen='{Now}',Vlan='{Vlan}'  WHERE Device='{Device}' AND MacAddress='{Mac}'".format(
							Now=int(time.time()),
							Device=self.id,
							Mac=mac,
							Vlan=vlan,
						)
				else:
					# insert
					q = "INSERT INTO Nodes (Device,Interface,Vlan,MacAddress,FirstSeen,LastSeen) VALUES('{Device}','{Interface}','{Vlan}','{Mac}','{Now}','{Now}')".format(
						Device=self.id,
						Interface=ifname,
						Vlan=vlan,
						Mac=mac,
						Now=int(time.time())
					)
			else:
				# insert
				q = "INSERT INTO Nodes (Device,Interface,Vlan,MacAddress,FirstSeen,LastSeen) VALUES('{Device}','{Interface}','{Vlan}','{Mac}','{Now}','{Now}')".format(
					Device=self.id,
					Interface=ifname,
					Vlan=vlan,
					Mac=mac,
					Now=int(time.time())
				)
				
			log(q,2)
			db.query(q)
		
			
		
		
		

class Juniper(Device):
	'''Juniper devices'''
	def run(self):
		'''main functions'''
		return " "

class Catalyst(Cisco):
	'''Cisco Catalyst devices'''
	def run(self):
		'''main functions'''

class Nexus(Cisco):
	'''Cisco Nexus devices'''
	def run(self):
		'''main functions'''

class Dell(Device):
	'''Dell Devices'''
	SnmpAssetTagOid = '1.3.6.1.4.1.674.10892.1.300.10.1.11'
