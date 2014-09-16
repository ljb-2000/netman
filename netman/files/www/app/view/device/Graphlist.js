Ext.define('netman.view.device.Graphlist', {
	extend: 'Ext.grid.Panel',
	alias : 'widget.devicegraphlist',
	title: 'Graphs List',
	layout:'fit',
	autoHeight:'true',
	bodyStyle:{
		'padding':'100px'
	},
	
	initComponent: function() {	
		/*
 * 		var data = Ext.getStore('activeDevice').data.items[0].data;
 * 		*/
		this.columns = [
			{header:'Graph-id',dataIndex:'id',hidden:'true'},
			{header:'Name',dataIndex:'Name'},
			{header:'Description',dataIndex:'Description'},/*
			{header:'Data Start',},
			{header:'Data End',},*/
		];
		this.callParent(arguments);
	},
	store: 'Graphs',
	bbar:[
		{
			xtype: 'pagingtoolbar',
			items:[{
				text:'Reset',
				action: 'reset'
			}],
			displayInfo: true,
			displayMsg: 'Displaying graphs {0} - {1} of {2}',
			store: 'Graphs'
		}
	],
});
