Ext.define('netman.store.Tags',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Tag',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/tags.php',
			update: 'data/update/tags.php',
			create: 'data/create/tags.php'
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
