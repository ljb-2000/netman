Define('netman.model.Bookmark', {
	extend: 'Ext.data.Model',
	fields:[
		{name:'id',type:'int'},
		{name:'Uri',type:'string'},
		{name:'User',type:'int'}
	]
	
});
Ext.define('netman.model.Class',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'int'},
		{name:'Name',type:'string'},
		{name:'Parent',type:'int'},
		{name:'Description',type:'string'},
		{name:'SNMP_VERSION',type:'string'},
		{name:'SNMP_READ_COMMUNITY',type:'string'},
		{name:'SNMP_WRITE_COMMUNITY',type:'string'},
		{name:'SNMP_USER',type:'string'},
		{name:'SNMP_AUTHTYPE',type:'string'},
		{name:'SNMP_PRIVTYPE',type:'string'},
		{name:'SNMP_AUTHKEY',type:'string'},
		{name:'SNMP_PRIVKEY',type:'string'},
		{name:'SNMP_TIMEOUT',type:'string'},
		{name:'SSH_USER',type:'string'},
		{name:'SSH_PASSWD',type:'string'},
		{name:'SSH_TIMEOUT',type:'string'},
	]
});
Ext.define('netman.model.Components',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'number'},
		{name:'Name',type:'string'},
	]
});
Ext.define('netman.model.DeviceComponents',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'int'},
		{name:'Name',type:'string'},
		{name:'Parent',type:'string'},
		{name:'Class',type:'string'},
		{name:'Leaf',type:'string'},
		{name:'Loaded',type:'string'},
		{name:'Xtype',type:'string'},
	],
	validations: [
	]
});
Ext.define('netman.model.Device',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'number'},
		{name:'Name',type:'string'},
		{name:'Address',type:'string',convert: function(value){return num2dot(value);}},
		{name:'Make',type:'string'},
		{name:'Model',type:'string'},
		{name:'Serial',type:'string'},
		{name:'AssetTag',type:'string'},
		{name:'State',type:'string'},
		{name:'Layer',type:'string'},
		{name:'L2Domain',type:'string'},
		{name:'Location',type:'string'},
		{name:'Contact',type:'string'},
		{name:'FirstSeen',type:'date',dateFormat:'timestamp'},
		{name:'LastSeen',type:'date',dateFormat:'timestamp'},
		{name:'LastModeled',type:'date',dateFormat:'timestamp'},
		{name:'LastUp',type:'date',dateFormat:'timestamp'},
		{name:'LastDown',type:'date',dateFormat:'timestamp'},
		{name:'ClassName',type:'string'},
		{name:'Class',type:'int'},
		{name:'Rack',type:'string'},
		{name:'Alive',type:'number'},
		{name:'SnmpName',type:'string'},
		{name:'SnmpLocation',type:'string'},
		{name:'SnmpContact',type:'string'},
		{name:'SnmpDescription',type:'string'},
		{name:'SnmpAssetTag',type:'string'},
		{name:'SnmpSerial',type:'string'},
		{name:'DnsName',type:'string'},
	],
	validations: [
		{type:'presence',field:'Name',message:'Name can not be empty'}
	]
});
Ext.define('netman.model.Durations', {
	extend: 'Ext.data.Model',
	fields:[
		{name:'Name',type:'string'},
		{name:'Seconds',type:'int'},
	]
	
});
Ext.define('netman.model.Event',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'number'},
		{name:'Name',type:'string'},
		{name:'ClassName',type:'string'},
		{name:'Message',type:'string'},
		{name:'Severity',type:'number'},
		{name:'Facility',type:'string'},
		{name:'Tag',type:'string'},
		{name:'Reported',type:'date',dateFormat:'timestamp'},
		{name:'FirstSeen',type:'date',dateFormat:'timestamp'},
		{name:'LastSeen',type:'date',dateFormat:'timestamp'},
		{name:'Status',type:'string'},
		{name:'Count',type:'number'},
		{name:'User',type:'string'},
		{name:'UserComment',type:'string'},
		{name:'Cleared',type:'date',dateFormat:'timestamp'},
		{name:'ClearedBy',type:'string'},
	]
});
Ext.define('netman.model.Graph',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'int'},
		{name:'Name',type:'string'},
		{name:'Device',type:'string'},
		{name:'Device-id',type:'int'},
		{name:'Description',type:'string'},
	],
	validations: [
	]
});
Ext.define('netman.model.Group', {
	extend: 'Ext.data.Model',
	fields:[
		{name:'Name',type:'string'},
	]
	
});
Ext.define('netman.model.History', {
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'int'},
		{name:'Message',type:'string'},
		{name:'User',type:'string'},
		{name:'TimeStamp',type:'date',dateFormat:'timestamp'},
		{name:'Device',type:'string'},
		{name:'Vlan',type:'string'},
		{name:'Link',type:'string'}
	]
});
Ext.define('netman.model.Interface', {
	extend: 'Ext.data.Model',
	fields:[
		{name:'id',type:'int'},
		{name:'Device',type:'int'},
		{name:'IfIndex',type:'int'},
		{name:'Name',type:'string'},
		{name:'Description',type:'string'},
		{name:'Location',type:'string'},
		{name:'Cable',type:'string'},
		{name:'Vlan',type:'string'},
		{name:'VoiceVlan',type:'string'},
		{name:'MacNotify',type:'int'},
		{name:'User',type:'string'},
		{name:'UserComment',type:'string'},
		{name:'UserCommentStamp',type:'date',dateFormat:'timestamp'},
		{name:'FirstSeen',type:'date',dateFormat:'timestamp'},
		{name:'LastSeen',type:'date',dateFormat:'timestamp'},
		{name:'LastUp',type:'date',dateFormat:'timestamp'},
		{name:'LastDown',type:'date',dateFormat:'timestamp'},
		{name:'Status',type:'boolean'},
	
	]
});
Ext.define('netman.model.Link',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'number'},
		{name:'Name',type:'string'},
		{name:'Status',type:'boolean'},
		{name:'User',type:'string'},
		{name:'Classification',type:'string'},
		{name:'Encryption',type:'string'},
		{name:'Requestor',type:'string'},
		{name:'CreatedStamp',type:'date',dateFormat:'timestamp'},
		{name:'Type',type:'string'},
		{name:'Function',type:'string'},
		{name:'WaveLength',type:'string'},
		{name:'Room1',type:'string'},
		{name:'Rack1',type:'string'},
		{name:'Device1',type:'string'},
		{name:'Port1',type:'string'},
		{name:'Room1',type:'string'},
		{name:'Device2',type:'string'},
		{name:'Port2',type:'string'},
		{name:'Room2',type:'string'},
	],
	validations: [
		/*{type:'presence',field:'Name',message:'Name can not be empty'}*/
	]
});
Ext.define('netman.model.LinkPart',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'number'},
		{name:'Link',type:'string'},
		{name:'Sequence',type:'int'},
		{name:'Room1',type:'string'},
		{name:'Rack1',type:'string'},
		{name:'Fxp1',type:'string'},
		{name:'Pair1a',type:'string'},
		{name:'Pair1b',type:'string'},
		{name:'Sequence',type:'int'},
		{name:'Room2',type:'string'},
		{name:'Rack2',type:'string'},
		{name:'Fxp2',type:'string'},
		{name:'Pair2a',type:'string'},
		{name:'Pair2b',type:'string'},
		{name:'Length1',type:'string'},
		{name:'Length2',type:'string'},
		{name:'User',type:'string'},
		{name:'UserCreatedStamp',type:'datetime',format:'timestamp'},
	],
	validations: [
		/*{type:'presence',field:'Name',message:'Name can not be empty'}*/
	]
});
Ext.define('netman.model.Maintenance',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'number'},
		{name:'Device',type:'string'},
		{name:'DeviceId',type:'int'},
		{name:'StartTime',type:'date',dateFormat:'timestamp'},
		{name:'EndTime',type:'date',dateFormat:'timestamp'},
		{name:'User',type:'string'},
		{name:'UserComment',type:'string'},
		{name:'TimeStamp',type:'date',dateFormat:'timestamp'},
	],
	validations: [
		/*{type:'presence',field:'Name',message:'Name can not be empty'}*/
	]
});
Ext.define('netman.model.Option',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'number'},
		{name:'Type',type:'string'},
		{name:'Option',type:'string'},
		{name:'Name',type:'string'},
		{name:'Description',type:'string'},
	],
	validations: [
		{type:'presence',field:'Name',message:'Name can not be empty'}
	]
});
Ext.define('netman.model.Portlet',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'int'},
		{name:'Name',type:'string'},
		{name:'User',type:'int'},
		{name:"Xtype",type:'string'}
	],
	validations: [
	]
});
Ext.define('netman.model.Property',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'int'},
		{name:'SNMP_VERSION',type:'int'},
		{name:'SNMP_READ_COMMUNITY',type:'string'},
		{name:'SNMP_WRITE_COMMUNITY',type:'string'},
		{name:'SNMP_USER',type:'string'},
		{name:'SNMP_AUTHTYPE',type:'string'},
		{name:'SNMP_PRIVTYPE',type:'string'},
		{name:'SNMP_AUTHKEY',type:'string'},
		{name:'SNMP_PRIVKEY',type:'string'},
		{name:'SNMP_TIMEOUT',type:'string'},
		{name:'SSH_USER',type:'string'},
		{name:'SSH_PASSWD',type:'string'},
		{name:'SSH_TIMEOUT',type:'string'},
	],
	validations: [
		/*{type:'presence',field:'Name',message:'Name can not be empty'}*/
	]
});
Ext.define('netman.model.Severity', {
	extend: 'Ext.data.Model',
	fields:[
		{name:'id',type:'string'},
		{name:'Name',type:'string'},
	]
	
});
Ext.define('netman.model.State', {
	extend: 'Ext.data.Model',
	fields:[
		{name:'Name',type:'string'},
	]
	
});
Ext.define('netman.model.Subscription',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'int'},
		{name:'Name',type:'string'},
		{name:'Description',type:'string'},
		{name:'Device',type:'string'},
		{name:'Class',type:'string'},
		{name:'Tag',type:'string'},
		{name:'Severity',type:'string'},
		{name:'Filter',type:'string'},
		{name:'Active',type:'boolean'},
	]
});
Ext.define('netman.model.Tag',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'number'},
		{name:'Tag',type:'string'},
		{name:'Total',type:'number'},
		{name:'FirstSeen',type:'date',dateFormat:'timestamp'},
		{name:'LastSeen',type:'date',dateFormat:'timestamp'},
	]
});
Ext.define('netman.model.Transformation',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'int'},
		{name:'Name',type:'string'},
		{name:'Description',type:'string'},
		{name:'MessageFilter',type:'string'},
		{name:'TagFilter',type:'string'},
		{name:'Action',type:'int'},
		{name:'Active',type:'boolean'},
		{name:'RequireBoth',type:'boolean'},
	]
});
Ext.define('netman.model.User',{
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type:'int'},
		{name: 'Name', type: 'string'},
		{name: 'FirstName', type: 'string'},
		{name: 'LastName', type: 'string'},
		{name: 'Email', type: 'string'},
		{name: 'Groupid', type: 'int'},
		{name: 'PageSize', type: 'int'},
		{name:'PasswordStamp',type:'date',dateFormat:'timestamp'},
	]
});
Ext.define('netman.model.Vlan',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'Name',type:'string'},
		{name:'Number',type:'number'},
		{name:'Address',type:'string'},
		{name:'Broadcast',type:'string'},
		{name:'NetMask',type:'string'},
		{name:'Layer',type:'string'},
		{name:'Layer3Domain',type:'string'},
		{name:'Contact',type:'string'},
		{name:'ExternalContact',type:'string'},
		{name:'Location',type:'string'},
		{name:'Description',type:'string'},
		{name:'Secure',type:'boolean'},
	]
});
