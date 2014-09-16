Ext.define('netman.view.device.Config', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.deviceconfig',
	autoHeight: true,
	layout:'fit',
	title: 'Device Configuration',
	bodyStyle:{border:'none'},
	autoScroll: true,
    initComponent: function() {	
		/*var data = Ext.getStore('deviceProperties').data.items[0].data;*/
		this.items = [
		{xtype:'container',
		items:[
		{
			layout:'column',
			bodyStyle:{'padding':'15px','border':'none'},
			items:[
			{
				bodyCls:'infoBox',
				defaults:{
					labelWidth: 200,
				},
				style: {'padding':'15px'},
				xtype:'form',
				labelWidth: 200,
				width:400,
			items:[
				{bodyCls:'infoHeading',html:'SNMP'},
				{xtype:'textfield',fieldLabel:'SNMP_ENABLED',name:'SNMP_ENABLED'},
				{xtype:'textfield',fieldLabel:'SNMP_VERSION',name:'SNMP_VERSION'},
				{xtype:'textfield',fieldLabel:'SNMP_READ_COMMUNITY',name:'SNMP_READ_COMMUNITY'},
				{xtype:'textfield',fieldLabel:'SNMP_WRITE_COMMUNITY',name:'SNMP_WRITE_COMMUNITY'},
				{xtype:'textfield',fieldLabel:'SNMP_USER',name:'SNMP_USER'},
				{xtype:'textfield',fieldLabel:'SNMP_AUTHTYPE',name:'SNMP_AUTHTYPE'},
				{xtype:'textfield',fieldLabel:'SNMP_PRIVTYPE',name:'SNMP_PRIVTYPE'},
				{xtype:'textfield',fieldLabel:'SNMP_AUTHKEY',name:'SNMP_AUTHKEY'},
				{xtype:'textfield',fieldLabel:'SNMP_PRIVKEY',name:'SNMP_PRIVKEY'},
				{xtype:'textfield',fieldLabel:'SNMP_TIMEOUT',name:'SNMP_TIMEOUT'},
				{bodyCls:'infoHeading',html:'SSH'},
				{xtype:'textfield',fieldLabel:'SSH_ENABLED',name:'SSH_ENABLED'},
				{xtype:'textfield',fieldLabel:'SSH_USER',name:'SSH_USER'},
				{xtype:'textfield',fieldLabel:'SSH_PASSWD',name:'SSH_PASSWD'},
				{xtype:'textfield',fieldLabel:'SSH_ENABLE_PASSWD',name:'SSH_ENABLE_PASSWD'},
				{xtype:'textfield',fieldLabel:'BACKUP_SCRIPT',name:'BACKUP_SCRIPT'},
			],
			buttons:[
				{text:'Update',action:'updateConfig'}
			]
			
			},
			]
		},
		]}];
        	this.callParent(arguments);
		this.down('form').getForm().loadRecord(Ext.getStore('deviceProperties').data.items[0]);
	},
});
