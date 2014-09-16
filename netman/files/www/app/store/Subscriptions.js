Ext.define('netman.store.Subscriptions',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Subscription',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read:   'data/read/subscriptions.php',
			update: 'data/update/subscriptions.php',
			create: 'data/create/subscriptions.php'
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		},
		writer:{
			type:'json',
			successProperty: 'success',
			writeRecordId :true
		}
	},
	pageSize: User.PageSize,
	remoteSort:true,
	remoteFilter: true
});
