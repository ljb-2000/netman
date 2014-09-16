Ext.define('netman.view.device.List' ,{
	alias : 'widget.devicelist',
	extend: 'Ext.grid.Panel',
	requires: ['Ext.ux.grid.xFilterRow','Ext.state'],
	stateId: 'devicesgrid',
	stateful:true,
	stateEvents: ['columnresize', 'show', 'hide'],
	multiSelect: true,
	plugins:[
		Ext.create('Ext.ux.grid.xFilterRow',{
			remoteFilter:true
		}),
	],
	stripeRows: true,
	initComponent: function() {
		this.columns = [
			{header: 'Status', dataIndex: 'Alive', flex: 1, renderer: function(value){ return checked(value);},xfilter:{xtype:'toolbar',items:[{
				text:'...',
				width:60,
				menu:[
					{xtype:'menucheckitem',text:'Online',field:'Alive',value:'1',checked:false},
					{xtype:'menucheckitem',text:'Offline',field:'Alive',value:'0',checked:false},
					{xtype:'menucheckitem',text:'New',field:'Alive',value:'2',checked:false},
				]
			}]}},
			{header: 'SSH Status', dataIndex: 'SSH_ALIVE', flex: 1, renderer: function(value){ return checked(value);},xfilter:{xtype:'toolbar',items:[{
				text:'...',
				width:60,
				menu:[
					{xtype:'menucheckitem',text:'Online',field:'SSH_ALIVE',value:'1',checked:false},
					{xtype:'menucheckitem',text:'Offline',field:'SSH_ALIVE',value:'0',checked:false},
				]
			}]},hidden:true},
			{header: 'SSH Enable Status', dataIndex: 'SSH_ENABLE_ALIVE', flex: 1, renderer: function(value){ return checked(value);},xfilter:{xtype:'toolbar',items:[{
				text:'...',
				width:60,
				menu:[
					{xtype:'menucheckitem',text:'Online',field:'SSH_ENABLE_ALIVE',value:'1',checked:false},
					{xtype:'menucheckitem',text:'Offline',field:'SSH_ENABLE_ALIVE',value:'0',checked:false},
				]
			}]},hidden:true},
			{header: 'Monitoring', dataIndex: 'Monitor', flex: 1, renderer: function(value){ return checked(value);},xfilter:{xtype:'toolbar',items:[{
				text:'...',
				width:60,
				menu:[
					{xtype:'menucheckitem',text:'Enabled',field:'Monitor',value:'1',checked:false},
					{xtype:'menucheckitem',text:'Disabled',field:'Monitor',value:'0',checked:false},
				]
			}]},hidden:true},
			{header: 'Id',  dataIndex: 'id',  flex: 1,filter: true,hidden:true},
			{header: 'System Name',  dataIndex: 'Name',  flex: 2,filter: true,xfilter:{id:'devicelist-name-textfield',xtype:'textfield'}},
			{header: 'SNMP  Name',  dataIndex: 'SnmpName',  flex: 2,filter: true,xfilter:{id:'devicelist-snmpname-textfield',xtype:'textfield'},hidden:true},
			{header: 'DNS Name',  dataIndex: 'DnsName',  flex: 2,filter: true,xfilter:{id:'devicelist-dnsname-textfield',xtype:'textfield'},hidden:true},
			{header: 'Ip Address', dataIndex: 'Address', flex: 1},
			{header: 'Make', dataIndex: 'Make', flex: 1},
			{header: 'Model', dataIndex: 'Model', flex: 1},
			{header: 'SnmpDescription', dataIndex: 'SnmpDescription', flex: 1,hidden:true},
			{header: 'Serial#', dataIndex: 'Serial', flex: 1,hidden:true},
			{header: 'Asset Tag', dataIndex: 'AssetTag', flex: 1,hidden:true},
			{header: 'Location', dataIndex: 'Location', flex: 1,hidden:true},
			{header: 'Rack', dataIndex: 'Rack', flex: 1},
			{header: 'Class', dataIndex: 'ClassName', flex: 1,hidden:true,xfilter:{id:'devicelist-classname-textfield',xtype:'textfield'}},
			{header: 'State', dataIndex: 'State', flex: 1, xfilter:{xtype:'toolbar',items:[{
				text:'...',
				width:60,
				menu:[
					{xtype:'menucheckitem',text:'Production',field:'State',value:'Production',checked:false},
					{xtype:'menucheckitem',text:'Pre-Production',field:'State',value:'Pre-Production',checked:false},
					{xtype:'menucheckitem',text:'Testing',field:'State',value:'Testing',checked:false},
					{xtype:'menucheckitem',text:'Discovered',field:'State',value:'Discovered',checked:false},
					{xtype:'menucheckitem',text:'De-comissioned',field:'State',value:'De-comissioned',checked:false},
				]
			}]}},
			{header: 'Layer', dataIndex: 'Layer', flex: 1, xfilter:{xtype:'toolbar',items:[{
				text:'...',
				width:60,
				menu:[
					{xtype:'menucheckitem',text:'Access',field:'Layer',value:'Access',checked:false},
					{xtype:'menucheckitem',text:'Distribution',field:'Layer',value:'Distribution',checked:false},
					{xtype:'menucheckitem',text:'Core',field:'Layer',value:'Core',checked:false},
					{xtype:'menucheckitem',text:'Edge',field:'Layer',value:'Edge',checked:false},
				]
			}]}},
			{header: 'L2Domain', dataIndex: 'L2Domain', flex: 1},
			{header: 'First Seen', dataIndex: 'FirstSeen', flex: 2,hidden:true,xfilter: {xtype:'datefield',format:'m/d/Y h:ia'}},
			{header: 'LastSeen', dataIndex: 'LastSeen', flex: 2,hidden:true,xfilter: {xtype:'datefield',format:'m/d/Y h:ia'}},
			{header: 'Last Down', dataIndex: 'LastDown', flex: 2,hidden:true,xfilter: {xtype:'datefield',format:'m/d/Y h:ia'}},
		];
 
        	this.callParent(arguments);
		this.load();
	},
	filter: function(field,expression){
		this.store.filter(field,expression);
	},
	reset: function(){
		this.store.removeAll();
		this.store.load('netman.store.Devices');
	},
	load: function(){
		this.store.load();
	},
	bbar:[
		{
			xtype: 'pagingtoolbar',
			items:[
				{text:'Reset',	action: 'reset'	},
				{text:'Show All',action: 'showall'},
				{text: 'Device',
					menu:[
						{ text: 'Edit device',action: 'edit'},
						{ text: 'View device',action: 'view'},
						{ text: 'Schedule Maintenace',action: 'maintenance'},
					]
				},
				{text:'Export',action: 'csv'},
			],
			displayInfo: true,
			displayMsg: 'Displaying devices {0} - {1} of {2}',
			store: 'Devices',
			doRefresh: function(){
				Ext.getStore('Devices').load();
			}
		}
	],
	store: 'Devices'
});
