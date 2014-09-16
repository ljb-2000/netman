Ext.define('netman.store.Nodes',{
	extend: 'Ext.data.Store',
	model: 'netman.model.Node',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		api:{
			read: 'data/read/nodes.php',
			update: 'data/update/nodes.php',
			create: 'data/create/nodes.php'
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
