Ext.define('netman.view.event.List' ,{
	extend: 'Ext.grid.Panel',
	requires: ['Ext.ux.grid.xFilterRow'],
	plugins:[
		Ext.create('Ext.ux.grid.xFilterRow',{
			remoteFilter:true
		})
	],
	alias : 'widget.eventlist',
	stripeRows: true,
	title : 'All Events',
	multiSelect: true,
	stateId: 'eventsgrid',
	stateful:true,
	stateEvents: ['columnresize', 'show', 'hide'],
	/*
	viewConfig: {
		getRowClass: function(record) { 
			var sev = record.get('Severity');
			if (sev < 2){
				return 'red-row';
			}
			else if(sev < 3){
				return 'yellow-row';
			}
			return '';
		}
        },
	*/
	initComponent: function() {
		this.columns = [
			{header: 'Event-id',  dataIndex: 'id',  flex: 1,hidden:true},
			{header: 'Status', dataIndex: 'Status',flex:0,renderer: function(value){
				return eventStatus(value);
				},xfilter:{xtype:'toolbar',items:[{
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
			{header: 'Severity', dataIndex: 'Severity', flex: 0,renderer: function(value,meta){
				if(value < 2){
					meta.tdCls = 'red-cell';
				}
				else if(value < 3 ){
					meta.tdCls = 'yellow-cell';
				}
				return eventSeverity(value)},xfilter: {xtype:'toolbar',items:[{
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
			{header: 'Device Class',  dataIndex: 'ClassName',  flex: 1,xfilter: {id:'event-classname',xtype:'textfield'}},
			{header: 'Device',  dataIndex: 'Name',  flex: 1,xfilter: {id:'event-devicename',xtype:'textfield'}},
			{header: 'Facility', dataIndex: 'Facility', flex: 1,hidden:true},
			{header: 'Message', dataIndex: 'Message', flex: 3},
			{header: 'Source',  dataIndex: 'Source',  flex: 1,xfilter: {id:'event-source',xtype:'textfield'},hidden:true},
			{header: 'Tag', dataIndex: 'Tag', flex: 1,xfilter: {id:'event-tagname',xtype:'textfield'}},
			{header: 'Reported', dataIndex: 'Reported', flex: 1,hidden:true,xfilter: {xtype:'datefield',format:'m/d/Y h:ia'}},
			{header: 'First Seen', dataIndex: 'FirstSeen', flex: 2,hidden:true,xfilter: {xtype:'datefield',format:'m/d/Y h:ia'}},
			{header: 'Last Seen', dataIndex: 'LastSeen', flex: 2,xfilter: {xtype:'datefield',format:'m/d/Y h:ia'}},
			{header: 'Count', dataIndex: 'Count', flex: 1},
			{header: 'User', dataIndex: 'User', flex: 1,hidden:true},
			{header: 'UserComment', dataIndex: 'UserComment', flex: 1,hidden:true},
		];
 
        	this.callParent(arguments);
		this.load();
	},
	filter: function(field,expression){
		this.store.filter(field,expression);
	},
	load: function(){
		this.store.load();
	},
	bbar:[
		{
			xtype: 'pagingtoolbar',
			items:[
				{text:'Reset',action: 'reset'},
				{text:'Show All',action: 'showall'},
				{text:'Export',action:'csv'},
				],
			displayInfo: true,
			displayMsg: 'Displaying events {0} - {1} of {2}',
			store: 'Events',
			doRefresh: function(){
				/* Ext.getStore('Events').load(); */
				autoFresh();
			}
		}
	],
	store: 'Events'
});
