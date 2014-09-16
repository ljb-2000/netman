Ext.define('netman.view.device.Graphs', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.devicegraphs',
	layout:'fit',
	title: 'Graphs',
	requires: ['Ext.ux.grid.xFilterRow'],
	plugins:[
		Ext.create('Ext.ux.grid.xFilterRow',{
			remoteFilter:true
		})
	],
	stripeRows: true,
    initComponent: function() {	
		var data = Ext.getStore('activeDevice').data.items[0].data;
		this.columns = [
			{header: 'Graph-id',  dataIndex: 'id',  flex: 1,},
			{header: 'Name', dataIndex: 'Name', flex: 1,},
			{header:'Description',dataIndex:'Description'},
		];
		Ext.apply(this,{
			store :  Ext.create('Ext.data.Store',{
				model: 'netman.model.Graph',
				id: 'deviceGraphs',
				autoLoad: true,
				proxy: {
					type: 'ajax',
					api:{
						read: 'data/read/graphs.php?Device=' + data.id,
						update: 'data/update/graphs.php',
						create: 'data/create/graphs.php'
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
			displayMsg: 'Displaying graphs {0} - {1} of {2}',
			store: 'deviceGraphs'
		}
	],
});
