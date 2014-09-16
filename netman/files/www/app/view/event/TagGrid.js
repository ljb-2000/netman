Ext.define('netman.view.event.TagGrid' ,{
	extend: 'Ext.grid.Panel',
	alias : 'widget.eventtaggrid',
	stripeRows: true,
	multiSelect: true,
	initComponent: function() {
		var data  = Ext.getStore('Events').data;
		this.columns = [
			{header: 'Tag',  dataIndex: 'Tag',  flex: 2,hidden:false},
			{header: 'Messages Received',  dataIndex: 'Total',  flex: 1,hidden:false},
			{header: 'First Seen',  dataIndex: 'FirstSeen',  flex: 1,hidden:false},
			{header: 'Last Seen',  dataIndex: 'LastSeen',  flex: 1,hidden:false},
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
			items:[{
				text:'Reset',
				action: 'reset'
			}],
			displayInfo: true,
			displayMsg: 'Displaying tags {0} - {1} of {2}',
			store: 'Tags',
		}
	],
	store: 'Tags'
});
