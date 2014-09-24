##################################
# netman mysql table creation #
##################################

DROP TABLE IF EXISTS `Addresses`;

CREATE TABLE `Addresses` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Device` int(11) DEFAULT NULL,
  `Address` int(15) unsigned DEFAULT NULL,
  `FirstSeen` int(30) DEFAULT NULL,
  `LastSeen` int(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Arp`;

CREATE TABLE `Arp` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Device` int(11) DEFAULT NULL,
  `MacAddress` varchar(80) DEFAULT NULL,
  `Address` int(15) unsigned DEFAULT NULL,
  `Name` varchar(80) DEFAULT NULL,
  `FirstSeen` int(15) DEFAULT NULL,
  `LastSeen` int(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Bookmarks`;

CREATE TABLE `Bookmarks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Type` varchar(80) DEFAULT NULL,
  `ObjectId` int(11) DEFAULT NULL,
  `User` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Classes`;

CREATE TABLE `Classes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `Parent` int(4) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `SNMP_ENABLED` int(1) DEFAULT NULL,
  `SNMP_VERSION` int(11) DEFAULT NULL,
  `SNMP_READ_COMMUNITY` varchar(80) DEFAULT NULL,
  `SNMP_WRITE_COMMUNITY` varchar(80) DEFAULT NULL,
  `SNMP_USER` varchar(80) DEFAULT NULL,
  `SNMP_PASSWD` varchar(80) DEFAULT NULL,
  `SNMP_AUTHTYPE` varchar(80) DEFAULT NULL,
  `SNMP_PRIVTYPE` varchar(80) DEFAULT NULL,
  `SNMP_AUTHKEY` varchar(80) DEFAULT NULL,
  `SNMP_PRIVKEY` varchar(80) DEFAULT NULL,
  `SNMP_TIMEOUT` int(11) DEFAULT NULL,
  `SSH_ENABLED` int(1) DEFAULT NULL,
  `SSH_USER` varchar(80) DEFAULT NULL,
  `SSH_PASSWD` varchar(80) DEFAULT NULL,
  `SSH_ENABLE_PASSWD` varchar(80) DEFAULT NULL,
  `SSH_TIMEOUT` int(11) DEFAULT NULL,
  `BACKUP_SCRIPT` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Comments`;

CREATE TABLE `Comments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `User` int(4) DEFAULT NULL,
  `UserComment` varchar(500) DEFAULT NULL,
  `UserCommentStamp` int(15) DEFAULT NULL,
  `Device` int(4) DEFAULT NULL,
  `Vlan` int(4) DEFAULT NULL,
  `Link` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `DataSources`;

CREATE TABLE `DataSources` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Device` int(30) DEFAULT NULL,
  `Name` varchar(300) DEFAULT NULL,
  `Path` varchar(300) DEFAULT NULL,
  `Method` varchar(80) DEFAULT '',
  `OID` varchar(300) DEFAULT NULL,
  `Indexed` int(1) DEFAULT NULL,
  `MinimumValue` int(80) DEFAULT NULL,
  `MaximumValue` int(80) DEFAULT NULL,
  `Type` varchar(80) DEFAULT NULL,
  `FirstSeen` int(15) DEFAULT NULL,
  `LastSeen` int(15) DEFAULT NULL,
  `Interval` int(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `DeviceComponents`;

CREATE TABLE `DeviceComponents` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Class` int(11) DEFAULT NULL,
  `Parent` int(11) DEFAULT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Leaf` varchar(30) DEFAULT NULL,
  `Loaded` varchar(30) DEFAULT NULL,
  `Xtype` varchar(30) DEFAULT NULL,
  `Active` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Devices`;

CREATE TABLE `Devices` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(80) DEFAULT NULL,
  `Make` varchar(80) DEFAULT NULL,
  `Model` varchar(80) DEFAULT NULL,
  `Address` int(15) unsigned DEFAULT NULL,
  `Parent` int(4) DEFAULT NULL,
  `State` varchar(30) DEFAULT NULL,
  `Layer` varchar(80) DEFAULT NULL,
  `L2Domain` varchar(80) DEFAULT NULL,
  `L3Domain` varchar(80) DEFAULT NULL,
  `Serial` varchar(50) DEFAULT NULL,
  `Contract` varchar(80) DEFAULT NULL,
  `Location` varchar(80) DEFAULT NULL,
  `Rack` varchar(30) DEFAULT NULL,
  `Contact` varchar(80) DEFAULT NULL,
  `AssetTag` varchar(50) DEFAULT NULL,
  `FirstSeen` int(15) DEFAULT NULL,
  `LastSeen` int(15) DEFAULT NULL,
  `LastUp` int(15) DEFAULT NULL,
  `LastDown` int(15) DEFAULT NULL,
  `LastModeled` int(15) DEFAULT NULL,
  `Alive` int(1) DEFAULT NULL,
  `SSH_ALIVE` int(1) DEFAULT NULL,
  `SSH_ENABLE_ALIVE` int(1) DEFAULT NULL,
  `Monitor` int(1) DEFAULT NULL,
  `Class` int(4) DEFAULT NULL,
  `SnmpName` varchar(150) DEFAULT NULL,
  `SnmpLocation` varchar(150) DEFAULT NULL,
  `SnmpContact` varchar(150) DEFAULT NULL,
  `SnmpDescription` varchar(1500) DEFAULT NULL,
  `SnmpAssetTag` varchar(150) DEFAULT NULL,
  `SnmpSerial` varchar(150) DEFAULT NULL,
  `DnsName` varchar(150) DEFAULT NULL,
  `NewAlive` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `EntPhysicalEntry`;

CREATE TABLE `EntPhysicalEntry` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Device` int(11) DEFAULT NULL,
  `FirstSeen` int(30) DEFAULT NULL,
  `LastSeen` int(30) DEFAULT NULL,
  `EntPhysicalIndex` int(50) DEFAULT NULL,
  `EntPhysicalDescr` varchar(1000) DEFAULT NULL,
  `EntPhysicalVendorType` varchar(50) DEFAULT NULL,
  `EntPhysicalContainedIn` int(50) DEFAULT NULL,
  `EntPhysicalClass` int(2) DEFAULT NULL,
  `EntPhysicalParentRelPos` int(32) DEFAULT NULL,
  `EntPhysicalName` varchar(1000) DEFAULT NULL,
  `EntPhysicalHardwareRev` varchar(1000) DEFAULT NULL,
  `EntPhysicalFirmwareRev` varchar(1000) DEFAULT NULL,
  `EntPhysicalSoftwareRev` varchar(1000) DEFAULT NULL,
  `EntPhysicalSerialNum` varchar(1000) DEFAULT NULL,
  `EntPhysicalMfgName` varchar(1000) DEFAULT NULL,
  `EntPhysicalModelName` varchar(1000) DEFAULT NULL,
  `EntPhysicalAlias` varchar(1000) DEFAULT NULL,
  `EntPhysicalAssetID` varchar(1000) DEFAULT NULL,
  `EntPhysicallsFRU` int(1) DEFAULT NULL COMMENT '1 = true, 2 = false',
  `EntPhysicalMfgDate` varchar(30) DEFAULT NULL,
  `EntPhysicalUris` varchar(255) DEFAULT NULL COMMENT 'RFC 3986',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Events`;

CREATE TABLE `Events` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Device` int(11) DEFAULT NULL,
  `Message` varchar(500) DEFAULT NULL,
  `Severity` int(11) DEFAULT NULL,
  `Facility` varchar(80) DEFAULT NULL,
  `Tag` varchar(80) DEFAULT NULL,
  `Reported` int(15) DEFAULT NULL,
  `FirstSeen` int(15) DEFAULT NULL,
  `LastSeen` int(15) DEFAULT NULL,
  `Cleared` int(15) DEFAULT NULL,
  `ClearedBy` varchar(500) DEFAULT NULL,
  `Status` int(2) DEFAULT NULL,
  `Count` int(5) DEFAULT NULL,
  `User` int(4) DEFAULT NULL,
  `UserComment` varchar(500) DEFAULT NULL,
  `UserCommentStamp` int(15) DEFAULT NULL,
  `Source` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Message` (`Message`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Graphs`;

CREATE TABLE `Graphs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Device` int(11) DEFAULT NULL,
  `DataSource` int(100) DEFAULT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `GroupRoles`;

CREATE TABLE `GroupRoles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Groupid` int(11) DEFAULT NULL,
  `Role` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Groups`;

CREATE TABLE `Groups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `Description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Help`;

CREATE TABLE `Help` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Parent` int(4) DEFAULT NULL,
  `Topic` varchar(30) DEFAULT '',
  `MetaData` varchar(500) DEFAULT NULL,
  `Content` varchar(10000) DEFAULT NULL,
  `Nav` int(1) DEFAULT NULL,
  `TimeStamp` int(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `History`;

CREATE TABLE `History` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Message` varchar(10000) DEFAULT NULL,
  `User` int(4) DEFAULT NULL,
  `TimeStamp` int(15) DEFAULT NULL,
  `Device` int(4) DEFAULT NULL,
  `Vlan` int(4) DEFAULT NULL,
  `Link` int(4) DEFAULT NULL,
  `Class` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Interfaces`;

CREATE TABLE `Interfaces` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Device` int(11) DEFAULT NULL,
  `IfIndex` int(11) DEFAULT NULL,
  `Name` varchar(80) DEFAULT NULL,
  `Description` varchar(300) DEFAULT NULL,
  `Location` varchar(80) DEFAULT NULL,
  `Cable` varchar(80) DEFAULT NULL,
  `Vlan` varchar(5) DEFAULT NULL,
  `MacNotify` int(1) DEFAULT NULL,
  `VoiceVlan` varchar(5) DEFAULT NULL,
  `User` int(4) DEFAULT NULL,
  `UserComment` varchar(300) DEFAULT NULL,
  `UserCommentStamp` int(15) DEFAULT NULL,
  `FirstSeen` int(15) DEFAULT NULL,
  `LastUp` int(15) DEFAULT NULL,
  `LastDown` int(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `LinkParts`;

CREATE TABLE `LinkParts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Link` varchar(30) DEFAULT NULL,
  `Sequence` int(4) DEFAULT NULL,
  `Room1` varchar(30) DEFAULT NULL,
  `Rack1` varchar(30) DEFAULT NULL,
  `Fxp1` varchar(30) DEFAULT NULL,
  `Pair1a` varchar(30) DEFAULT NULL,
  `Pair1b` varchar(30) DEFAULT NULL,
  `Room2` varchar(30) DEFAULT NULL,
  `Rack2` varchar(30) DEFAULT NULL,
  `Fxp2` varchar(30) DEFAULT NULL,
  `Pair2a` varchar(30) DEFAULT NULL,
  `Pair2b` varchar(30) DEFAULT NULL,
  `Length1` varchar(30) DEFAULT NULL,
  `Length2` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Links`;

CREATE TABLE `Links` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(30) DEFAULT NULL,
  `Status` int(1) DEFAULT NULL,
  `User` varchar(50) DEFAULT NULL,
  `Requestor` varchar(50) DEFAULT NULL,
  `CreatedStamp` int(15) DEFAULT NULL,
  `Type` varchar(30) DEFAULT NULL,
  `Function` varchar(30) DEFAULT NULL,
  `WaveLength` varchar(30) DEFAULT NULL,
  `Room1` varchar(50) DEFAULT NULL,
  `Rack1` varchar(50) DEFAULT NULL,
  `Device1` varchar(80) DEFAULT NULL,
  `Port1` varchar(30) DEFAULT NULL,
  `Room2` varchar(30) DEFAULT NULL,
  `Rack2` varchar(30) DEFAULT NULL,
  `Device2` varchar(80) DEFAULT NULL,
  `Port2` varchar(30) DEFAULT NULL,
  `Classification` varchar(30) DEFAULT NULL,
  `Encryption` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `LocalConfig`;

CREATE TABLE `LocalConfig` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Device` int(11) DEFAULT NULL,
  `SNMP_ENABLED` int(1) DEFAULT NULL,
  `SNMP_VERSION` int(11) DEFAULT NULL,
  `SNMP_READ_COMMUNITY` varchar(80) DEFAULT NULL,
  `SNMP_WRITE_COMMUNITY` varchar(80) DEFAULT NULL,
  `SNMP_USER` varchar(80) DEFAULT NULL,
  `SNMP_PASSWD` varchar(80) DEFAULT NULL,
  `SNMP_AUTHTYPE` varchar(80) DEFAULT NULL,
  `SNMP_PRIVTYPE` varchar(80) DEFAULT NULL,
  `SNMP_AUTHKEY` varchar(80) DEFAULT NULL,
  `SNMP_PRIVKEY` varchar(80) DEFAULT NULL,
  `SNMP_TIMEOUT` int(11) DEFAULT NULL,
  `SSH_ENABLED` int(1) DEFAULT NULL,
  `SSH_USER` varchar(80) DEFAULT NULL,
  `SSH_PASSWD` varchar(80) DEFAULT NULL,
  `SSH_ENABLE_PASSWD` varchar(80) DEFAULT NULL,
  `SSH_TIMEOUT` int(11) DEFAULT NULL,
  `BACKUP_SCRIPT` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Locations`;

CREATE TABLE `Locations` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(80) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `AccessLevel` int(3) DEFAULT NULL,
  `Owner` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Maintenance`;

CREATE TABLE `Maintenance` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Device` int(4) DEFAULT NULL,
  `StartTime` int(15) DEFAULT NULL,
  `EndTime` int(15) DEFAULT NULL,
  `User` int(4) DEFAULT NULL,
  `UserComment` varchar(500) DEFAULT NULL,
  `TimeStamp` int(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Models`;

CREATE TABLE `Models` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(80) DEFAULT NULL,
  `Class` int(11) DEFAULT NULL,
  `Device` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Neighbors`;

CREATE TABLE `Neighbors` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Device` int(4) DEFAULT NULL,
  `Method` varchar(15) DEFAULT NULL,
  `Interface` varchar(30) DEFAULT NULL,
  `RemoteName` varchar(30) DEFAULT NULL,
  `RemoteInterface` varchar(50) DEFAULT NULL,
  `RemotePlatform` varchar(500) DEFAULT NULL,
  `RemoteVersion` varchar(500) DEFAULT NULL,
  `FirstSeen` int(15) DEFAULT NULL,
  `LastSeen` int(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Nodes`;

CREATE TABLE `Nodes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Device` int(4) DEFAULT NULL,
  `Interface` varchar(30) DEFAULT NULL,
  `Vlan` int(5) DEFAULT NULL,
  `MacAddress` varchar(20) DEFAULT NULL,
  `Address` int(11) unsigned DEFAULT NULL,
  `Name` varchar(80) DEFAULT NULL,
  `FirstSeen` int(15) DEFAULT NULL,
  `LastSeen` int(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Options`;

CREATE TABLE `Options` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Type` varchar(30) DEFAULT NULL,
  `Option` varchar(80) DEFAULT NULL,
  `Name` varchar(80) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Permissions`;

CREATE TABLE `Permissions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Category` varchar(150) DEFAULT NULL,
  `Name` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Portlets`;

CREATE TABLE `Portlets` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Xtype` varchar(80) DEFAULT NULL,
  `Colid` int(3) DEFAULT NULL,
  `DisplayOrder` int(3) DEFAULT NULL,
  `User` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `PropertyGroups`;

CREATE TABLE `PropertyGroups` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(80) DEFAULT NULL,
  `Class` int(4) DEFAULT NULL,
  `Portal` varchar(30) DEFAULT NULL,
  `ScriptAlias` varchar(80) DEFAULT NULL,
  `Display` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `RolePermissions`;

CREATE TABLE `RolePermissions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Role` int(11) DEFAULT NULL,
  `Permission` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Roles`;

CREATE TABLE `Roles` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(80) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `ServiceComponents`;

CREATE TABLE `ServiceComponents` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Service` int(30) DEFAULT NULL,
  `ThresholdType` int(11) DEFAULT NULL,
  `Threshold` int(11) DEFAULT NULL,
  `Action` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Services`;

CREATE TABLE `Services` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Sessions`;

CREATE TABLE `Sessions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `User` int(4) DEFAULT NULL,
  `Address` int(30) unsigned DEFAULT NULL,
  `KeyValue` varchar(100) DEFAULT NULL,
  `LastLogin` int(15) DEFAULT NULL,
  `Cycle` int(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Subscriptions`;

CREATE TABLE `Subscriptions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL DEFAULT '',
  `Description` varchar(500) NOT NULL DEFAULT '',
  `Device` int(4) NOT NULL,
  `Class` int(4) NOT NULL,
  `Tag` varchar(50) NOT NULL DEFAULT '',
  `Severity` int(2) NOT NULL,
  `Filter` varchar(500) NOT NULL DEFAULT '',
  `User` int(4) NOT NULL,
  `Active` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Transformations`;

CREATE TABLE `Transformations` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(80) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `MessageFilter` varchar(1500) DEFAULT NULL,
  `TagFilter` varchar(1500) DEFAULT NULL,
  `Action` int(1) DEFAULT NULL,
  `Active` int(1) DEFAULT NULL,
  `RequireBoth` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `PasswordStamp` int(15) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `LastLogin` int(15) DEFAULT NULL,
  `Theme` varchar(15) DEFAULT NULL,
  `PageSize` int(4) DEFAULT NULL,
  `PortalPageSize` int(4) DEFAULT NULL,
  `Groupid` int(3) DEFAULT NULL,
  `Stateful` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



# ------------------------------------------------------------

DROP TABLE IF EXISTS `VlanDb`;

CREATE TABLE `VlanDb` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(30) DEFAULT NULL,
  `Number` int(5) DEFAULT NULL,
  `Address` varchar(15) DEFAULT NULL,
  `Broadcast` int(15) unsigned DEFAULT NULL,
  `NetMask` int(15) unsigned DEFAULT NULL,
  `Layer` int(1) DEFAULT NULL,
  `Layer3Domain` varchar(50) DEFAULT NULL,
  `Contact` varchar(50) DEFAULT NULL,
  `ExternalContact` varchar(50) DEFAULT NULL,
  `Location` varchar(50) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `Secure` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;




DROP TABLE IF EXISTS `Vlans`;

CREATE TABLE `Vlans` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Device` int(4) DEFAULT NULL,
  `Name` varchar(80) DEFAULT NULL,
  `Number` int(5) DEFAULT NULL,
  `FirstSeen` int(15) DEFAULT NULL,
  `LastSeen` int(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
