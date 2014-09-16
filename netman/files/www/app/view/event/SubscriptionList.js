Ext.define('netman.view.event.SubscriptionList', {
    extend: 'Ext.grid.Panel',
    alias : 'widget.eventsubscriptionlist',
    autoShow: true,
 
    initComponent: function() {
	this.columns = [
		{header: 'id', dataIndex: 'id', flex: 1,hidden:true},
		{header: 'Name', dataIndex: 'Name', flex: 2},
		{header: 'Filter', dataIndex: 'Filter', flex: 2},
		{header: 'Device', dataIndex: 'Device', flex: 1},
		{header: 'Class', dataIndex: 'Class', flex: 1},
		{header: 'Tag', dataIndex: 'Tag', flex: 1},
		{header: 'Severity', dataIndex: 'Severity', flex: 1,renderer: function(value){return eventSeverity(value)}},
		{header: 'Active', dataIndex: 'Active', flex: 1,xtype:'booleancolumn',text:'Active',trueText:'yes',falseText:'no'},
        ];
	this.bbar = {
			xtype: 'pagingtoolbar',
			items:[
			{
				/*text:'New',action:'newsub'*/
			}],
			displayInfo: true,
			displayMsg: 'Displaying subscriptions {0} - {1} of {2}',
			store: 'EventSubscriptions',
	},
	Ext.apply(this,{
		store :  Ext.create('Ext.data.Store',{
			model: 'netman.model.Subscription',
			id: 'EventSubscriptions',
			autoLoad: true,
			proxy: {
				type: 'ajax',
				api:{
					read: 'data/read/subscriptions.js?Message=',
					update: 'data/update/subscriptions.js.php',
					create: 'data/create/subscriptions.js.php'
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
});
