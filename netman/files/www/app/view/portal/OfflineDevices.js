Ext.define('netman.view.portal.OfflineDevices', {
	extend: 'netman.view.portal.Portlet',
	alias: "widget.offlinedevices",
	title: 'Offline Devices',
	stateful: true,
	stateId: 'OfflineDevicesPortal',
	stateEvents: ['show', 'hide'],
	initComponent: function(){
		this.items=[{
			xtype: 'grid',
			stripeRows: true,
			columns:[
				{header:'Name',dataIndex:'Name',flex:3},
				{header:'State',dataIndex:'State',flex:3},
				{header:'Address',dataIndex:'Address',flex:3},
				{header:'Last Seen',dataIndex:'LastSeen',flex:3},
			],
			store: 'offlineDevices',
	bbar:[
		{
			xtype: 'pagingtoolbar',
			displayInfo: true,
			displayMsg: 'Displaying {0} - {1} of {2}',
			store: 'offlineDevices',
		}
	],
		}];
		Ext.apply(this,{
			store :  Ext.create('Ext.data.Store',{
				model: 'netman.model.Device',
				id: 'offlineDevices',
				autoLoad: true,
				proxy: {
					type: 'ajax',
					api:{
						read: 'data/read/devices.php?Alive=0',
					},
					reader:{
						type: 'json',
						root: 'data',
						successProperty: 'success',
						totalProperty: 'totalCount'
					}
				},
				pageSize: '15',
				remoteSort: true,
				remoteFilter: true
			}),
			}
		);
		this.callParent(arguments);
	}
});
