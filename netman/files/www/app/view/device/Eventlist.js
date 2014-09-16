Ext.define('netman.view.device.Eventlist', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.deviceeventlist',
	layout:'fit',
	title: 'Events',
	requires: ['Ext.ux.grid.xFilterRow'],
	plugins:[
		Ext.create('Ext.ux.grid.xFilterRow',{
			remoteFilter:true
		})
	],
	stripeRows: true,
    initComponent: function() {	
		var data = Ext.getStore('activeDevice').data.items[0].data;
		this.columns = [
			{header: 'Event-id',  dataIndex: 'id',  flex: 1,hidden:true},
			{header: 'Status', dataIndex: 'Status',flex:0,renderer: function(value){ return eventStatus(value);},xfilter:{xtype:'toolbar',items:[{
				text:'...',
				width:60,
				menu:[
					{xtype:'menucheckitem',text:'New',field:'Status',value:'0',checked:false},
					{xtype:'menucheckitem',text:'Acknowledged',field:'Status',value:'1',checked:false},
					{xtype:'menucheckitem',text:'Suppressed',field:'Status',value:'2',checked:false},
					{xtype:'menucheckitem',text:'Clear',field:'Status',value:'3',checked:false},
					{xtype:'menucheckitem',text:'Closed',field:'Status',value:'4',checked:false},
				]
			}]}},
			{header: 'Severity', dataIndex: 'Severity', flex: 0,renderer: function(value){return eventSeverity(value)},xfilter: {xtype:'toolbar',items:[{
				text:'...',
				width:60,
				menu:[
					{xtype:'menucheckitem',text:'Critical',field:'Severity',value:'1',checked:false},
					{xtype:'menucheckitem',text:'Error',field:'Severity',value:'2',checked:false},
					{xtype:'menucheckitem',text:'Warning',field:'Severity',value:'3',checked:false},
					{xtype:'menucheckitem',text:'Info',field:'Severity',value:'4',checked:false},
					{xtype:'menucheckitem',text:'Debug',field:'Severity',value:'5',checked:false},
				]
			}]}},
			{header: 'Facility', dataIndex: 'Facility', flex: 1,hidden:true},
			{header: 'Message', dataIndex: 'Message', flex: 3},
			{header: 'Tag', dataIndex: 'Tag', flex: 1},
			{header: 'Reported', dataIndex: 'Reported', flex: 1,hidden:true,xfilter: {xtype:'datefield',format:'m/d/Y h:ia'}},
			{header: 'First Seen', dataIndex: 'FirstSeen', flex: 2,hidden:true,xfilter: {xtype:'datefield',format:'m/d/Y h:ia'}},
			{header: 'Last Seen', dataIndex: 'LastSeen', flex: 2,xfilter: {xtype:'datefield',format:'m/d/Y h:ia'}},
			{header: 'Count', dataIndex: 'Count', flex: 1},
			{header: 'User', dataIndex: 'User', flex: 1,hidden:true},
			{header: 'UserComment', dataIndex: 'UserComment', flex: 1,hidden:true},
		];
		Ext.apply(this,{
			store :  Ext.create('Ext.data.Store',{
				model: 'netman.model.Event',
				id: 'deviceEvents',
				autoLoad: true,
				proxy: {
					type: 'ajax',
					api:{
						read: 'data/read/events.php?Name=' + data.Name,
						update: 'data/update/events.php',
						create: 'data/create/events.php'
					},
					reader:{
						type: 'json',
						root: 'data',
						successProperty: 'success',
						totalProperty: 'totalCount'
					}
				},
				pageSize: User.PageSize,
				remoteSort: true,
				remoteFilter: true
			})}
		);
		this.callParent(arguments);
	},
	bbar:[
		{
			xtype: 'pagingtoolbar',
			items:[{
				text:'Reset',
				action: 'resetevents'
			}],
			displayInfo: true,
			displayMsg: 'Displaying events {0} - {1} of {2}',
			store: 'deviceEvents'
		}
	],
});
