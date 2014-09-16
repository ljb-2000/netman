Ext.define('netman.store.History',{
	extend: 'Ext.data.Store',
	model: 'netman.model.History',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/history.php',
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
});
