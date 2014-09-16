Ext.define('netman.store.Events',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Event',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/events.php',
			update: 'data/update/events.php',
			create: 'data/create/events.php'
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		},
		actionMethods: {
			create: 'POST',
			read: 'POST',
			update: 'POST',
			destroy: 'POST'
		},
	},
	pageSize: User.PageSize,
	remoteSort: true,
	remoteFilter: true
});
