Ext.define('netman.view.portal.Maintenance', {
	extend: 'netman.view.portal.Portlet',
	alias: "widget.maintenance",
	title: 'Active Maintenance',
	stateId: 'MaintenancePortal',
	stateEvents: ['show', 'hide'],
	initComponent: function(){
		this.items=[{
			xtype: 'grid',
			stripeRows: true,
			columns:[
				{header:'Device',dataIndex:'Device',flex:3},
				{header:'Start Time',dataIndex:'StartTime',flex:3},
				{header:'End Time',dataIndex:'EndTime',flex:3},
			],
			store: 'Maintenance',
		}];
		this.bbar =[
		{
			xtype: 'pagingtoolbar',
			displayInfo: true,
			displayMsg: 'Displaying {0} - {1} of {2}',
			store: 'Maintenance',
		}
		];
		this.callParent(arguments);
	}
});
