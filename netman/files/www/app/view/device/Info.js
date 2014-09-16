Ext.define('netman.view.device.Info', {
	extend: 'Ext.panel.Panel',
	alias : 'widget.deviceinfo',
	autoHeight: true,
	layout:'fit',
	title: 'System Information',
	bodyStyle:{border:'none'},
	autoScroll: true,
	initComponent: function() {	
		var data = Ext.getStore('activeDevice').data.items[0].data;
		this.items = [
		{xtype:'container',
		items:[
		{
			layout:'column',
			bodyStyle:{'padding':'15px','border':'none'},
			defaults: {
				bodyCls:'infoBox',
				style: {'padding':'15px'},
				xtype:'form',
				width:400,
			},
			items:[
			{
				items:[
					{bodyCls:'infoHeading',html:'Configured'},
					{xtype:'displayfield',fieldLabel:'Device-id',value: data.id},
					{xtype:'displayfield',fieldLabel:'Name',value: data.Name},
					{xtype:'displayfield',fieldLabel:'Address',value: data.Address},
					{xtype:'displayfield',fieldLabel:'Make',value: data.Make},
					{xtype:'displayfield',fieldLabel:'Model',value: data.Model},
					{xtype:'displayfield',fieldLabel:'Serial#',value: data.Serial},
					{xtype:'displayfield',fieldLabel:'Asset Tag',value: data.AssetTag},
					{xtype:'displayfield',fieldLabel:'Location',value: data.Location},
					{xtype:'displayfield',fieldLabel:'Rack',value: data.Rack},
				]
			},
			{
				items:[
					{bodyCls:'infoHeading',html:'Availability'},
					{xtype:'displayfield',fieldLabel:'SSH',renderer: function(){
							if (data.SSH_ALIVE == "1"){
								return "Available";
							}
							else{
								return "N/A";
							}
						}
					},
					{xtype:'displayfield',fieldLabel:'SSH Enable',renderer: function(){
							if (data.SSH_ENABLE_ALIVE == "1"){
								return "Available";
							}
							else{
								return "N/A";
							}
						}
					},
					{xtype:'displayfield',fieldLabel:'Uptime',renderer: function(){
							if (data.Alive == "1"){
								return uptime(data.LastDown);
							}
							else{
								return "Down!";
							}
						}
					},
					{xtype:'displayfield',fieldLabel:'First Seen',value: data.FirstSeen,renderer: function(){return mkdate(data.FirstSeen);}},
					{xtype:'displayfield',fieldLabel:'Last Up',value: data.LastDown,renderer: function(){return mkdate(data.LastUp);}},
					{xtype:'displayfield',fieldLabel:'Last Down',value: data.LastDown,renderer: function(){return mkdate(data.LastDown);}},
				]
			},
			]
		},
		{
			layout:'column',
			bodyStyle:{'padding':'15px','border':'none'},
			defaults: {
				bodyCls:'infoBox',
				style: {'padding':'15px'},
				xtype:'form',
				width:400,
			},
			items:[
			{
				items:[
					{bodyCls:'infoHeading',html:'SNMP'},
					{xtype:'displayfield',fieldLabel:'Last Modeled',value: data.LastModeled,renderer: function(value){return uptime(value) + ' ago';}},
					{xtype:'displayfield',fieldLabel:'DNS Name',value: data.DnsName},
					{xtype:'displayfield',fieldLabel:'Name',value: data.SnmpName},
					{xtype:'displayfield',fieldLabel:'Asset Tag',value: data.SnmpAssetTag},
					{xtype:'displayfield',fieldLabel:'Serial#',value: data.SnmpSerial},
					{xtype:'displayfield',fieldLabel:'Location',value: data.SnmpLocation},
					{xtype:'displayfield',fieldLabel:'Contact',value: data.SnmpContact},
					{xtype:'displayfield',fieldLabel:'Description',value: data.SnmpDescription},
				]
			},
			]
		}
		]}];
        	this.callParent(arguments);
	},
});
