import smtplib
from email.mime.text import MIMEText as text
from gevent import socket
import struct
from config import web
import time, sys, os, re
import config

debuglevel = 0
class Event:
	'''Handles events'''
	def __init__(self,message,**keywords):
		'''Event Class
			Excepts some keyword identifier for the device
		Other Keywords: Source,Ack,Level
		ex. Event("This is the message",Source="SYSLOG",Address="1.1.1.1")
				'''
		self.config = config.Config()
		self.Message = message
		self.Subscribers = []
		self.id = ''

		try:
			self.Address = self.ipAddress(keywords['Address'])
		except:
			self.Address = ''
		try:
			self.Name = keywords['Name']
		except:
			self.Name = self.Hostname(self.Address)
		try:
			self.Severity = int(keywords['Severity'])
		except:
			self.Severity = 5
		try:
			self.Facility = keywords['Facility']
		except:
			self.Facility = ''
		try:
			self.Tag = keywords['Tag']
		except:
			self.Tag = ''
		try:
			self.Reported = self.timestamp(keywords['Reported'])
		except:
			self.Reported = int(time.time())
		self.LastSeen = self.Reported
		self.FirstSeen = self.Reported
		try:
			self.Status = keywords['Status']
		except:
			self.Status = 0

		try:
			self.Source = keywords['Source']
		except:
			self.Source = 'UNKNOWN'	
		try:
			self.MessageClear = keywords['MessageClear']
		except:
			self.MessageClear = ''
		try:
			self.TagClear = keywords['TagClear']
		except:
			self.TagClear = ''
		self.ClassId = '1'
		self.ClassName = '/'
		self.Layer = ''
		self.State = ''
		self.ClearedBy = ''
		if self.id == '' and self.Name == '' and self.Address == '':
			self.log("No device specified",0)
			sys.exit(0)
			
		web.config.debug=self.config.debug
		web.config._hasPooling = self.config.debug
		try:
			
			self.db = web.database(dbn=self.config.dbn,host=self.config.dbhost,user=self.config.dbuser,pw=self.config.dbpasswd,db=self.config.database)
			if not self.checkDevice():
				if self.Source != "NETMAN-MONITOR":
					self.addDevice()
			if not self.checkClear():
				self.checkTransform()
				if self.checkEvent():
					self.updateEvent()
				else:
				 	self.createEvent()
					if not self.maintenance():
						if self.checkSubscribers():
							self.log("sending notifications",1)
							self.sendNotify()
						else:
							self.log("no subscribers",1)
		finally:
				if self.db:
					self.db.ctx.db.close()
	def checkDevice(self):
		'''checks for existing device in database'''
		sql = "SELECT Devices.id,Devices.Name,Devices.Address,Devices.State,Devices.Layer,Classes.Name as ClassName,Devices.Class as ClassId FROM Devices LEFT JOIN Addresses ON (Devices.id=Addresses.Device) LEFT JOIN Classes ON (Devices.Class=Classes.id) WHERE Devices.Name='%s' OR Devices.Address='%s' OR Devices.id='%s' OR Addresses.Address='%s'" % (self.Name,self.intAddress(self.Address),self.id,self.intAddress(self.Address))
		query = self.db.query(sql)
		if len(query) > 0:
			for device in query:
				self.id = device.id
				self.Name = device.Name
				self.Address = self.ipAddress(device.Address)
				self.State = device.State
				self.ClassId = device.ClassId
				self.ClassName = device.ClassName
				self.Layer = device.Layer
			self.log("Device exists; name=%s" % self.Name,3)
			return True
				
		else:
			if self.Source == 'NETMAN-MONITOR':
				self.log("Not adding recently deleted device %s" % self.Name,0)
				sys.exit();
			self.log("device %s does not exist" % self.Name,0)
			return False
	def checkClear(self):
		'''Checks if this message should clear other message(s)'''
		if self.MessageClear == '' and self.TagClear == '':
			return False
		if self.MessageClear != '':
			sql = "SELECT * FROM Events WHERE Message REGEXP '{MessageClear}' AND Source='{Source}' AND Device='{Device}' AND Status < 3".format(MessageClear=self.MessageClear,Source=self.Source,Device=self.id)
		elif  self.TagClear != '':
			sql = "SELECT * FROM Events WHERE Tag REGEXP '{TagClear}' AND Source='{Source}' AND Device='{Device}' AND Status < 3".format(TagClear=self.TagClear,Source=self.Source,Device=self.id)
		query = self.db.query(sql)
		if len(query) > 0:
			# This message event becomes a Cleared By Message for each event that it clears
			self.ClearedBy = self.Message
			self.Status = 3
			for i in query:
				#self.ClearsMessage = i.Message
				self.Message = i.Message
				self.Eventid = i.id
				self.FirstSeen = i.FirstSeen
				self.LastSeen = i.LastSeen
					
				sql = "UPDATE Events SET Status='3',Cleared='{Stamp}',ClearedBy='{Message}' WHERE id='{EventId}'".format(Stamp=int(time.time()),Message=self.ClearedBy,EventId=self.Eventid)
				self.db.query(sql)
				if not self.maintenance():
					if self.checkSubscribers():
						self.log("Sending message clear notification",1)
						self.sendNotify()
					else:
						self.log("No subscribers to notify of message clearing",1)
			return True
		return False
	def checkTransform(self):
		'''transforms events'''
		# available transformations: drop, suppress
		sql = "SELECT * FROM Transformations WHERE ((('%s' REGEXP MessageFilter AND TagFilter IS NULL) OR ('%s' REGEXP TagFilter AND MessageFilter IS NULL)) OR ('%s' REGEXP MessageFilter AND '%s' REGEXP TagFilter)) AND Active='1' ORDER BY Action" % (self.Message,self.Tag,self.Message,self.Tag)
		query = self.db.query(sql)
		if len(query) > 0:
			for transform in query:
				# Action: 2 = Suppress
				if transform.Action == 2:
					self.Status = 2
					self.log("suppressing event from %s due to transformation" % self.Name,3)
				# Action: 1 = Drop
				elif transform.Action == 1:
					self.log("dropping event from %s due to transformation" % self.Name,3)
					sys.exit(0)
		return True
	def maintenance(self):
		'''checks for active maintenance of device'''
		sql = "SELECT * FROM Maintenance WHERE Device='%s' AND '%s' BETWEEN StartTime AND EndTime" % (self.id,int(time.time()))
		query = self.db.query(sql)
		if len(query) > 0:
			self.log("device is in maintenance mode",1)
			return True
		else:
			return False
	def addDevice(self):
		'''adds new device to database'''
		self.log("Adding device to database",1)
		self.id = self.db.insert("Devices",Name=self.Hostname(self.ipAddress(self.Address)),Address=self.intAddress(self.Address),FirstSeen=int(time.time()),LastSeen=int(time.time()),State='Discovered',Alive='2',Class='1',Monitor='1')
		self.db.insert("History",Message='Device %s created due to syslog reception.' % self.Name,User='0',TimeStamp=int(time.time()),Device=self.id)
	def checkEvent(self):
		'''checks for existing event'''
		#if self.Status == 3:
		#	return False
		sql = "SELECT * FROM Events WHERE Device='%s' AND Message='%s' AND Status < 3 ORDER BY LastSeen DESC LIMIT 0,1" % (self.id,self.Message)
		query = self.db.query(sql)
		if len(query) > 0:
			for event in query:
				self.Eventid = event.id
				self.FirstSeen = event.FirstSeen
			return True
		else:
			self.log("new event",1)
			return False
	def createEvent(self):
		'''creates new event'''
		self.Eventid = self.db.insert("Events",Device=self.id,Message=self.Message,Severity=self.Severity,Tag=self.Tag,Facility=self.Facility,Reported=self.Reported,FirstSeen=int(time.time()),LastSeen=int(time.time()),Status=self.Status,Count='1',Source=self.Source,User='0')
		if self.Eventid > 0:
			return True
		else:
			return False
	def updateEvent(self):
		'''updates current event'''
		sql = "UPDATE Events SET Count=Count + 1,LastSeen='%s' WHERE id='%s'" % (int(time.time()),self.Eventid)
		self.db.query(sql)
	def checkSubscribers(self):
		'''checks for subscribers of message'''
		# Removing ClearsMessage
		#if self.Status == 3:
		#	Message = self.ClearsMessage
		#else:
		Message = self.Message
		sql = "SELECT DISTINCT Users.Email FROM Subscriptions LEFT JOIN Users ON(Subscriptions.User=Users.id)  WHERE (Active='1') AND (((Device='{id}' OR Class='{ClassId}') AND ((Tag ='') AND (Filter ='') AND (Severity ='0'))) OR (('{Tag}' REGEXP Tag) AND((Device ='0') AND (Class ='0') AND (Filter ='') AND (Severity ='0'))) OR(('{Message}' REGEXP Filter) AND ((Device ='0') AND (Class ='0') AND (Tag ='') AND (Severity ='0'))) OR((Severity >='{Severity}') AND ((Device ='0') AND (Class ='0') AND (Tag ='') AND (Filter =''))) OR((Device='{id}' OR Class='{ClassId}') AND (('{Tag}' REGEXP Tag) AND('{Message}' REGEXP Filter) AND (Severity >='{Severity}'))) OR((Device='{id}' OR Class='{ClassId}') AND (('{Tag}' REGEXP Tag) AND (Filter ='') AND (Severity ='0'))) OR((Device='{id}' OR Class='{ClassId}') AND (('{Message}' REGEXP Filter) AND (Tag ='') AND (Severity ='0'))) OR((Device='{id}' OR Class='{ClassId}') AND ((Severity >='{Severity}') AND (Tag ='') AND (Filter =''))) OR((Device='{id}' OR Class='{ClassId}') AND (('{Tag}' REGEXP Tag) AND ('{Message}' REGEXP Filter) AND (Severity ='0'))) OR((Device='{id}' OR Class='{ClassId}') AND (('{Tag}' REGEXP Tag) AND (Severity >='{Severity}') AND (Filter =''))) OR((Device='{id}' OR Class='{ClassId}') AND (('{Message}' REGEXP Filter) AND (Severity >='{Severity}') AND (Tag =''))))".format(id=self.id,ClassId=self.ClassId,Tag=self.Tag,Message=Message,Severity=self.Severity)
		query = self.db.query(sql)
		if len(query) > 0:
			for user in query:
				self.Subscribers.append(user.Email)
			self.log("added users for message",1)
			return True
		else:
			return False
	def sendNotify(self):
		'''sends message to subscriber(s)'''
		subject = '[%s] %s'  % (self.Severity2Word(self.Severity),self.Name)
		if self.Status == 3:
			subject = "Clear: %s" % subject
		headers = "FROM: %s <%s>\r\n" % (self.config.sitename,self.config.mailfrom)
		headers += "Subject: %s \r\n" % (subject)
		headers += "MIME-Version: 1.0\r\n"
		headers += "Content-Type: text/html; charset=ISO-8859-1\r\n"
		Data = ''' 

Device
Name: {DeviceName}
Address: {DeviceAddress}
Class: {DeviceClassName}
Layer: {DeviceLayer}
Production State: {DeviceState}

Event
Event-id: {EventId}
Status: {EventStatus}
Severity: {EventSeverity}
Source: {EventSource}
Tag: {EventTag}
First Seen: {EventFirstSeen}
Last Seen: {EventLastSeen}

Message
{EventMessage}


'''.format(
	DeviceName=self.Name,
	DeviceAddress=self.ipAddress(self.Address),
	DeviceClassName=self.ClassName,
	DeviceLayer=self.Layer,
	DeviceState=self.State,
	EventId=self.Eventid,
	EventStatus=self.Status2Word(self.Status),
	EventSeverity=self.Severity2Word(self.Severity),
	EventSource=self.Source,
	EventTag=self.Tag,
	EventFirstSeen=time.ctime(self.FirstSeen),
	EventLastSeen=time.ctime(self.LastSeen),
	EventMessage=self.Message,
)
		if self.Status == 3:
			Data += "Cleared by: %s" % self.ClearedBy
		
		Msg = text(Data)
		Msg['Subject'] = subject
		Msg['From'] = "%s <%s>" % (self.config.sitename,self.config.mailfrom)
		try:
			s = smtplib.SMTP('localhost')
			s.sendmail(self.config.mailfrom,list(set(self.Subscribers)),Msg.as_string())
			s.quit()
			
		except:
			self.log("unable to send message",0)
	def log(self,msg,level):
		'''logs message'''
		#msg = msg[:95] + (msg[95:] and '..')
		if int(debuglevel) >= int(level):
			sys.stdout.write("[%s] events[%s]: %s\n" % (time.ctime(),os.getpid(),msg))
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
	def Hostname(self,Address):
		'''returns hostname or ip address if no hostname'''
		try:
			return socket.gethostbyaddr(Address)[0]
		except:
			return Address
	def timestamp(self,stamp):
		'''returns unix timestamp'''
		return stamp
	def Severity2Word(self,severity):
		'''Returns the word for matching severity level'''
		if severity < 2:
			return 'CRITICAL'
		elif severity == 2:
			return 'ERROR'
		elif severity == 3:
			return 'WARNING'
		elif severity == 4:
			return 'INFO'
		elif severity > 4:
			return 'DEBUG'
	def Status2Word(self,status):
		'''Returns the word for matching status level'''
		if status == 0:
			return 'NEW'
		elif status == 1:
			return 'SUPPRESSED'
		elif status == 2:
			return 'CLEAR'
