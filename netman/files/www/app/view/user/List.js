Ext.define('netman.view.user.List', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.userlist',
    autoShow: true,
 
    initComponent: function() {
	this.columns = [
		{header: 'id', dataIndex: 'id', flex: 1,hidden:true},
		{header: 'Name', dataIndex: 'Name', flex: 2},
		{header: 'Group', dataIndex: 'GroupName', flex: 2},
		{header: 'First Name', dataIndex: 'FirstName', flex: 2},
		{header: 'Last Name', dataIndex: 'LastName', flex: 2},
		{header: 'Email', dataIndex: 'Email', flex: 2},
        ];
	this.bbar = {
			xtype: 'pagingtoolbar',
			items:[
			{
				text:'New',action:'newsub'
			}],
			displayInfo: true,
			displayMsg: 'Displaying users {0} - {1} of {2}',
			store: 'Users',
	},
 
        this.callParent(arguments);
    },
	store: 'Users'
});
