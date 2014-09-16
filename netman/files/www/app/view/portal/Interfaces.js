Ext.define('netman.view.portal.Interfaces', {
	extend: 'netman.view.portal.Portlet',
	alias: "widget.interfaces",
	title: 'Interfaces',
	stateful: true,
	stateId: 'InterfacesPortal',
	stateEvents: ['show', 'hide'],
	initComponent: function(){
		this.items=[{
			xtype: 'grid',
			requires: ['Ext.ux.grid.xFilterRow'],
			plugins:[
				Ext.create('Ext.ux.grid.xFilterRow',{
					remoteFilter:true
				})
			],
			stateId: 'Interfacessgrid',
			stateful:true,
			stateEvents: ['columnresize', 'show', 'hide'],
			stripeRows: true,
			columns:[
			{header: 'Interface-id',  id:'ifid',dataIndex: 'id',  flex: 1,hidden:true},
			{header: 'Status', id:'ifstatus', dataIndex: 'Status',flex:0,renderer: function(value){
					if(value == true){
						return "<img src='icons/green-circle.png'/>";
					}
					else{
						return "<img src='icons/red-circle.png'/>";
					}
				},
				xfilter:{xtype:'toolbar',items:[{
				text:'...',
				width:60,
				menu:[
					{xtype:'menucheckitem',text:'Up',field:'Status',value:'Up',checked:false},
					{xtype:'menucheckitem',text:'Down',field:'Status',value:'Down',checked:false},
				]
			}]}},
			{header: 'Device', id:'ifdev',dataIndex: 'DeviceName',  flex: 2,hidden:false},
			{header: 'Name', id:'ifname',dataIndex: 'Name', flex: 2,hidden:false},
			{header: 'Description', id:'ifdescrd',dataIndex: 'Description', flex: 2,hidden:false},
			{header: 'Vlan', id:'ifvlan',dataIndex: 'Vlan', flex: 1,hidden:false},
			{header: 'Voice Vlan', id:'ifvvlan',dataIndex: 'VoiceVlan', flex: 1,hidden:false},
			{header: 'Location', id:'ifloc',dataIndex: 'Location', flex: 1,hidden:false},
			{header: 'Cable', id:'ifcable',dataIndex: 'Cable', flex: 1,hidden:false},
			{header: 'First Seen', id:'iffirst',dataIndex: 'FirstSeen', flex: 2,hidden:true,xfilter: {xtype:'datefield',format:'m/d/Y h:ia'}},
			{header: 'Last Up', id:'iflastup',dataIndex: 'LastUp', flex: 2,hidden:true,xfilter: {xtype:'datefield',format:'m/d/Y h:ia'}},
			{header: 'Last Down', id:'iflastdown',dataIndex: 'LastDown', flex: 2,hidden:true,xfilter: {xtype:'datefield',format:'m/d/Y h:ia'}},
			{header: 'User', id:'ifuser',dataIndex: 'User', flex: 1,hidden:false},
			{header: 'User Comment', id:'ifcomment',dataIndex: 'UserComment', flex: 1,hidden:false},
			],
			store: 'Interfaces',
	bbar:[
		{
			xtype: 'pagingtoolbar',
			displayInfo: true,
			displayMsg: 'Displaying {0} - {1} of {2}',
			store: 'Interfaces',
		}
	],
		}];
		this.callParent(arguments);
	}
});
