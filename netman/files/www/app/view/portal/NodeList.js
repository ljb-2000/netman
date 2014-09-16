Ext.define('netman.view.portal.NodeList', {
	extend: 'netman.view.portal.Portlet',
	alias: "widget.nodelist",
	title: 'Nodes',
	initComponent: function(){
		this.items=[{
			xtype: 'grid',
			stripeRows: true,
			stateful: true,
			stateId: 'NodeList',
			requires: ['Ext.ux.grid.xFilterRow','Ext.state'],
			stateEvents: ['columnresize', 'show', 'hide'],
			plugins:[
				Ext.create('Ext.ux.grid.xFilterRow',{
					remoteFilter:true
				}),
			],
			columns:[
				{header:'Device',dataIndex:'DeviceName',flex:2},
				{header:'Interface',dataIndex:'Interface',flex:1},
				{header:'MacAddress',dataIndex:'MacAddress',flex:3},
				{header:'Address',dataIndex:'Address',flex:3},
				{header:'Name',dataIndex:'Name',flex:2},
				{header:'First Seen',dataIndex:'FirstSeen',flex:3,hidden:true},
				{header:'Last Seen',dataIndex:'LastSeen',flex:3},
			],
			store: 'Nodes',
	bbar:[
		{
			xtype: 'pagingtoolbar',
			displayInfo: true,
			displayMsg: 'Displaying {0} - {1} of {2}',
			store: 'Nodes',
		}
	],
		}];
		this.callParent(arguments);
	}
});
