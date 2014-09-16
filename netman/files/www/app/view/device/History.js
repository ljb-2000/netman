Ext.define('netman.view.device.History', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.devicehistory',
	layout:'fit',
	title: 'History',
	requires: ['Ext.ux.grid.xFilterRow'],
	plugins:[
		Ext.create('Ext.ux.grid.xFilterRow',{
			remoteFilter:true
		})
	],
	stateId: 'deviceHistorygrid',
	stateful:true,
	stateEvents: ['columnresize', 'show', 'hide'],
	stripeRows: true,
    initComponent: function() {	
		var data = Ext.getStore('activeDevice').data.items[0].data;
		this.columns = [
			{header: 'History-id',  dataIndex: 'id',  flex: 1,hidden:true},
			{header: 'Message', dataIndex: 'Message', flex: 3},
			{header: 'TimeStamp', dataIndex: 'TimeStamp', flex: 1,xfilter: {xtype:'datefield',format:'m/d/Y h:ia'}},
			{header: 'User', dataIndex: 'User', flex: 1},
		];
		Ext.apply(this,{
			store :  Ext.create('Ext.data.Store',{
				model: 'netman.model.History',
				id: 'deviceHistory',
				autoLoad: true,
				proxy: {
					type: 'ajax',
					api:{
						read: 'data/read/history.php?Name=' + data.Name,
						update: 'data/update/history.php',
						create: 'data/create/history.php'
					},
					reader:{
						type: 'json',
						root: 'data',
						successProperty: 'success',
						totalProperty: 'totalCount'
					}
				},
				pageSize: User.PageSize,
				remoteSort: true,
				remoteFilter: true
			})}
		);
		this.callParent(arguments);
	},
	bbar:[
		{
			xtype: 'pagingtoolbar',
			items:[{
				text:'Reset',
				action: 'reset'
			}],
			displayInfo: true,
			displayMsg: 'Displaying history {0} - {1} of {2}',
			store: 'deviceHistory'
		}
	],
});
