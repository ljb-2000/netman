Ext.define('netman.view.user.GroupList', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.grouplist',
    autoShow: true,
 
    initComponent: function() {
	this.columns = [
		{header: 'id', dataIndex: 'id', flex: 1,hidden:true},
		{header: 'Name', dataIndex: 'Name', flex: 2},
		{header: 'Description', dataIndex: 'Description', flex: 2},
        ];
	this.bbar = {
			xtype: 'pagingtoolbar',
			items:[
			{
				text:'New',action:'newsub'
			}],
			displayInfo: true,
			displayMsg: 'Displaying groups {0} - {1} of {2}',
			store: 'Groups',
	},
 
        this.callParent(arguments);
    },
	store: 'Groups'
});
