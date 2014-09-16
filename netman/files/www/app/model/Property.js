Ext.define('netman.model.Property',{
	extend: 'Ext.data.Model',
	fields: [
		{name:'id',type:'int'},
		{name:'SNMP_ENABLED',type:'int'},
		{name:'SNMP_VERSION',type:'int'},
		{name:'SNMP_READ_COMMUNITY',type:'string'},
		{name:'SNMP_WRITE_COMMUNITY',type:'string'},
		{name:'SNMP_USER',type:'string'},
		{name:'SNMP_AUTHTYPE',type:'string'},
		{name:'SNMP_PRIVTYPE',type:'string'},
		{name:'SNMP_AUTHKEY',type:'string'},
		{name:'SNMP_PRIVKEY',type:'string'},
		{name:'SNMP_TIMEOUT',type:'string'},
		{name:'SSH_ENABLED',type:'int'},
		{name:'SSH_USER',type:'string'},
		{name:'SSH_PASSWD',type:'string'},
		{name:'SSH_ENABLE_PASSWD',type:'string'},
		{name:'SSH_TIMEOUT',type:'int'},
		{name:'BACKUP_SCRIPT',type:'string'},
	],
	validations: [
		/*{type:'presence',field:'Name',message:'Name can not be empty'}*/
	]
});
