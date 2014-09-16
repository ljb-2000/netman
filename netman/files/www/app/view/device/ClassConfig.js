Ext.define('netman.view.device.ClassConfig', {
    extend: 'Ext.window.Window',
    alias : 'widget.deviceclassconfig',
	modal: true,
	autoHeight: true,
	layout:'fit',
	title: 'Class Configuration',
	bodyStyle:{border:'none'},
	autoScroll: true,
	autoShow:true,
    initComponent: function() {	
		/*var data = Ext.getStore('classProperties').data.items[0].data;*/
		var record = Ext.ComponentQuery.query('deviceclasses')[0].getView().getSelectionModel().getSelection()[0];
		if(record){
			this.title = record.data.Name;
				var b = {text:'Update',action:'saveclass'}
		}
		else{
			var b = {text:'Create',action:'newclass'}
		}
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
				{bodyCls:'infoHeading',html:'Class'},
				{xtype:'textfield',fieldLabel:'Name',name:'Name'},
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
				{xtype:'textfield',fieldLabel:'SSH_TIMEOUT',name:'SSH_TIMEOUT'},
				{xtype:'textfield',fieldLabel:'BACKUP_SCRIPT',name:'BACKUP_SCRIPT'},
			],
			buttons:[
				b,
				{'text':'Close',scope:this, handler: this.close}
			]
			
			},
			]
		},
		]}];
        	this.callParent(arguments);
	},
});
