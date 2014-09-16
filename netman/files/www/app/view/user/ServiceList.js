Ext.define('netman.view.user.ServiceList', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.servicelist',
    autoShow: true,
 
    initComponent: function() {
	this.columns = [
		{header: 'Name', dataIndex: 'Name', flex: 2},
		{header: 'Status', dataIndex: 'Status', flex: 2},
        ];
	this.bbar = {
			xtype: 'pagingtoolbar',
			items:[
			],
			displayInfo: true,
			displayMsg: 'Displaying {0} - {1} of {2}',
			store: 'Services',
	},
 
        this.callParent(arguments);
    },
	store: 'Services'
});
