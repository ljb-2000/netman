Ext.define('netman.store.Messages',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Message',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/messages.php',
			update: 'data/update/messages.php',
			create: 'data/create/messages.php'
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
	remoteFilter: false
});
