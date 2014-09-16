Ext.define('netman.store.Interfaces',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Interface',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/interfaces.php',
			update: 'data/update/interfaces.php',
			create: 'data/create/interfaces.php'
		},
		reader:{
			type: 'json',
			root: 'data',
			successProperty: 'success',
			totalProperty: 'totalCount'
		}
	},
	pageSize: User.PortalPageSize,
	remoteSort: true,
	remoteFilter: true
});
